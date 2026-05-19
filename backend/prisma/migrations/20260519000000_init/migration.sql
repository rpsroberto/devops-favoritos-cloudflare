CREATE TABLE "clients" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "favorites" (
  "id" TEXT NOT NULL,
  "clientId" TEXT NOT NULL,
  "productId" INTEGER NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "favorites_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "clients_email_key" ON "clients"("email");
CREATE UNIQUE INDEX "favorites_clientId_productId_key" ON "favorites"("clientId", "productId");

ALTER TABLE "favorites"
ADD CONSTRAINT "favorites_clientId_fkey"
FOREIGN KEY ("clientId") REFERENCES "clients"("id")
ON DELETE CASCADE ON UPDATE CASCADE;
