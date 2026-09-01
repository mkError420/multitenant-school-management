-- ============================================================================
-- SEEDER DATA: Multi-Tenant Bangladeshi School & College Management System
-- Realistic Demo Data for Bangladesh Institutions
-- ============================================================================

USE `school_saas_bd`;

-- 1. SUBSCRIPTION PLANS
INSERT INTO `subscription_plans` (`id`, `name`, `slug`, `max_students`, `max_teachers`, `features_json`, `price_monthly`, `price_yearly`, `is_active`) VALUES
(1, 'Basic School (Primary)', 'basic', 500, 25, '{"sms_gateway":true,"id_card_generator":true,"attendance":true,"fees":true,"result_gpa":true,"payroll":false,"custom_domain":false}', 2500.00, 25000.00, 1),
(2, 'Standard High School', 'standard', 1500, 60, '{"sms_gateway":true,"id_card_generator":true,"attendance":true,"fees":true,"result_gpa":true,"payroll":true,"custom_domain":true,"admit_cards":true}', 5000.00, 50000.00, 1),
(3, 'Enterprise College / Model School', 'enterprise', 5000, 200, '{"sms_gateway":true,"id_card_generator":true,"attendance":true,"fees":true,"result_gpa":true,"payroll":true,"custom_domain":true,"admit_cards":true,"accounting":true,"biometric_sync":true}', 10000.00, 100000.00, 1)
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`);

-- 2. TENANTS (Bangladeshi Schools & Colleges)
INSERT INTO `tenants` (`id`, `uuid`, `name`, `short_name`, `eiin_number`, `board_name`, `subdomain`, `custom_domain`, `logo_url`, `theme_color`, `email`, `phone`, `address`, `status`, `subscription_plan_id`, `subscription_expires_at`, `sms_balance`) VALUES
(1, '0190a42f-871d-7201-987a-351df986aa01', 'Dhaka Residential Model College', 'DRMC', '107985', 'Dhaka', 'drmc', 'drmc.edu.bd', 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=120&auto=format&fit=crop&q=80', '#059669', 'info@drmc.edu.bd', '+8801711000001', 'Mirpur Road, Mohammadpur, Dhaka-1207', 'active', 3, '2027-12-31', 4500),
(2, '0190a42f-871d-7201-987a-351df986aa02', 'Ideal School and College', 'ISC', '108277', 'Dhaka', 'idealschool', 'idealschool.edu.bd', 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=120&auto=format&fit=crop&q=80', '#2563eb', 'contact@idealschool.edu.bd', '+8801811000002', 'Motijheel, Dhaka-1000', 'active', 3, '2027-12-31', 3200),
(3, 'Chittagong Collegiate School', 'CCS', '104044', 'Chittagong', 'collegiate', NULL, 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=120&auto=format&fit=crop&q=80', '#7c3aed', 'info@ccs.edu.bd', '+8801911000003', 'Ice Factory Road, Chittagong', 'active', 2, '2027-06-30', 1200)
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`);

-- 3. USERS (Super Admin, School Admins, Teachers, Students, Accountants)
-- Password for all demo accounts: 'password123' (bcrypt hash)
-- Hash: $2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi
INSERT INTO `users` (`id`, `tenant_id`, `name`, `email`, `phone`, `password_hash`, `role`, `status`) VALUES
-- Super Admin (Platform Owner)
(1, NULL, 'Super Administrator (BD SaaS)', 'superadmin@edumanage.bd', '+8801700000000', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'superadmin', 'active'),

-- Tenant 1 (DRMC) Users
(2, 1, 'Prof. Kazi Faruq Ahmed (Principal)', 'principal@drmc.edu.bd', '+8801711111111', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'school_admin', 'active'),
(3, 1, 'Mohammad Rafiqul Islam (Senior Math Teacher)', 'rafiq.math@drmc.edu.bd', '+8801711222222', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'teacher', 'active'),
(4, 1, 'Nusrat Jahan (English Lecturer)', 'nusrat.eng@drmc.edu.bd', '+8801711333333', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'teacher', 'active'),
(5, 1, 'Md. Shahinur Rahman (Accountant)', 'accounts@drmc.edu.bd', '+8801711444444', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'accountant', 'active'),
(6, 1, 'Tanvir Hasan (Student)', 'tanvir.student@drmc.edu.bd', '+8801711555555', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'student', 'active'),

-- Tenant 2 (Ideal School) Admin
(7, 2, 'Dr. Shahan Ara Begum (Principal)', 'principal@idealschool.edu.bd', '+8801811111111', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'school_admin', 'active')
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`);

-- 4. ACADEMIC YEARS & SHIFTS FOR TENANT 1
INSERT INTO `academic_years` (`id`, `tenant_id`, `year`, `title`, `is_current`, `start_date`, `end_date`) VALUES
(1, 1, '2026', 'Academic Session 2026', 1, '2026-01-01', '2026-12-31'),
(2, 1, '2025', 'Academic Session 2025', 0, '2025-01-01', '2025-12-31'),
(3, 2, '2026', 'Academic Session 2026', 1, '2026-01-01', '2026-12-31')
ON DUPLICATE KEY UPDATE `year`=VALUES(`year`);

INSERT INTO `shifts` (`id`, `tenant_id`, `name`, `start_time`, `end_time`) VALUES
(1, 1, 'Morning Shift', '07:30:00', '12:00:00'),
(2, 1, 'Day Shift', '12:30:00', '17:30:00'),
(3, 2, 'Morning Shift', '07:15:00', '11:45:00'),
(4, 2, 'Day Shift', '12:00:00', '17:00:00')
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`);

-- 5. CLASSES & SECTIONS (Tenant 1)
INSERT INTO `classes` (`id`, `tenant_id`, `name`, `numeric_value`, `has_groups`) VALUES
(1, 1, 'Class 6 (Six)', 6, 0),
(2, 1, 'Class 7 (Seven)', 7, 0),
(3, 1, 'Class 8 (Eight)', 8, 0),
(4, 1, 'Class 9 (Nine - SSC)', 9, 1),
(5, 1, 'Class 10 (Ten - SSC Candidate)', 10, 1),
(6, 1, 'Class 11 (HSC 1st Year)', 11, 1),
(7, 1, 'Class 12 (HSC 2nd Year)', 12, 1)
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`);

INSERT INTO `sections` (`id`, `tenant_id`, `class_id`, `shift_id`, `name`, `capacity`, `room_no`) VALUES
(1, 1, 5, 1, 'Padma (Morning)', 60, 'Room 301'),
(2, 1, 5, 2, 'Meghna (Day)', 60, 'Room 302'),
(3, 1, 5, 1, 'Jamuna (Science)', 55, 'Room 303'),
(4, 1, 4, 1, 'Surma', 60, 'Room 201'),
(5, 1, 1, 1, 'Karnafuli', 60, 'Room 101')
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`);

-- 6. SUBJECTS (NCTB Curriculum)
INSERT INTO `subjects` (`id`, `tenant_id`, `class_id`, `group_name`, `name`, `code`, `type`, `full_marks`, `pass_marks`, `cq_marks`, `mcq_marks`, `practical_marks`) VALUES
(1, 1, 5, 'all', 'Bangla 1st Paper', '101', 'compulsory', 100.00, 33.00, 70.00, 30.00, 0.00),
(2, 1, 5, 'all', 'Bangla 2nd Paper', '102', 'compulsory', 100.00, 33.00, 70.00, 30.00, 0.00),
(3, 1, 5, 'all', 'English 1st Paper', '107', 'compulsory', 100.00, 33.00, 100.00, 0.00, 0.00),
(4, 1, 5, 'all', 'English 2nd Paper', '108', 'compulsory', 100.00, 33.00, 100.00, 0.00, 0.00),
(5, 1, 5, 'all', 'General Mathematics', '109', 'compulsory', 100.00, 33.00, 70.00, 30.00, 0.00),
(6, 1, 5, 'science', 'Physics', '136', 'compulsory', 100.00, 33.00, 50.00, 25.00, 25.00),
(7, 1, 5, 'science', 'Chemistry', '137', 'compulsory', 100.00, 33.00, 50.00, 25.00, 25.00),
(8, 1, 5, 'science', 'Biology', '138', 'compulsory', 100.00, 33.00, 50.00, 25.00, 25.00),
(9, 1, 5, 'science', 'Higher Mathematics (4th Sub)', '126', 'elective_4th', 100.00, 33.00, 50.00, 25.00, 25.00),
(10, 1, 5, 'all', 'Information & Communication Tech (ICT)', '154', 'compulsory', 50.00, 17.00, 0.00, 25.00, 25.00)
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`);

-- 7. TEACHERS (Tenant 1)
INSERT INTO `teachers` (`id`, `tenant_id`, `user_id`, `employee_id`, `designation`, `department`, `qualification`, `joining_date`, `salary_basic`, `emergency_contact`, `nid_no`) VALUES
(1, 1, 2, 'EMP-1001', 'Principal', 'Administration', 'M.Sc (Physics), B.Ed', '2015-01-10', 85000.00, '+8801711111111', '19752692518000123'),
(2, 1, 3, 'EMP-1002', 'Senior Teacher', 'Mathematics', 'M.Sc in Applied Mathematics (DU)', '2018-03-15', 52000.00, '+8801711222222', '19822692518000456'),
(3, 1, 4, 'EMP-1003', 'Lecturer', 'English', 'M.A in English Literature (JU)', '2020-07-01', 48000.00, '+8801711333333', '19882692518000789')
ON DUPLICATE KEY UPDATE `employee_id`=VALUES(`employee_id`);

-- 8. STUDENTS & GUARDIANS (Tenant 1)
INSERT INTO `students` (`id`, `tenant_id`, `user_id`, `admission_no`, `roll_no`, `academic_year_id`, `class_id`, `section_id`, `shift_id`, `group_name`, `fourth_subject_id`, `name_en`, `name_bn`, `dob`, `gender`, `blood_group`, `religion`, `birth_certificate_no`, `present_address`, `photo_url`, `status`, `admission_date`) VALUES
(1, 1, 6, 'ADM-2026-1001', 1, 1, 5, 1, 1, 'science', 9, 'Tanvir Hasan', 'তানভীর হাসান', '2010-05-14', 'male', 'O+', 'Islam', '20102692518001001', 'House 24, Road 5, Dhanmondi, Dhaka', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', 'active', '2024-01-05'),
(2, 1, NULL, 'ADM-2026-1002', 2, 1, 5, 1, 1, 'science', 9, 'Sadia Afrin', 'সাদিয়া আফরিন', '2010-08-20', 'female', 'A+', 'Islam', '20102692518001002', 'Flat B-3, Green Road, Dhaka', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', 'active', '2024-01-05'),
(3, 1, NULL, 'ADM-2026-1003', 3, 1, 5, 1, 1, 'science', 9, 'Arafat Rahman', 'আরাফাত রহমান', '2010-02-11', 'male', 'B+', 'Islam', '20102692518001003', 'Sector 4, Uttara, Dhaka', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', 'active', '2024-01-05'),
(4, 1, NULL, 'ADM-2026-1004', 4, 1, 5, 1, 1, 'science', 9, 'Farzana Akter', 'ফারজানা আক্তার', '2010-11-03', 'female', 'AB+', 'Islam', '20102692518001004', 'Lalmatia Block D, Dhaka', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80', 'active', '2024-01-05'),
(5, 1, NULL, 'ADM-2026-1005', 5, 1, 5, 1, 1, 'science', 9, 'Mahir Faisal', 'মাহির ফয়সাল', '2010-09-17', 'male', 'O+', 'Islam', '20102692518001005', 'Mirpur-10, Dhaka', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', 'active', '2024-01-05')
ON DUPLICATE KEY UPDATE `admission_no`=VALUES(`admission_no`);

INSERT INTO `guardians` (`id`, `tenant_id`, `student_id`, `father_name_en`, `father_name_bn`, `father_phone`, `father_occupation`, `father_nid`, `mother_name_en`, `emergency_contact`) VALUES
(1, 1, 1, 'Md. Kamrul Hasan', 'মো: কামরুল হাসান', '+8801711888001', 'Govt. Officer', '19782692518000999', 'Nasrin Akter', '+8801711888001'),
(2, 1, 2, 'Engr. Mahbubur Rahman', 'প্রকৌ: মাহবুবুর রহমান', '+8801711888002', 'Software Engineer', '19802692518000888', 'Farida Yasmin', '+8801711888002'),
(3, 1, 3, 'Dr. Aminul Islam', 'ডা: আমিনুল ইসলাম', '+8801711888003', 'Physician', '19762692518000777', 'Rokeya Begum', '+8801711888003'),
(4, 1, 4, 'Jahangir Alam', 'জাহাঙ্গীর আলম', '+8801711888004', 'Businessman', '19792692518000666', 'Salma Khatun', '+8801711888004'),
(5, 1, 5, 'Abdur Razzaq', 'আব্দুর রাজ্জাক', '+8801711888005', 'Banker', '19822692518000555', 'Tahmina Begum', '+8801711888005')
ON DUPLICATE KEY UPDATE `father_phone`=VALUES(`father_phone`);

-- 9. BANGLADESH NCTB GRADING SCALE (GPA 5.0)
INSERT INTO `grading_systems` (`id`, `tenant_id`, `grade_name`, `min_mark`, `max_mark`, `grade_point`, `remarks`) VALUES
(1, 1, 'A+', 80.00, 100.00, 5.00, 'Outstanding / Excellent'),
(2, 1, 'A',  70.00, 79.99,  4.00, 'Very Good'),
(3, 1, 'A-', 60.00, 69.99,  3.50, 'Good'),
(4, 1, 'B',  50.00, 59.99,  3.00, 'Satisfactory'),
(5, 1, 'C',  40.00, 49.99,  2.00, 'Acceptable'),
(6, 1, 'D',  33.00, 39.99,  1.00, 'Passing / Minimum Pass'),
(7, 1, 'F',  0.00,  32.99,  0.00, 'Failed')
ON DUPLICATE KEY UPDATE `grade_name`=VALUES(`grade_name`);

-- 10. EXAM TERMS & MARKS
INSERT INTO `exam_terms` (`id`, `tenant_id`, `academic_year_id`, `name`, `start_date`, `end_date`, `is_published`) VALUES
(1, 1, 1, 'Half-Yearly Examination 2026', '2026-06-10', '2026-06-25', 1),
(2, 1, 1, 'Annual Examination 2026', '2026-11-15', '2026-11-30', 0)
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`);

INSERT INTO `exam_marks` (`tenant_id`, `exam_term_id`, `student_id`, `subject_id`, `cq_marks`, `mcq_marks`, `practical_marks`, `ca_marks`, `total_obtained`, `grade_point`, `letter_grade`, `is_absent`) VALUES
-- Tanvir Hasan (Roll 1) Marks
(1, 1, 1, 1, 62.00, 26.00, 0.00, 0.00, 88.00, 5.00, 'A+', 0),
(1, 1, 1, 3, 85.00, 0.00,  0.00, 0.00, 85.00, 5.00, 'A+', 0),
(1, 1, 1, 5, 65.00, 27.00, 0.00, 0.00, 92.00, 5.00, 'A+', 0),
(1, 1, 1, 6, 45.00, 22.00, 24.00, 0.00, 91.00, 5.00, 'A+', 0),
(1, 1, 1, 7, 42.00, 21.00, 23.00, 0.00, 86.00, 5.00, 'A+', 0),
(1, 1, 1, 9, 44.00, 23.00, 25.00, 0.00, 92.00, 5.00, 'A+', 0), -- 4th Subject (GPA 5.0 => (5.0 - 2.0) = 3.0 bonus points)

-- Sadia Afrin (Roll 2) Marks
(1, 1, 2, 1, 58.00, 24.00, 0.00, 0.00, 82.00, 5.00, 'A+', 0),
(1, 1, 2, 3, 76.00, 0.00,  0.00, 0.00, 76.00, 4.00, 'A',  0),
(1, 1, 2, 5, 55.00, 23.00, 0.00, 0.00, 78.00, 4.00, 'A',  0),
(1, 1, 2, 6, 38.00, 19.00, 22.00, 0.00, 79.00, 4.00, 'A',  0),
(1, 1, 2, 7, 40.00, 20.00, 24.00, 0.00, 84.00, 5.00, 'A+', 0),
(1, 1, 2, 9, 42.00, 22.00, 24.00, 0.00, 88.00, 5.00, 'A+', 0)
ON DUPLICATE KEY UPDATE `total_obtained`=VALUES(`total_obtained`);

-- 11. FEE CATEGORIES & STRUCTURES
INSERT INTO `fee_categories` (`id`, `tenant_id`, `name`, `description`, `is_recurring`) VALUES
(1, 1, 'Monthly Tuition Fee', 'Regular academic monthly tuition charge', 1),
(2, 1, 'Session Development Charge', 'Annual session admission & maintenance charge', 0),
(3, 1, 'Half-Yearly Exam Fee', 'Examination fee for question papers & answer booklets', 0),
(4, 1, 'Science Lab & ICT Fee', 'Practical laboratory maintenance', 1)
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`);

INSERT INTO `fee_structures` (`id`, `tenant_id`, `academic_year_id`, `class_id`, `fee_category_id`, `amount`, `due_day`) VALUES
(1, 1, 1, 5, 1, 2500.00, 10),
(2, 1, 1, 5, 2, 8000.00, 15),
(3, 1, 1, 5, 3, 1500.00, 10),
(4, 1, 1, 5, 4, 600.00,  10)
ON DUPLICATE KEY UPDATE `amount`=VALUES(`amount`);

-- 12. STUDENT INVOICES & TRANSACTIONS
INSERT INTO `student_invoices` (`id`, `tenant_id`, `student_id`, `invoice_no`, `title`, `month_year`, `subtotal`, `discount_amount`, `fine_amount`, `total_amount`, `paid_amount`, `due_amount`, `status`, `due_date`) VALUES
(1, 1, 1, 'INV-2026-03-1001', 'Tuition & Lab Fee - March 2026', '2026-03', 3100.00, 0.00, 0.00, 3100.00, 3100.00, 0.00, 'paid', '2026-03-10'),
(2, 1, 2, 'INV-2026-03-1002', 'Tuition & Lab Fee - March 2026', '2026-03', 3100.00, 500.00, 0.00, 2600.00, 2600.00, 0.00, 'paid', '2026-03-10'),
(3, 1, 3, 'INV-2026-03-1003', 'Tuition & Lab Fee - March 2026', '2026-03', 3100.00, 0.00, 0.00, 3100.00, 0.00, 3100.00, 'unpaid', '2026-03-10'),
(4, 1, 4, 'INV-2026-03-1004', 'Tuition & Lab Fee - March 2026', '2026-03', 3100.00, 0.00, 100.00, 3200.00, 1500.00, 1700.00, 'partially_paid', '2026-03-10')
ON DUPLICATE KEY UPDATE `invoice_no`=VALUES(`invoice_no`);

INSERT INTO `payment_transactions` (`id`, `tenant_id`, `invoice_id`, `student_id`, `trx_id`, `payment_method`, `amount`, `payer_phone`, `collected_by`, `status`) VALUES
(1, 1, 1, 1, 'BKASH9A87X21', 'bkash', 3100.00, '+8801711888001', NULL, 'success'),
(2, 1, 2, 2, 'CASH-REC-502', 'cash', 2600.00, '+8801711888002', 5, 'success'),
(3, 1, 4, 4, 'NAGAD88B129', 'nagad', 1500.00, '+8801711888004', NULL, 'success')
ON DUPLICATE KEY UPDATE `trx_id`=VALUES(`trx_id`);

-- 13. NOTICES & SMS LOGS
INSERT INTO `notices` (`id`, `tenant_id`, `title`, `content`, `target_role`, `is_published`, `created_by`) VALUES
(1, 1, 'Half-Yearly Examination 2026 Routine Published', 'The upcoming Half-Yearly Examination will commence from 10th June 2026. All students are requested to collect their Admit Cards from the accounts office after clearing tuition dues.', 'all', 1, 2),
(2, 1, 'Shaheed Dibash & International Mother Language Day Celebration', 'Special cultural program and discussion meeting will be held at college auditorium at 9:00 AM on 21st February.', 'all', 1, 2)
ON DUPLICATE KEY UPDATE `title`=VALUES(`title`);

INSERT INTO `sms_logs` (`id`, `tenant_id`, `recipient_phone`, `recipient_type`, `message`, `sms_count`, `gateway`, `status`) VALUES
(1, 1, '+8801711888003', 'parent', 'শ্রদ্ধেয় অভিভাবক, আপনার সন্তান আরাফাত রহমান (রোল ৩) আজ বিদ্যালয়ে অনুপস্থিত। - ডিআরএমসি', 1, 'GreenwebBD', 'sent'),
(2, 1, '+8801711888001', 'parent', 'Dear Guardian, Payment of BDT 3100.00 for Tanvir Hasan (Roll 1) received successfully via bKash. TrxID: BKASH9A87X21. - DRMC', 1, 'bKash-Webhook', 'sent')
ON DUPLICATE KEY UPDATE `recipient_phone`=VALUES(`recipient_phone`);
