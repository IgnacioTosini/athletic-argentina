/*
  Warnings:

  - You are about to drop the column `clubId` on the `Order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_clubId_fkey";

-- DropIndex
DROP INDEX "Order_clubId_idx";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "clubId";
