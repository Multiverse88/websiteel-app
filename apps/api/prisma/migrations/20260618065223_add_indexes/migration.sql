-- CreateIndex
CREATE INDEX "Article_category_idx" ON "Article"("category");

-- CreateIndex
CREATE INDEX "Article_createdAt_idx" ON "Article"("createdAt");

-- CreateIndex
CREATE INDEX "Article_authorId_idx" ON "Article"("authorId");

-- CreateIndex
CREATE INDEX "EmailLog_broadcastId_idx" ON "EmailLog"("broadcastId");

-- CreateIndex
CREATE INDEX "EmailLog_recipient_idx" ON "EmailLog"("recipient");

-- CreateIndex
CREATE INDEX "EmailLog_status_idx" ON "EmailLog"("status");

-- CreateIndex
CREATE INDEX "EmailLog_sentAt_idx" ON "EmailLog"("sentAt");

-- CreateIndex
CREATE INDEX "NewsletterBroadcast_articleId_idx" ON "NewsletterBroadcast"("articleId");

-- CreateIndex
CREATE INDEX "NewsletterBroadcast_sentAt_idx" ON "NewsletterBroadcast"("sentAt");

-- CreateIndex
CREATE INDEX "NewsletterSubscriber_isActive_idx" ON "NewsletterSubscriber"("isActive");

-- CreateIndex
CREATE INDEX "NewsletterSubscriber_subscribedAt_idx" ON "NewsletterSubscriber"("subscribedAt");
