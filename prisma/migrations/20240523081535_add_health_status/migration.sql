/*
  Warnings:

  - Changed the type of `healthStatus` on the `Pet` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "HealthStatus" AS ENUM ('VACCINATED', 'SPAYED', 'NEUTERED');

-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "healthStatus",
ADD COLUMN     "healthStatus" "HealthStatus" NOT NULL;
