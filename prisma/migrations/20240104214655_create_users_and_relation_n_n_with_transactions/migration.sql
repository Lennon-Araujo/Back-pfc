-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransactionsOnUsers" (
    "transactionsId" TEXT NOT NULL,
    "usersId" TEXT NOT NULL,

    CONSTRAINT "TransactionsOnUsers_pkey" PRIMARY KEY ("usersId","transactionsId")
);

-- AddForeignKey
ALTER TABLE "TransactionsOnUsers" ADD CONSTRAINT "TransactionsOnUsers_transactionsId_fkey" FOREIGN KEY ("transactionsId") REFERENCES "Transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionsOnUsers" ADD CONSTRAINT "TransactionsOnUsers_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
