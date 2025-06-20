/*
  Warnings:

  - You are about to drop the column `date` on the `workoutdays` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "exercises" DROP CONSTRAINT "exercises_workoutDayId_fkey";

-- DropForeignKey
ALTER TABLE "exercisesets" DROP CONSTRAINT "exercisesets_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "workoutdays" DROP CONSTRAINT "workoutdays_userId_fkey";

-- AlterTable
ALTER TABLE "workoutdays" DROP COLUMN "date";

-- AddForeignKey
ALTER TABLE "workoutdays" ADD CONSTRAINT "workoutdays_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_workoutDayId_fkey" FOREIGN KEY ("workoutDayId") REFERENCES "workoutdays"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercisesets" ADD CONSTRAINT "exercisesets_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;
