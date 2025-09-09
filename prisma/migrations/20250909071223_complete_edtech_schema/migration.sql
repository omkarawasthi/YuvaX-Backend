-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('Student', 'Teacher', 'Admin', 'SuperAdmin');

-- CreateEnum
CREATE TYPE "public"."SlotStatus" AS ENUM ('open', 'trial_reserved', 'paid_reserved');

-- CreateEnum
CREATE TYPE "public"."SessionStatus" AS ENUM ('schedule', 'completed', 'cancelled', 'no_show', 'Reschedule');

-- CreateEnum
CREATE TYPE "public"."ClassType" AS ENUM ('one_to_one', 'one_to_many', 'recorded');

-- CreateEnum
CREATE TYPE "public"."SessionType" AS ENUM ('demo', 'paid', 'trial');

-- CreateEnum
CREATE TYPE "public"."Difficulty" AS ENUM ('beginner', 'intermediate', 'advance');

-- CreateEnum
CREATE TYPE "public"."PaymentStatus" AS ENUM ('pending', 'Paid', 'Refund', 'processing');

-- CreateTable
CREATE TABLE "public"."User" (
    "user_id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "age" TEXT,
    "ip_address" TEXT,
    "password" TEXT NOT NULL,
    "is_trial" BOOLEAN NOT NULL DEFAULT true,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "parents_name" TEXT,
    "region" TEXT,
    "country" TEXT,
    "date_of_birth" TIMESTAMP(3),
    "gender" TEXT,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "public"."UserRole" NOT NULL DEFAULT 'Student',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "public"."TeachersRoaster" (
    "teacher_id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "days_of_week" TEXT[],
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeachersRoaster_pkey" PRIMARY KEY ("teacher_id")
);

-- CreateTable
CREATE TABLE "public"."Slot" (
    "slot_id" SERIAL NOT NULL,
    "slot_date" TIMESTAMP(3) NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "capacity" INTEGER NOT NULL,
    "status" "public"."SlotStatus" NOT NULL DEFAULT 'open',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "reservedByUserId" TEXT,

    CONSTRAINT "Slot_pkey" PRIMARY KEY ("slot_id")
);

-- CreateTable
CREATE TABLE "public"."SalesRoster" (
    "sales_person_id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_no" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SalesRoster_pkey" PRIMARY KEY ("sales_person_id")
);

-- CreateTable
CREATE TABLE "public"."Sale" (
    "sale_id" TEXT NOT NULL,
    "sales_person_id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,
    "demo_session_id" TEXT,
    "converted_to_paid" BOOLEAN NOT NULL DEFAULT false,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("sale_id")
);

-- CreateTable
CREATE TABLE "public"."Module" (
    "module_id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,
    "student_note_link" TEXT,
    "teacher_note_link" TEXT,
    "PPT_link" TEXT,
    "module_description" TEXT,
    "module_title" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Module_pkey" PRIMARY KEY ("module_id")
);

-- CreateTable
CREATE TABLE "public"."Session" (
    "session_id" TEXT NOT NULL,
    "chapter_id" TEXT,
    "teacher_id" TEXT NOT NULL,
    "module_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL,
    "course_id" TEXT NOT NULL,
    "slot_id" INTEGER,
    "schedule_at" TIMESTAMP(3) NOT NULL,
    "status" "public"."SessionStatus" NOT NULL DEFAULT 'schedule',
    "class_type" "public"."ClassType" NOT NULL,
    "session_type" "public"."SessionType" NOT NULL,
    "actual_start_time" TIMESTAMP(3),
    "actual_end_time" TIMESTAMP(3),
    "original_sale_id" TEXT,
    "current_sale_id" TEXT,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("session_id")
);

-- CreateTable
CREATE TABLE "public"."Category" (
    "category_id" SERIAL NOT NULL,
    "image" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "category_name" TEXT NOT NULL,
    "category_image" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "public"."Course" (
    "course_id" TEXT NOT NULL,
    "course_name" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL,
    "course_description" TEXT,
    "course_content" TEXT,
    "difficulty" "public"."Difficulty" NOT NULL,
    "course_duration" TEXT NOT NULL,
    "actual_price" DOUBLE PRECISION NOT NULL,
    "discounted_price" DOUBLE PRECISION,
    "language" TEXT NOT NULL,
    "total_lesson" INTEGER NOT NULL,
    "class_type" "public"."ClassType" NOT NULL,
    "max_age" TEXT,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("course_id")
);

-- CreateTable
CREATE TABLE "public"."Chapter" (
    "chapter_id" TEXT NOT NULL,
    "module_id" TEXT NOT NULL,
    "chapter_name" TEXT NOT NULL,
    "description" TEXT,
    "capacity" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Chapter_pkey" PRIMARY KEY ("chapter_id")
);

-- CreateTable
CREATE TABLE "public"."Payment" (
    "payment_ID" TEXT NOT NULL,
    "no_of_session_purchase" INTEGER,
    "sales_id" TEXT,
    "user_id" TEXT NOT NULL,
    "is_converted" BOOLEAN NOT NULL DEFAULT false,
    "course_id" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "payment_method" TEXT,
    "transaction_id" TEXT NOT NULL,
    "receipt" TEXT,
    "status" "public"."PaymentStatus" NOT NULL DEFAULT 'pending',
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("payment_ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "public"."User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SalesRoster_email_key" ON "public"."SalesRoster"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SalesRoster_phone_no_key" ON "public"."SalesRoster"("phone_no");

-- CreateIndex
CREATE UNIQUE INDEX "Session_slot_id_key" ON "public"."Session"("slot_id");

-- CreateIndex
CREATE UNIQUE INDEX "Session_user_id_course_id_schedule_at_key" ON "public"."Session"("user_id", "course_id", "schedule_at");

-- CreateIndex
CREATE UNIQUE INDEX "Session_slot_unique" ON "public"."Session"("slot_id");

-- CreateIndex
CREATE UNIQUE INDEX "Category_category_name_key" ON "public"."Category"("category_name");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_transaction_id_key" ON "public"."Payment"("transaction_id");

-- AddForeignKey
ALTER TABLE "public"."TeachersRoaster" ADD CONSTRAINT "TeachersRoaster_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "public"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Slot" ADD CONSTRAINT "Slot_reservedByUserId_fkey" FOREIGN KEY ("reservedByUserId") REFERENCES "public"."User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Sale" ADD CONSTRAINT "Sale_sales_person_id_fkey" FOREIGN KEY ("sales_person_id") REFERENCES "public"."SalesRoster"("sales_person_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Sale" ADD CONSTRAINT "Sale_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "public"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Sale" ADD CONSTRAINT "Sale_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "public"."Course"("course_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Module" ADD CONSTRAINT "Module_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "public"."Course"("course_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Session" ADD CONSTRAINT "Session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Session" ADD CONSTRAINT "Session_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "public"."TeachersRoaster"("teacher_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Session" ADD CONSTRAINT "Session_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "public"."Module"("module_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Session" ADD CONSTRAINT "Session_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "public"."Course"("course_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Session" ADD CONSTRAINT "Session_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."Category"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Session" ADD CONSTRAINT "Session_chapter_id_fkey" FOREIGN KEY ("chapter_id") REFERENCES "public"."Chapter"("chapter_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Session" ADD CONSTRAINT "Session_original_sale_id_fkey" FOREIGN KEY ("original_sale_id") REFERENCES "public"."Sale"("sale_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Session" ADD CONSTRAINT "Session_current_sale_id_fkey" FOREIGN KEY ("current_sale_id") REFERENCES "public"."Sale"("sale_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Session" ADD CONSTRAINT "Session_slot_id_fkey" FOREIGN KEY ("slot_id") REFERENCES "public"."Slot"("slot_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Course" ADD CONSTRAINT "Course_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."Category"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Chapter" ADD CONSTRAINT "Chapter_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "public"."Module"("module_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_sales_id_fkey" FOREIGN KEY ("sales_id") REFERENCES "public"."Sale"("sale_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "public"."Course"("course_id") ON DELETE SET NULL ON UPDATE CASCADE;
