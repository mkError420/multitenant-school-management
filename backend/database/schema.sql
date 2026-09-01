-- ============================================================================
-- DATABASE SCHEMA: Multi-Tenant Bangladeshi School & College Management System
-- Database Engine: MySQL / MariaDB (InnoDB, utf8mb4)
-- Multi-Tenancy: Single Database with Row-Level 'tenant_id' Isolation
-- ============================================================================

CREATE DATABASE IF NOT EXISTS `school_saas_bd` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `school_saas_bd`;

-- ----------------------------------------------------------------------------
-- 1. SAAS PLATFORM & TENANT MANAGEMENT
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `subscription_plans` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `slug` VARCHAR(50) NOT NULL UNIQUE,
    `max_students` INT UNSIGNED NOT NULL DEFAULT 500,
    `max_teachers` INT UNSIGNED NOT NULL DEFAULT 30,
    `features_json` JSON NULL,
    `price_monthly` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    `price_yearly` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    `is_active` TINYINT(1) NOT NULL DEFAULT 1,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `tenants` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `uuid` CHAR(36) NOT NULL UNIQUE,
    `name` VARCHAR(255) NOT NULL,
    `short_name` VARCHAR(50) NULL,
    `eiin_number` VARCHAR(30) NULL,
    `board_name` ENUM('Dhaka', 'Chittagong', 'Rajshahi', 'Jessore', 'Comilla', 'Barisal', 'Sylhet', 'Dinajpur', 'Mymensingh', 'Madrasah', 'Technical') DEFAULT 'Dhaka',
    `subdomain` VARCHAR(100) NOT NULL UNIQUE,
    `custom_domain` VARCHAR(255) NULL UNIQUE,
    `logo_url` VARCHAR(500) NULL,
    `banner_url` VARCHAR(500) NULL,
    `theme_color` VARCHAR(20) DEFAULT '#059669',
    `email` VARCHAR(150) NOT NULL,
    `phone` VARCHAR(30) NOT NULL,
    `address` TEXT NULL,
    `status` ENUM('active', 'suspended', 'trial', 'pending') DEFAULT 'active',
    `subscription_plan_id` INT UNSIGNED NULL,
    `subscription_expires_at` DATE NULL,
    `sms_balance` INT UNSIGNED NOT NULL DEFAULT 100,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`subscription_plan_id`) REFERENCES `subscription_plans`(`id`) ON DELETE SET NULL,
    INDEX `idx_tenant_subdomain` (`subdomain`),
    INDEX `idx_tenant_status` (`status`)
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 2. USERS & RBAC
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `users` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT UNSIGNED NULL, -- NULL indicates Super Admin (Platform Owner)
    `name` VARCHAR(150) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `phone` VARCHAR(30) NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `role` ENUM('super_admin', 'school_admin', 'principal', 'teacher', 'student', 'parent', 'accountant', 'staff') NOT NULL DEFAULT 'student',
    `avatar_url` VARCHAR(500) NULL,
    `status` ENUM('active', 'inactive', 'banned') DEFAULT 'active',
    `last_login_at` TIMESTAMP NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON DELETE CASCADE,
    UNIQUE KEY `unique_email_per_tenant` (`tenant_id`, `email`),
    INDEX `idx_users_role` (`tenant_id`, `role`),
    INDEX `idx_users_phone` (`phone`)
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 3. ACADEMIC STRUCTURE (Sessions, Shifts, Classes, Sections, Subjects)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `academic_years` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT UNSIGNED NOT NULL,
    `year` VARCHAR(20) NOT NULL, -- e.g. "2026", "2025-2026"
    `title` VARCHAR(100) NOT NULL,
    `is_current` TINYINT(1) NOT NULL DEFAULT 0,
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON DELETE CASCADE,
    INDEX `idx_academic_year_tenant` (`tenant_id`, `is_current`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `shifts` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT UNSIGNED NOT NULL,
    `name` VARCHAR(50) NOT NULL, -- Morning, Day, Evening
    `start_time` TIME NOT NULL,
    `end_time` TIME NOT NULL,
    FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON DELETE CASCADE,
    INDEX `idx_shifts_tenant` (`tenant_id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `classes` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT UNSIGNED NOT NULL,
    `name` VARCHAR(100) NOT NULL, -- "Class 6", "Class 10", "HSC 1st Year"
    `numeric_value` TINYINT UNSIGNED NOT NULL, -- 1 to 12
    `has_groups` TINYINT(1) NOT NULL DEFAULT 0, -- 1 for Class 9-12 (Science/Arts/Commerce)
    FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON DELETE CASCADE,
    INDEX `idx_classes_tenant` (`tenant_id`, `numeric_value`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `sections` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT UNSIGNED NOT NULL,
    `class_id` INT UNSIGNED NOT NULL,
    `shift_id` INT UNSIGNED NULL,
    `name` VARCHAR(50) NOT NULL, -- "Padma", "Meghna", "Jamuna", "Section A"
    `capacity` INT UNSIGNED NOT NULL DEFAULT 60,
    `room_no` VARCHAR(30) NULL,
    FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`class_id`) REFERENCES `classes`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`shift_id`) REFERENCES `shifts`(`id`) ON DELETE SET NULL,
    INDEX `idx_sections_tenant_class` (`tenant_id`, `class_id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `subjects` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT UNSIGNED NOT NULL,
    `class_id` INT UNSIGNED NOT NULL,
    `group_name` ENUM('all', 'science', 'humanities', 'business_studies') DEFAULT 'all',
    `name` VARCHAR(100) NOT NULL, -- "Bangla 1st Paper", "Higher Mathematics"
    `code` VARCHAR(20) NOT NULL, -- "101", "126"
    `type` ENUM('compulsory', 'optional', 'elective_4th') DEFAULT 'compulsory',
    `full_marks` DECIMAL(5,2) NOT NULL DEFAULT 100.00,
    `pass_marks` DECIMAL(5,2) NOT NULL DEFAULT 33.00,
    `cq_marks` DECIMAL(5,2) DEFAULT 70.00,
    `mcq_marks` DECIMAL(5,2) DEFAULT 30.00,
    `practical_marks` DECIMAL(5,2) DEFAULT 0.00,
    FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`class_id`) REFERENCES `classes`(`id`) ON DELETE CASCADE,
    INDEX `idx_subjects_tenant_class` (`tenant_id`, `class_id`)
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 4. TEACHERS, STAFF & ROUTINES
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `teachers` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT UNSIGNED NOT NULL,
    `user_id` INT UNSIGNED NOT NULL,
    `employee_id` VARCHAR(50) NOT NULL,
    `designation` VARCHAR(100) NOT NULL, -- Principal, Assistant Headmaster, Senior Teacher, Lecturer
    `department` VARCHAR(100) NULL,
    `qualification` VARCHAR(255) NULL,
    `joining_date` DATE NULL,
    `salary_basic` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    `emergency_contact` VARCHAR(30) NULL,
    `nid_no` VARCHAR(50) NULL,
    FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    UNIQUE KEY `unique_employee_per_tenant` (`tenant_id`, `employee_id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `class_routines` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT UNSIGNED NOT NULL,
    `class_id` INT UNSIGNED NOT NULL,
    `section_id` INT UNSIGNED NOT NULL,
    `subject_id` INT UNSIGNED NOT NULL,
    `teacher_id` INT UNSIGNED NOT NULL,
    `day_of_week` ENUM('Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday') NOT NULL,
    `start_time` TIME NOT NULL,
    `end_time` TIME NOT NULL,
    `room_no` VARCHAR(30) NULL,
    FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`class_id`) REFERENCES `classes`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`section_id`) REFERENCES `sections`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`subject_id`) REFERENCES `subjects`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`teacher_id`) REFERENCES `teachers`(`id`) ON DELETE CASCADE,
    INDEX `idx_routine_schedule` (`tenant_id`, `class_id`, `section_id`, `day_of_week`)
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 5. STUDENTS & GUARDIANS
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `students` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT UNSIGNED NOT NULL,
    `user_id` INT UNSIGNED NULL,
    `admission_no` VARCHAR(50) NOT NULL,
    `roll_no` INT UNSIGNED NOT NULL,
    `academic_year_id` INT UNSIGNED NOT NULL,
    `class_id` INT UNSIGNED NOT NULL,
    `section_id` INT UNSIGNED NOT NULL,
    `shift_id` INT UNSIGNED NULL,
    `group_name` ENUM('general', 'science', 'humanities', 'business_studies') DEFAULT 'general',
    `fourth_subject_id` INT UNSIGNED NULL,
    
    `name_en` VARCHAR(150) NOT NULL,
    `name_bn` VARCHAR(150) NULL,
    `dob` DATE NULL,
    `gender` ENUM('male', 'female', 'other') NOT NULL,
    `blood_group` ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown') DEFAULT 'Unknown',
    `religion` ENUM('Islam', 'Hinduism', 'Buddhism', 'Christianity', 'Other') DEFAULT 'Islam',
    `birth_certificate_no` VARCHAR(50) NULL,
    `present_address` TEXT NULL,
    `permanent_address` TEXT NULL,
    `photo_url` VARCHAR(500) NULL,
    
    `status` ENUM('active', 'passed_out', 'transferred', 'expelled') DEFAULT 'active',
    `admission_date` DATE NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL,
    FOREIGN KEY (`academic_year_id`) REFERENCES `academic_years`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`class_id`) REFERENCES `classes`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`section_id`) REFERENCES `sections`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`shift_id`) REFERENCES `shifts`(`id`) ON DELETE SET NULL,
    FOREIGN KEY (`fourth_subject_id`) REFERENCES `subjects`(`id`) ON DELETE SET NULL,
    UNIQUE KEY `unique_student_roll` (`tenant_id`, `academic_year_id`, `class_id`, `section_id`, `roll_no`),
    UNIQUE KEY `unique_student_adm` (`tenant_id`, `admission_no`),
    INDEX `idx_students_class_section` (`tenant_id`, `class_id`, `section_id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `guardians` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT UNSIGNED NOT NULL,
    `student_id` INT UNSIGNED NOT NULL,
    `father_name_en` VARCHAR(150) NOT NULL,
    `father_name_bn` VARCHAR(150) NULL,
    `father_phone` VARCHAR(30) NOT NULL,
    `father_occupation` VARCHAR(100) NULL,
    `father_nid` VARCHAR(50) NULL,
    `mother_name_en` VARCHAR(150) NOT NULL,
    `mother_name_bn` VARCHAR(150) NULL,
    `mother_phone` VARCHAR(30) NULL,
    `emergency_contact` VARCHAR(30) NOT NULL,
    FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON DELETE CASCADE,
    INDEX `idx_guardian_phone` (`tenant_id`, `father_phone`)
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 6. ATTENDANCE SYSTEM & SMS ALERTS
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `student_attendance` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT UNSIGNED NOT NULL,
    `academic_year_id` INT UNSIGNED NOT NULL,
    `class_id` INT UNSIGNED NOT NULL,
    `section_id` INT UNSIGNED NOT NULL,
    `student_id` INT UNSIGNED NOT NULL,
    `date` DATE NOT NULL,
    `status` ENUM('present', 'absent', 'late', 'half_day', 'holiday') NOT NULL DEFAULT 'present',
    `in_time` TIME NULL,
    `remarks` VARCHAR(255) NULL,
    `sms_sent` TINYINT(1) NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON DELETE CASCADE,
    UNIQUE KEY `unique_student_daily_att` (`tenant_id`, `student_id`, `date`),
    INDEX `idx_att_query` (`tenant_id`, `class_id`, `section_id`, `date`, `status`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `staff_attendance` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT UNSIGNED NOT NULL,
    `user_id` INT UNSIGNED NOT NULL,
    `date` DATE NOT NULL,
    `status` ENUM('present', 'absent', 'late', 'leave', 'holiday') NOT NULL DEFAULT 'present',
    `in_time` TIME NULL,
    `out_time` TIME NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    UNIQUE KEY `unique_staff_daily_att` (`tenant_id`, `user_id`, `date`)
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 7. BANGLADESH NCTB EXAM & TABULATION SYSTEM (GPA 5.0)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `grading_systems` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT UNSIGNED NOT NULL,
    `grade_name` VARCHAR(10) NOT NULL, -- A+, A, A-, B, C, D, F
    `min_mark` DECIMAL(5,2) NOT NULL,
    `max_mark` DECIMAL(5,2) NOT NULL,
    `grade_point` DECIMAL(3,2) NOT NULL, -- 5.00, 4.00, 3.50, 3.00, 2.00, 1.00, 0.00
    `remarks` VARCHAR(50) NOT NULL, -- Outstanding, Excellent, Very Good, Good, Pass, Fail
    FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON DELETE CASCADE,
    INDEX `idx_grades_tenant` (`tenant_id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `exam_terms` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT UNSIGNED NOT NULL,
    `academic_year_id` INT UNSIGNED NOT NULL,
    `name` VARCHAR(100) NOT NULL, -- "1st Term Exam", "Half-Yearly Examination", "Annual Examination", "Test Exam"
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,
    `is_published` TINYINT(1) NOT NULL DEFAULT 0,
    FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`academic_year_id`) REFERENCES `academic_years`(`id`) ON DELETE CASCADE,
    INDEX `idx_exam_terms` (`tenant_id`, `academic_year_id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `exam_marks` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT UNSIGNED NOT NULL,
    `exam_term_id` INT UNSIGNED NOT NULL,
    `student_id` INT UNSIGNED NOT NULL,
    `subject_id` INT UNSIGNED NOT NULL,
    `cq_marks` DECIMAL(5,2) DEFAULT 0.00,
    `mcq_marks` DECIMAL(5,2) DEFAULT 0.00,
    `practical_marks` DECIMAL(5,2) DEFAULT 0.00,
    `ca_marks` DECIMAL(5,2) DEFAULT 0.00, -- Continuous Assessment
    `total_obtained` DECIMAL(5,2) NOT NULL DEFAULT 0.00,
    `grade_point` DECIMAL(3,2) NOT NULL DEFAULT 0.00,
    `letter_grade` VARCHAR(10) NOT NULL DEFAULT 'F',
    `is_absent` TINYINT(1) NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`exam_term_id`) REFERENCES `exam_terms`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`subject_id`) REFERENCES `subjects`(`id`) ON DELETE CASCADE,
    UNIQUE KEY `unique_student_subject_mark` (`tenant_id`, `exam_term_id`, `student_id`, `subject_id`),
    INDEX `idx_marks_calc` (`tenant_id`, `exam_term_id`, `student_id`)
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 8. FEES, BILLING & BANGLADESHI PAYMENT GATEWAYS
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `fee_categories` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT UNSIGNED NOT NULL,
    `name` VARCHAR(100) NOT NULL, -- "Monthly Tuition Fee", "Admission Fee", "Exam Fee", "Session Charge"
    `description` VARCHAR(255) NULL,
    `is_recurring` TINYINT(1) NOT NULL DEFAULT 1,
    FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON DELETE CASCADE,
    INDEX `idx_fee_cat_tenant` (`tenant_id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `fee_structures` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT UNSIGNED NOT NULL,
    `academic_year_id` INT UNSIGNED NOT NULL,
    `class_id` INT UNSIGNED NOT NULL,
    `fee_category_id` INT UNSIGNED NOT NULL,
    `amount` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    `due_day` TINYINT UNSIGNED NOT NULL DEFAULT 10,
    FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`academic_year_id`) REFERENCES `academic_years`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`class_id`) REFERENCES `classes`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`fee_category_id`) REFERENCES `fee_categories`(`id`) ON DELETE CASCADE,
    UNIQUE KEY `unique_class_fee` (`tenant_id`, `academic_year_id`, `class_id`, `fee_category_id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `student_invoices` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT UNSIGNED NOT NULL,
    `student_id` INT UNSIGNED NOT NULL,
    `invoice_no` VARCHAR(50) NOT NULL,
    `title` VARCHAR(150) NOT NULL, -- "Tuition Fee - March 2026"
    `month_year` VARCHAR(20) NOT NULL, -- "2026-03"
    `subtotal` DECIMAL(10,2) NOT NULL,
    `discount_amount` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    `fine_amount` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    `total_amount` DECIMAL(10,2) NOT NULL,
    `paid_amount` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    `due_amount` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    `status` ENUM('unpaid', 'partially_paid', 'paid', 'cancelled') DEFAULT 'unpaid',
    `due_date` DATE NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON DELETE CASCADE,
    UNIQUE KEY `unique_invoice_no` (`tenant_id`, `invoice_no`),
    INDEX `idx_invoices_student` (`tenant_id`, `student_id`, `status`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `payment_transactions` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT UNSIGNED NOT NULL,
    `invoice_id` BIGINT UNSIGNED NOT NULL,
    `student_id` INT UNSIGNED NOT NULL,
    `trx_id` VARCHAR(100) NOT NULL,
    `payment_method` ENUM('cash', 'bkash', 'nagad', 'rocket', 'sslcommerz', 'bank_transfer') NOT NULL,
    `amount` DECIMAL(10,2) NOT NULL,
    `payer_phone` VARCHAR(30) NULL,
    `collected_by` INT UNSIGNED NULL, -- user_id of accountant
    `gateway_reference` VARCHAR(255) NULL,
    `status` ENUM('success', 'pending', 'failed', 'refunded') DEFAULT 'success',
    `paid_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`invoice_id`) REFERENCES `student_invoices`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`collected_by`) REFERENCES `users`(`id`) ON DELETE SET NULL,
    INDEX `idx_trx_query` (`tenant_id`, `invoice_id`, `trx_id`)
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 9. NOTICES, SMS PORTAL, ACCOUNTS & PAYROLL
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `notices` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT UNSIGNED NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `target_role` ENUM('all', 'teachers', 'students', 'parents') DEFAULT 'all',
    `attachment_url` VARCHAR(500) NULL,
    `is_published` TINYINT(1) NOT NULL DEFAULT 1,
    `created_by` INT UNSIGNED NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON DELETE CASCADE,
    INDEX `idx_notice_tenant` (`tenant_id`, `is_published`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `sms_logs` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT UNSIGNED NOT NULL,
    `recipient_phone` VARCHAR(30) NOT NULL,
    `recipient_type` ENUM('student', 'parent', 'teacher', 'staff', 'custom') DEFAULT 'parent',
    `message` TEXT NOT NULL,
    `sms_count` TINYINT UNSIGNED NOT NULL DEFAULT 1,
    `gateway` VARCHAR(50) NOT NULL DEFAULT 'GreenwebBD',
    `gateway_trx_id` VARCHAR(100) NULL,
    `status` ENUM('sent', 'failed', 'queued') DEFAULT 'sent',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON DELETE CASCADE,
    INDEX `idx_sms_tenant` (`tenant_id`, `created_at`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `accounting_transactions` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT UNSIGNED NOT NULL,
    `type` ENUM('income', 'expense') NOT NULL,
    `category` VARCHAR(100) NOT NULL, -- e.g. "Fee Collection", "Teacher Salary", "Electricity Bill", "Lab Equipment"
    `amount` DECIMAL(10,2) NOT NULL,
    `date` DATE NOT NULL,
    `payment_method` VARCHAR(50) DEFAULT 'Cash',
    `voucher_no` VARCHAR(50) NULL,
    `description` TEXT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON DELETE CASCADE,
    INDEX `idx_acc_tenant` (`tenant_id`, `type`, `date`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `payroll_slips` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT UNSIGNED NOT NULL,
    `user_id` INT UNSIGNED NOT NULL, -- Teacher or staff
    `month_year` VARCHAR(20) NOT NULL, -- "2026-03"
    `basic_salary` DECIMAL(10,2) NOT NULL,
    `house_rent` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    `medical_allowance` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    `conveyance` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    `bonus` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    `deductions` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    `net_payable` DECIMAL(10,2) NOT NULL,
    `payment_status` ENUM('unpaid', 'paid') DEFAULT 'paid',
    `payment_method` VARCHAR(50) DEFAULT 'Bank Transfer',
    `paid_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    UNIQUE KEY `unique_staff_payroll` (`tenant_id`, `user_id`, `month_year`)
) ENGINE=InnoDB;
