-- CreateTable
CREATE TABLE "Features" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT,

    CONSTRAINT "Features_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeaturesInInstitutes" (
    "id" TEXT NOT NULL,
    "feature_id" TEXT NOT NULL,
    "institute_id" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,

    CONSTRAINT "FeaturesInInstitutes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MusicalGenre" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MusicalGenre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MusicalGenreEvent" (
    "id" TEXT NOT NULL,
    "musicalgenre_id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,

    CONSTRAINT "MusicalGenreEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Institutes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT,
    "description" TEXT NOT NULL,
    "institute_type" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "district_id" TEXT NOT NULL,

    CONSTRAINT "Institutes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "institute_id" TEXT NOT NULL,
    "star" INTEGER NOT NULL,
    "review" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorite" (
    "id" TEXT NOT NULL,
    "institute_id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "institute_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "banner_url" TEXT,
    "logo_url" TEXT,
    "address" TEXT NOT NULL,
    "price" TEXT,
    "age_range" TEXT,
    "event_date" TIMESTAMP(3) NOT NULL,
    "district_id" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Presence" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "promoter_code" TEXT,

    CONSTRAINT "Presence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lnk_instagram" TEXT,
    "lnk_tiktok" TEXT,
    "lnk_twitter" TEXT,
    "bg_photo" TEXT,
    "profile_photo" TEXT,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Follow" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "follow" TEXT NOT NULL,

    CONSTRAINT "Follow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Galery" (
    "id" TEXT NOT NULL,
    "photo_id" TEXT NOT NULL,
    "institute_id" TEXT NOT NULL,

    CONSTRAINT "Galery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Photos" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoleType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "RoleType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoleTypeInInstitute" (
    "id" TEXT NOT NULL,
    "roletype_id" TEXT NOT NULL,
    "institute_id" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,

    CONSTRAINT "RoleTypeInInstitute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "District" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "region" TEXT NOT NULL,

    CONSTRAINT "District_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "FeaturesInInstitutes" ADD CONSTRAINT "FeaturesInInstitutes_feature_id_fkey" FOREIGN KEY ("feature_id") REFERENCES "Features"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeaturesInInstitutes" ADD CONSTRAINT "FeaturesInInstitutes_institute_id_fkey" FOREIGN KEY ("institute_id") REFERENCES "Institutes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeaturesInInstitutes" ADD CONSTRAINT "FeaturesInInstitutes_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "RoleTypeInInstitute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MusicalGenreEvent" ADD CONSTRAINT "MusicalGenreEvent_musicalgenre_id_fkey" FOREIGN KEY ("musicalgenre_id") REFERENCES "MusicalGenre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MusicalGenreEvent" ADD CONSTRAINT "MusicalGenreEvent_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Institutes" ADD CONSTRAINT "Institutes_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "District"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_institute_id_fkey" FOREIGN KEY ("institute_id") REFERENCES "Institutes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_institute_id_fkey" FOREIGN KEY ("institute_id") REFERENCES "Institutes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_institute_id_fkey" FOREIGN KEY ("institute_id") REFERENCES "Institutes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "District"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Presence" ADD CONSTRAINT "Presence_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Presence" ADD CONSTRAINT "Presence_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Galery" ADD CONSTRAINT "Galery_photo_id_fkey" FOREIGN KEY ("photo_id") REFERENCES "Photos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Galery" ADD CONSTRAINT "Galery_institute_id_fkey" FOREIGN KEY ("institute_id") REFERENCES "Institutes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoleTypeInInstitute" ADD CONSTRAINT "RoleTypeInInstitute_roletype_id_fkey" FOREIGN KEY ("roletype_id") REFERENCES "RoleType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoleTypeInInstitute" ADD CONSTRAINT "RoleTypeInInstitute_institute_id_fkey" FOREIGN KEY ("institute_id") REFERENCES "Institutes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
