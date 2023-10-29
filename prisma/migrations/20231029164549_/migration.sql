/*
  Warnings:

  - Added the required column `email` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProductCategory" AS ENUM ('MEAL', 'SIDE_DISH', 'DRINK', 'DESSERT');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('WAITING_PAYMENT', 'RECEIVED', 'PREPARING', 'READY', 'FINISHED');

-- CreateEnum
CREATE TYPE "OrderPaymentStatus" AS ENUM ('PENDING', 'PAID');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "order" (
    "id" TEXT NOT NULL,
    "order_status" "OrderStatus" NOT NULL DEFAULT 'WAITING_PAYMENT',
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "product_category" "ProductCategory" NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_payment" (
    "id" TEXT NOT NULL,
    "order_payment_status" "OrderPaymentStatus" NOT NULL DEFAULT 'PENDING',
    "order_id" TEXT NOT NULL,

    CONSTRAINT "order_payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_image" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "product_image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_OrderToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "order_id_key" ON "order"("id");

-- CreateIndex
CREATE UNIQUE INDEX "product_id_key" ON "product"("id");

-- CreateIndex
CREATE UNIQUE INDEX "order_payment_id_key" ON "order_payment"("id");

-- CreateIndex
CREATE UNIQUE INDEX "order_payment_order_id_key" ON "order_payment"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "product_image_id_key" ON "product_image"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_OrderToProduct_AB_unique" ON "_OrderToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_OrderToProduct_B_index" ON "_OrderToProduct"("B");

-- AddForeignKey
ALTER TABLE "order_payment" ADD CONSTRAINT "order_payment_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_image" ADD CONSTRAINT "product_image_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderToProduct" ADD CONSTRAINT "_OrderToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderToProduct" ADD CONSTRAINT "_OrderToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
