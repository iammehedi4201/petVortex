/*
  Warnings:

  - You are about to drop the column `petOwnershipExperience` on the `adoption_requests` table. All the data in the column will be lost.
  - Added the required column `address` to the `adoption_requests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `adoption_requests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `adoption_requests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipCode` to the `adoption_requests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "adoption_requests" DROP COLUMN "petOwnershipExperience",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "zipCode" TEXT NOT NULL;
