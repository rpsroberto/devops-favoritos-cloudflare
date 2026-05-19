CREATE TYPE "StickerType" AS ENUM ('WANTED', 'DUPLICATE');

CREATE TABLE "collectors" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "city" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "collectors_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "sticker_items" (
  "id" TEXT NOT NULL,
  "collectorId" TEXT NOT NULL,
  "stickerCode" TEXT NOT NULL,
  "type" "StickerType" NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "sticker_items_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "collectors_email_key" ON "collectors"("email");
CREATE UNIQUE INDEX "sticker_items_collectorId_stickerCode_type_key" ON "sticker_items"("collectorId", "stickerCode", "type");

ALTER TABLE "sticker_items"
ADD CONSTRAINT "sticker_items_collectorId_fkey"
FOREIGN KEY ("collectorId") REFERENCES "collectors"("id")
ON DELETE CASCADE ON UPDATE CASCADE;
