const fs = require('fs');
const schema = fs.readFileSync('prisma/schema.prisma', 'utf-8');

const additionalModels = `
model BlastContact {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  tags      String?
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())

  campaignRecipients CampaignRecipient[]

  @@index([isActive])
}

model EmailCampaign {
  id           String   @id @default(cuid())
  subject      String
  bodyHtml     String
  status       String   @default("draft") // "draft", "scheduled", "processing", "completed", "failed"
  scheduledAt  DateTime?
  attachments  Json?    // Array of { filename, url }
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  recipients   CampaignRecipient[]

  @@index([status])
  @@index([scheduledAt])
}

model CampaignRecipient {
  id           String   @id @default(cuid())
  campaignId   String
  contactId    String
  status       String   @default("pending") // "pending", "sent", "failed"
  errorMessage String?
  sentAt       DateTime?

  campaign     EmailCampaign @relation(fields: [campaignId], references: [id], onDelete: Cascade)
  contact      BlastContact  @relation(fields: [contactId], references: [id], onDelete: Cascade)

  @@unique([campaignId, contactId])
  @@index([status])
}
`;

if (!schema.includes('model BlastContact')) {
  fs.writeFileSync('prisma/schema.prisma', schema + additionalModels);
  console.log('Added Email Blast models to schema.');
} else {
  console.log('Models already exist.');
}
