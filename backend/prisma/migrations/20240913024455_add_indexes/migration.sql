-- CreateIndex
CREATE INDEX "Category_name_idx" ON "Category"("name");

-- CreateIndex
CREATE INDEX "Comment_userId_idx" ON "Comment"("userId");

-- CreateIndex
CREATE INDEX "Comment_newsId_idx" ON "Comment"("newsId");

-- CreateIndex
CREATE INDEX "News_authorId_idx" ON "News"("authorId");

-- CreateIndex
CREATE INDEX "News_categoryId_idx" ON "News"("categoryId");

-- CreateIndex
CREATE INDEX "News_title_idx" ON "News"("title");

-- CreateIndex
CREATE INDEX "NewsLike_newsId_userId_idx" ON "NewsLike"("newsId", "userId");

-- CreateIndex
CREATE INDEX "NewsTag_newsId_tagId_idx" ON "NewsTag"("newsId", "tagId");

-- CreateIndex
CREATE INDEX "Tag_name_idx" ON "Tag"("name");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");
