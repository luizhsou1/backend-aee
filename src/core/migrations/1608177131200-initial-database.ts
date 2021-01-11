import { MigrationInterface, QueryRunner } from 'typeorm';

export class startModelDb1599939688541 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "deficiency" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "description" character varying(1000), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "pk_deficiency" PRIMARY KEY ("id"));');
    await queryRunner.query('CREATE TYPE "teacher_shiftsaee_enum" AS ENUM(\'MORNING\', \'AFTERNOON\');');
    await queryRunner.query('CREATE TABLE "teacher" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "shiftsAee" "teacher_shiftsaee_enum" array NOT NULL, "supportTeacher" boolean NOT NULL DEFAULT false, "occupationArea" character varying(100) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "rel_teacher" UNIQUE ("userId"), CONSTRAINT "pk_teacher" PRIMARY KEY ("id"));');
    await queryRunner.query('CREATE TABLE "phone" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying(100), "phoneNumber" character varying(20), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "schoolId" uuid, "userId" uuid, "responsibleId" uuid, CONSTRAINT "pk_phone" PRIMARY KEY ("id"));');
    await queryRunner.query('CREATE TYPE "responsible_kinship_enum" AS ENUM(\'MOTHER\', \'FATHER\', \'GRANDMOTHER\', \'GRANDFATHER\', \'STEPMOTHER\', \'STEPFATHER\', \'SISTER\', \'BROTHER\', \'AUNT\', \'UNCLE\', \'NEIGHBOR\', \'OTHER\');');
    await queryRunner.query('CREATE TABLE "responsible" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(30) NOT NULL, "kinship" "responsible_kinship_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "studentId" uuid, CONSTRAINT "pk_responsible" PRIMARY KEY ("id"));');
    await queryRunner.query('CREATE TABLE "document" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "url" character varying(300) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "studentId" uuid, CONSTRAINT "pk_document" PRIMARY KEY ("id"));');
    await queryRunner.query('CREATE TYPE "student_gender_enum" AS ENUM(\'M\', \'F\');');
    await queryRunner.query('CREATE TYPE "student_regularshift_enum" AS ENUM(\'MORNING\', \'AFTERNOON\');');
    await queryRunner.query('CREATE TYPE "student_extraaeeactivity_enum" AS ENUM(\'PSYCHOMOTRICITY\', \'ARTETERAPY\');');
    await queryRunner.query('CREATE TABLE "student" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "aeeRegistration" character varying(30) NOT NULL, "regularRegistration" character varying(30) NOT NULL, "birthDate" date NOT NULL, "gender" "student_gender_enum" NOT NULL, "regularShift" "student_regularshift_enum" NOT NULL, "regularClassYear" integer NOT NULL, "regularClass" character varying(10) NOT NULL, "regularClassRoom" integer NOT NULL, "aeeClass" character varying(10) NOT NULL, "urlImage" character varying(300), "extraAeeActivity" "student_extraaeeactivity_enum" array NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "supportTeacherId" uuid, "sourceSchoolId" uuid, CONSTRAINT "pk_student" PRIMARY KEY ("id"));');
    await queryRunner.query('CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying(100), "cep" character varying(10) NOT NULL, "city" character varying(100) NOT NULL, "uf" character varying(100) NOT NULL, "neighborhood" character varying(100) NOT NULL, "street" character varying(100) NOT NULL, "addressNumber" integer NOT NULL, "complement" character varying(100) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "schoolId" uuid, "studentId" uuid, CONSTRAINT "REL_a5ccdaee04160f4fa15b26c6fe" UNIQUE ("schoolId"), CONSTRAINT "rel_address" UNIQUE ("studentId"), CONSTRAINT "pk_address" PRIMARY KEY ("id"));');
    await queryRunner.query('CREATE TABLE "school" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "hasAee" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "pk_school" PRIMARY KEY ("id"));');
    await queryRunner.query('CREATE TYPE "user_role_enum" AS ENUM(\'ADMIN\', \'SUPERVISOR\', \'TEACHER\');');
    await queryRunner.query('CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(100) NOT NULL, "name" character varying(100) NOT NULL, "role" "user_role_enum" NOT NULL, "active" boolean NOT NULL DEFAULT true, "password" character varying(100) NOT NULL, "salt" character varying(100) NOT NULL, "recoverToken" character varying(64), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "sourceSchoolId" uuid, CONSTRAINT "uq_user_email" UNIQUE ("email"), CONSTRAINT "pk_user" PRIMARY KEY ("id"));');
    await queryRunner.query('CREATE TABLE "student_deficiency" ("studentId" uuid NOT NULL, "deficiencyId" uuid NOT NULL, CONSTRAINT "pk_student_deficiency" PRIMARY KEY ("studentId", "deficiencyId"));');
    await queryRunner.query('CREATE INDEX "idx_student_deficiency_student" ON "student_deficiency" ("studentId") ;');
    await queryRunner.query('CREATE INDEX "idx_student_deficiency_deficiency" ON "student_deficiency" ("deficiencyId") ;');
    await queryRunner.query('CREATE TABLE "student_teacher" ("studentId" uuid NOT NULL, "teacherId" uuid NOT NULL, CONSTRAINT "pk_student_teacher" PRIMARY KEY ("studentId", "teacherId"));');
    await queryRunner.query('CREATE INDEX "idx_student_teacher_student" ON "student_teacher" ("studentId") ;');
    await queryRunner.query('CREATE INDEX "idx_student_teacher_teacher" ON "student_teacher" ("teacherId") ;');
    await queryRunner.query('ALTER TABLE "teacher" ADD CONSTRAINT "fk_teacher_user" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;');
    await queryRunner.query('ALTER TABLE "phone" ADD CONSTRAINT "fk_phone_school" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE CASCADE ON UPDATE NO ACTION;');
    await queryRunner.query('ALTER TABLE "phone" ADD CONSTRAINT "fk_phone_user" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;');
    await queryRunner.query('ALTER TABLE "phone" ADD CONSTRAINT "fk_phone_responsible" FOREIGN KEY ("responsibleId") REFERENCES "responsible"("id") ON DELETE CASCADE ON UPDATE NO ACTION;');
    await queryRunner.query('ALTER TABLE "responsible" ADD CONSTRAINT "fk_responsible_student" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE NO ACTION;');
    await queryRunner.query('ALTER TABLE "document" ADD CONSTRAINT "fk_document_student" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE NO ACTION;');
    await queryRunner.query('ALTER TABLE "student" ADD CONSTRAINT "fk_student_teacher" FOREIGN KEY ("supportTeacherId") REFERENCES "teacher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;');
    await queryRunner.query('ALTER TABLE "student" ADD CONSTRAINT "fk_student_school" FOREIGN KEY ("sourceSchoolId") REFERENCES "school"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;');
    await queryRunner.query('ALTER TABLE "address" ADD CONSTRAINT "fk_addres_school" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE CASCADE ON UPDATE NO ACTION;');
    await queryRunner.query('ALTER TABLE "address" ADD CONSTRAINT "fk_address_student" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE NO ACTION;');
    await queryRunner.query('ALTER TABLE "user" ADD CONSTRAINT "fk_user_school" FOREIGN KEY ("sourceSchoolId") REFERENCES "school"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;');
    await queryRunner.query('ALTER TABLE "student_deficiency" ADD CONSTRAINT "fk_student_deficiency_student" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE NO ACTION;');
    await queryRunner.query('ALTER TABLE "student_deficiency" ADD CONSTRAINT "fk_student_deficiency_defiency" FOREIGN KEY ("deficiencyId") REFERENCES "deficiency"("id") ON DELETE CASCADE ON UPDATE NO ACTION;');
    await queryRunner.query('ALTER TABLE "student_teacher" ADD CONSTRAINT "fk_student_teacher_student" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE NO ACTION;');
    await queryRunner.query('ALTER TABLE "student_teacher" ADD CONSTRAINT "fk_student_teacher_teacher" FOREIGN KEY ("teacherId") REFERENCES "teacher"("id") ON DELETE CASCADE ON UPDATE NO ACTION;');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "student_deficiency";');
    await queryRunner.query('DROP TABLE "student_teacher";');
    await queryRunner.query('DROP TABLE "phone";');
    await queryRunner.query('DROP TABLE "address";');
    await queryRunner.query('DROP TABLE "responsible";');
    await queryRunner.query('DROP TABLE "document";');
    await queryRunner.query('DROP TABLE "student";');
    await queryRunner.query('DROP TABLE "teacher";');
    await queryRunner.query('DROP TABLE "user";');
    await queryRunner.query('DROP TABLE "school";');
    await queryRunner.query('DROP TABLE "deficiency";');

    await queryRunner.query('DROP TYPE "teacher_shiftsaee_enum"');
    await queryRunner.query('DROP TYPE "responsible_kinship_enum"');
    await queryRunner.query('DROP TYPE "student_gender_enum"');
    await queryRunner.query('DROP TYPE "student_regularshift_enum"');
    await queryRunner.query('DROP TYPE "student_extraaeeactivity_enum"');
    await queryRunner.query('DROP TYPE "user_role_enum"');
  }
}
