-- CreateTable
CREATE TABLE "suggestions" (
    "id" TEXT NOT NULL,
    "suggestiveId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "suggestions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trail_suggestion" (
    "id" TEXT NOT NULL,
    "suggestionId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "avatar" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trail_suggestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "playlist_suggestion" (
    "id" TEXT NOT NULL,
    "trailSuggestionId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "playlist_suggestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "block_suggestion" (
    "id" TEXT NOT NULL,
    "playlistSuggestionId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "block_suggestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lesson_suggestion" (
    "id" TEXT NOT NULL,
    "blockSuggestionId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lesson_suggestion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "trail_suggestion_slug_key" ON "trail_suggestion"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "playlist_suggestion_slug_key" ON "playlist_suggestion"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "block_suggestion_slug_key" ON "block_suggestion"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "lesson_suggestion_slug_key" ON "lesson_suggestion"("slug");

-- AddForeignKey
ALTER TABLE "suggestions" ADD CONSTRAINT "suggestions_suggestiveId_fkey" FOREIGN KEY ("suggestiveId") REFERENCES "suggestives"("authUserId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trail_suggestion" ADD CONSTRAINT "trail_suggestion_suggestionId_fkey" FOREIGN KEY ("suggestionId") REFERENCES "suggestions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "playlist_suggestion" ADD CONSTRAINT "playlist_suggestion_trailSuggestionId_fkey" FOREIGN KEY ("trailSuggestionId") REFERENCES "trail_suggestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "block_suggestion" ADD CONSTRAINT "block_suggestion_playlistSuggestionId_fkey" FOREIGN KEY ("playlistSuggestionId") REFERENCES "playlist_suggestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lesson_suggestion" ADD CONSTRAINT "lesson_suggestion_blockSuggestionId_fkey" FOREIGN KEY ("blockSuggestionId") REFERENCES "block_suggestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
