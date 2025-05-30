-- CreateIndex
CREATE INDEX "task_user_listing_idx" ON "tasks"("userId", "completed", "priority", "date");

-- CreateIndex
CREATE INDEX "task_user_completed_idx" ON "tasks"("userId", "completed");

-- CreateIndex
CREATE INDEX "task_title_search_idx" ON "tasks"("title");
