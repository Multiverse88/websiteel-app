-- AlterTable
ALTER TABLE "CampaignRecipient" ADD COLUMN     "bouncedAt" TIMESTAMP(3),
ADD COLUMN     "clickedAt" TIMESTAMP(3),
ADD COLUMN     "device" TEXT,
ADD COLUMN     "openCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "EmailCampaign" ADD COLUMN     "internalName" TEXT,
ADD COLUMN     "isTemplate" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "previewText" TEXT;

-- CreateTable
CREATE TABLE "ContactSegment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactSegment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CampaignLink" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "clicks" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "CampaignLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BlastContactToContactSegment" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_BlastContactToContactSegment_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_BlastContactToContactSegment_B_index" ON "_BlastContactToContactSegment"("B");

-- AddForeignKey
ALTER TABLE "CampaignLink" ADD CONSTRAINT "CampaignLink_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "EmailCampaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlastContactToContactSegment" ADD CONSTRAINT "_BlastContactToContactSegment_A_fkey" FOREIGN KEY ("A") REFERENCES "BlastContact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlastContactToContactSegment" ADD CONSTRAINT "_BlastContactToContactSegment_B_fkey" FOREIGN KEY ("B") REFERENCES "ContactSegment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
