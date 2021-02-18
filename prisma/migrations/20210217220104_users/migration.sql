-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_secrets" (
    "user_id" INTEGER NOT NULL,
    "password_hash" TEXT NOT NULL,
    "last_login_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "failed_password_attempts" INTEGER NOT NULL DEFAULT 0,
    "first_failed_password_attempt" TIMESTAMP(3),
    "reset_password_token" TEXT,
    "reset_password_token_generated" TIMESTAMP(3),
    "failed_reset_password_attempts" INTEGER NOT NULL DEFAULT 0,
    "first_failed_reset_password_attempt" TIMESTAMP(3),
    "verify_email_token" TEXT,
    "verify_email_token_generated" TIMESTAMP(3),
    "delete_account_token" TEXT,
    "delete_account_token_generated" TIMESTAMP(3),

    PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users.email_unique" ON "users"("email");

-- AddForeignKey
ALTER TABLE "user_secrets" ADD FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
