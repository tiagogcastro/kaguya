-- CreateTable
CREATE TABLE "suggestives" (
    "id" TEXT NOT NULL,
    "authUserId" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "avatar" TEXT,
    "username" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "suggestives_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "suggestives_authUserId_key" ON "suggestives"("authUserId");

-- CreateIndex
CREATE UNIQUE INDEX "suggestives_email_key" ON "suggestives"("email");

-- CreateIndex
CREATE UNIQUE INDEX "suggestives_username_key" ON "suggestives"("username");
