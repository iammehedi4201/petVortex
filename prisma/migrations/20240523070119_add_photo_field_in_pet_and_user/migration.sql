/*
  Warnings:

  - Added the required column `photo` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profilePicture` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pet" ADD COLUMN     "photo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "profilePicture" TEXT NOT NULL;
