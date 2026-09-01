-- ============================================================================
-- SQL IMPORT FILE FOR PHPMYADMIN (InfinityFree / cPanel)
-- Database: if0_42784359_myscmanagement
-- Target Site: maneschool.site.je
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. SUBSCRIPTION PLANS
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 2. TENANTS (Schools / Colleges)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `tenants` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `uuid` CHAR(36) NOT NULL UNIQUE,
    `name` VARCHAR(255) NOT NULL,
    `short_name` VARCHAR(50) NULL,
    `eiin_number` VARCHAR(30) NULL,
    `board_name` VARCHAR(50) DEFAULT 'Dhaka',
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
    INDEX `idx_tenant_subdomain` (`subdomain`),
    INDEX `idx_tenant_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 3. USERS & RBAC
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT UNSIGNED NULL,
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
    INDEX `idx_users_role` (`tenant_id`, `role`),
    INDEX `idx_users_phone` (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 4. ACADEMIC SESSIONS, SHIFTS, CLASSES, SECTIONS, SUBJECTS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `academic_years` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT UNSIGNED NOT NULL,
    `year` VARCHAR(20) NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `is_current` TINYINT(1) NOT NULL DEFAULT 0,
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_academic_year_tenant` (`tenant_id`, `is_current`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `shifts` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT UNSIGNED NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `start_time` TIME NOT NULL,
    `end_time` TIME NOT NULL,
    INDEX `idx_shifts_tenant` (`tenant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `classes` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT UNSIGNED NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `numeric_value` TINYINT UNSIGNED NOT NULL,
    `has_groups` TINYINT(1) NOT NULL DEFAULT 0,
    INDEX `idx_classes_tenant` (`tenant_id`, `numeric_value`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `sections` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT UNSIGNED NOT NULL,
    `class_id` INT UNSIGNED NOT NULL,
    `shift_id` INT UNSIGNED NULL,
    `name` VARCHAR(50) NOT NULL,
    `capacity` INT UNSIGNED NOT NULL DEFAULT 60,
    `room_no` VARCHAR(30) NULL,
    INDEX `idx_sections_tenant_class` (`tenant_id`, `class_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `subjects` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT UNSIGNED NOT NULL,
    `class_id` INT UNSIGNED NOT NULL,
    `group_name` ENUM('all', 'science', 'humanities', 'business_studies') DEFAULT 'all',
    `name` VARCHAR(100) NOT NULL,
    `code` VARCHAR(20) NOT NULL,
    `type` ENUM('compulsory', 'optional', 'elective_4th') DEFAULT 'compulsory',
    `full_marks` DECIMAL(5,2) NOT NULL DEFAULT 100.00,
    `pass_marks` DECIMAL(5,2) NOT NULL DEFAULT 33.00,
    `cq_marks` DECIMAL(5,2) DEFAULT 70.00,
    `mcq_marks` DECIMAL(5,2) DEFAULT 30.00,
    `practical_marks` DECIMAL(5,2) DEFAULT 0.00,
    INDEX `idx_subjects_tenant_class` (`tenant_id`, `class_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 5. TEACHERS & CLASS ROUTINES
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `teachers` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT UNSIGNED NOT NULL,
    `user_id` INT UNSIGNED NOT NULL,
    `employee_id` VARCHAR(50) NOT NULL,
    `designation` VARCHAR(100) NOT NULL,
    `department` VARCHAR(100) NULL,
    `qualification` VARCHAR(255) NULL,
    `joining_date` DATE NULL,
    `salary_basic` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    `emergency_contact` VARCHAR(30) NULL,
    `nid_no` VARCHAR(50) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
    INDEX `idx_routine_schedule` (`tenant_id`, `class_id`, `section_id`, `day_of_week`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 6. STUDENTS & GUARDIANS
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
    INDEX `idx_students_class_section` (`tenant_id`, `class_id`, `section_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
    INDEX `idx_guardian_phone` (`tenant_id`, `father_phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 7. ATTENDANCE & SMS LOGS
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
    INDEX `idx_att_query` (`tenant_id`, `class_id`, `section_id`, `date`, `status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 8. EXAM TERMS & MARKS (NCTB GPA 5.0)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `exam_terms` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT UNSIGNED NOT NULL,
    `academic_year_id` INT UNSIGNED NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,
    `is_published` TINYINT(1) NOT NULL DEFAULT 0,
    INDEX `idx_exam_terms` (`tenant_id`, `academic_year_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `exam_marks` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT UNSIGNED NOT NULL,
    `exam_term_id` INT UNSIGNED NOT NULL,
    `student_id` INT UNSIGNED NOT NULL,
    `subject_id` INT UNSIGNED NOT NULL,
    `cq_marks` DECIMAL(5,2) DEFAULT 0.00,
    `mcq_marks` DECIMAL(5,2) DEFAULT 0.00,
    `practical_marks` DECIMAL(5,2) DEFAULT 0.00,
    `ca_marks` DECIMAL(5,2) DEFAULT 0.00,
    `total_obtained` DECIMAL(5,2) NOT NULL DEFAULT 0.00,
    `grade_point` DECIMAL(3,2) NOT NULL DEFAULT 0.00,
    `letter_grade` VARCHAR(10) NOT NULL DEFAULT 'F',
    `is_absent` TINYINT(1) NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_marks_calc` (`tenant_id`, `exam_term_id`, `student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 9. FEES, INVOICES & TRANSACTIONS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `fee_categories` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT UNSIGNED NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `description` VARCHAR(255) NULL,
    `is_recurring` TINYINT(1) NOT NULL DEFAULT 1,
    INDEX `idx_fee_cat_tenant` (`tenant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `student_invoices` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT UNSIGNED NOT NULL,
    `student_id` INT UNSIGNED NOT NULL,
    `invoice_no` VARCHAR(50) NOT NULL,
    `title` VARCHAR(150) NOT NULL,
    `month_year` VARCHAR(20) NOT NULL,
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
    INDEX `idx_invoices_student` (`tenant_id`, `student_id`, `status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `payment_transactions` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT UNSIGNED NOT NULL,
    `invoice_id` BIGINT UNSIGNED NOT NULL,
    `student_id` INT UNSIGNED NOT NULL,
    `trx_id` VARCHAR(100) NOT NULL,
    `payment_method` ENUM('cash', 'bkash', 'nagad', 'rocket', 'sslcommerz', 'bank_transfer') NOT NULL,
    `amount` DECIMAL(10,2) NOT NULL,
    `payer_phone` VARCHAR(30) NULL,
    `collected_by` INT UNSIGNED NULL,
    `gateway_reference` VARCHAR(255) NULL,
    `status` ENUM('success', 'pending', 'failed', 'refunded') DEFAULT 'success',
    `paid_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `notices` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT UNSIGNED NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `target_role` ENUM('all', 'teachers', 'students', 'parents') DEFAULT 'all',
    `is_published` TINYINT(1) NOT NULL DEFAULT 1,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `payroll_slips` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `tenant_id` INT UNSIGNED NOT NULL,
    `user_id` INT UNSIGNED NOT NULL,
    `month_year` VARCHAR(20) NOT NULL,
    `basic_salary` DECIMAL(10,2) NOT NULL,
    `house_rent` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    `medical_allowance` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    `conveyance` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    `bonus` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    `deductions` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    `net_payable` DECIMAL(10,2) NOT NULL,
    `payment_status` ENUM('unpaid', 'paid') DEFAULT 'paid',
    `payment_method` VARCHAR(50) DEFAULT 'Bank Transfer',
    `paid_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- INITIAL SEED DATA INSERTION
-- ============================================================================

INSERT INTO `subscription_plans` (`id`, `name`, `slug`, `max_students`, `max_teachers`, `price_monthly`, `price_yearly`, `is_active`) VALUES
(1, 'Basic School (Primary)', 'basic', 500, 25, 2500.00, 25000.00, 1),
(2, 'Standard High School', 'standard', 1500, 60, 5000.00, 50000.00, 1),
(3, 'Enterprise College / Model School', 'enterprise', 5000, 200, 10000.00, 100000.00, 1)
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`);

INSERT INTO `tenants` (`id`, `uuid`, `name`, `short_name`, `eiin_number`, `board_name`, `subdomain`, `custom_domain`, `logo_url`, `theme_color`, `email`, `phone`, `address`, `status`, `subscription_plan_id`, `sms_balance`) VALUES
(1, '0190a42f-871d-7201-987a-351df986aa01', 'Dhaka Residential Model College', 'DRMC', '107985', 'Dhaka', 'drmc', 'maneschool.site.je', 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=120&auto=format&fit=crop&q=80', '#059669', 'info@drmc.edu.bd', '+8801711000001', 'Mirpur Road, Mohammadpur, Dhaka-1207', 'active', 3, 4500),
(2, '0190a42f-871d-7201-987a-351df986aa02', 'Ideal School and College', 'ISC', '108277', 'Dhaka', 'idealschool', 'idealschool.edu.bd', 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=120&auto=format&fit=crop&q=80', '#2563eb', 'contact@idealschool.edu.bd', '+8801811000002', 'Motijheel, Dhaka-1000', 'active', 3, 3200)
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`);

INSERT INTO `users` (`id`, `tenant_id`, `name`, `email`, `phone`, `password_hash`, `role`, `status`) VALUES
(1, NULL, 'Super Administrator (BD SaaS)', 'superadmin@edumanage.bd', '+8801700000000', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'super_admin', 'active'),
(2, 1, 'Prof. Kazi Faruq Ahmed (Principal)', 'principal@drmc.edu.bd', '+8801711111111', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'school_admin', 'active')
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`);

INSERT INTO `academic_years` (`id`, `tenant_id`, `year`, `title`, `is_current`, `start_date`, `end_date`) VALUES
(1, 1, '2026', 'Academic Session 2026', 1, '2026-01-01', '2026-12-31')
ON DUPLICATE KEY UPDATE `year`=VALUES(`year`);

INSERT INTO `classes` (`id`, `tenant_id`, `name`, `numeric_value`, `has_groups`) VALUES
(1, 1, 'Class 6 (Six)', 6, 0),
(2, 1, 'Class 7 (Seven)', 7, 0),
(3, 1, 'Class 8 (Eight)', 8, 0),
(4, 1, 'Class 9 (Nine)', 9, 1),
(5, 1, 'Class 10 (Ten - SSC)', 10, 1),
(6, 1, 'Class 11 (HSC 1st)', 11, 1)
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`);
