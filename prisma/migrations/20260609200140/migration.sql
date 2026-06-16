/*
  Warnings:

  - You are about to drop the column `banner` on the `Club` table. All the data in the column will be lost.
  - You are about to drop the column `logo` on the `Club` table. All the data in the column will be lost.
  - You are about to drop the column `imagePublicId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Product` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ImageType" AS ENUM ('LOGO', 'BANNER', 'PRODUCT', 'GALLERY');

-- AlterTable
ALTER TABLE "Club" DROP COLUMN "banner",
DROP COLUMN "logo";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "imagePublicId",
DROP COLUMN "imageUrl";

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "type" "ImageType" NOT NULL,
    "clubId" TEXT,
    "productId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
