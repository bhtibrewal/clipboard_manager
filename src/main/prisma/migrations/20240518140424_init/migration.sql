-- CreateTable
CREATE TABLE "Clipboard" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "content" TEXT,
    "width" INTEGER,
    "height" INTEGER,
    "size" TEXT,
    "blob" BYTEA,
    "star" BOOLEAN NOT NULL DEFAULT false,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Clipboard_pkey" PRIMARY KEY ("id")
);
