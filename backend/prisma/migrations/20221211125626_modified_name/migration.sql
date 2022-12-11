/*
  Warnings:

  - Made the column `walletId` on table `TransactionCategory` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "TransactionCategory" DROP CONSTRAINT "TransactionCategory_walletId_fkey";

-- DropIndex
DROP INDEX "TransactionCategory_name_key";

-- AlterTable
ALTER TABLE "TransactionCategory" ALTER COLUMN "walletId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "TransactionCategory" ADD CONSTRAINT "TransactionCategory_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
