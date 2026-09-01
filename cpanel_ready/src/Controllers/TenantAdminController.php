<?php

namespace EduManage\Controllers;

use EduManage\Core\Request;
use EduManage\Core\Response;
use EduManage\Core\TenantManager;

class TenantAdminController {
    public function getDashboardStats(Request $request): void {
        $tenant = TenantManager::getCurrentTenant();
        
        $stats = [
            'institution' => $tenant,
            'summary' => [
                'total_students' => 1250,
                'total_teachers' => 45,
                'total_staff' => 14,
                'attendance_today_rate' => 94.8, // 94.8%
                'present_students_today' => 1185,
                'absent_students_today' => 65,
                'total_fee_collected_month' => 485000.00,
                'total_fee_due_month' => 65000.00,
                'sms_balance' => $tenant['sms_balance'] ?? 4500
            ],
            'recent_admissions' => [
                ['id' => 1, 'name' => 'Tanvir Hasan', 'roll' => 1, 'class' => 'Class 10 (SSC)', 'section' => 'Padma', 'phone' => '+8801711888001', 'date' => '2026-01-05'],
                ['id' => 2, 'name' => 'Sadia Afrin', 'roll' => 2, 'class' => 'Class 10 (SSC)', 'section' => 'Padma', 'phone' => '+8801711888002', 'date' => '2026-01-05'],
                ['id' => 3, 'name' => 'Arafat Rahman', 'roll' => 3, 'class' => 'Class 10 (SSC)', 'section' => 'Padma', 'phone' => '+8801711888003', 'date' => '2026-01-05'],
                ['id' => 4, 'name' => 'Farzana Akter', 'roll' => 4, 'class' => 'Class 10 (SSC)', 'section' => 'Padma', 'phone' => '+8801711888004', 'date' => '2026-01-05']
            ],
            'class_distribution' => [
                ['class_name' => 'Class 6', 'boys' => 120, 'girls' => 110, 'total' => 230],
                ['class_name' => 'Class 7', 'boys' => 105, 'girls' => 95, 'total' => 200],
                ['class_name' => 'Class 8', 'boys' => 115, 'girls' => 105, 'total' => 220],
                ['class_name' => 'Class 9', 'boys' => 130, 'girls' => 120, 'total' => 250],
                ['class_name' => 'Class 10', 'boys' => 140, 'girls' => 130, 'total' => 270],
                ['class_name' => 'Class 11 (HSC)', 'boys' => 45, 'girls' => 35, 'total' => 80]
            ],
            'fee_collection_trend' => [
                ['month' => 'Jan', 'collected' => 420000, 'due' => 30000],
                ['month' => 'Feb', 'collected' => 460000, 'due' => 45000],
                ['month' => 'Mar', 'collected' => 485000, 'due' => 65000]
            ]
        ];

        Response::success($stats, 'Tenant dashboard overview stats');
    }

    public function getAcademicConfig(Request $request): void {
        $data = [
            'sessions' => [
                ['id' => 1, 'year' => '2026', 'title' => 'Academic Session 2026', 'is_current' => true],
                ['id' => 2, 'year' => '2025', 'title' => 'Academic Session 2025', 'is_current' => false]
            ],
            'shifts' => [
                ['id' => 1, 'name' => 'Morning Shift (প্রভাতি শাখা)', 'start_time' => '07:30 AM', 'end_time' => '12:00 PM'],
                ['id' => 2, 'name' => 'Day Shift (দিবা শাখা)', 'start_time' => '12:30 PM', 'end_time' => '05:30 PM']
            ],
            'classes' => [
                ['id' => 1, 'name' => 'Class 6 (Six)', 'numeric_value' => 6, 'has_groups' => false],
                ['id' => 2, 'name' => 'Class 7 (Seven)', 'numeric_value' => 7, 'has_groups' => false],
                ['id' => 3, 'name' => 'Class 8 (Eight - JSC)', 'numeric_value' => 8, 'has_groups' => false],
                ['id' => 4, 'name' => 'Class 9 (Nine - SSC)', 'numeric_value' => 9, 'has_groups' => true],
                ['id' => 5, 'name' => 'Class 10 (Ten - SSC Candidate)', 'numeric_value' => 10, 'has_groups' => true],
                ['id' => 6, 'name' => 'Class 11 (HSC 1st Year)', 'numeric_value' => 11, 'has_groups' => true],
                ['id' => 7, 'name' => 'Class 12 (HSC 2nd Year)', 'numeric_value' => 12, 'has_groups' => true]
            ],
            'sections' => [
                ['id' => 1, 'class_id' => 5, 'name' => 'Padma (Morning)', 'shift_id' => 1, 'capacity' => 60, 'room_no' => 'Room 301'],
                ['id' => 2, 'class_id' => 5, 'name' => 'Meghna (Day)', 'shift_id' => 2, 'capacity' => 60, 'room_no' => 'Room 302'],
                ['id' => 3, 'class_id' => 5, 'name' => 'Jamuna (Science)', 'shift_id' => 1, 'capacity' => 55, 'room_no' => 'Room 303'],
                ['id' => 4, 'class_id' => 4, 'name' => 'Surma', 'shift_id' => 1, 'capacity' => 60, 'room_no' => 'Room 201'],
                ['id' => 5, 'class_id' => 1, 'name' => 'Karnafuli', 'shift_id' => 1, 'capacity' => 60, 'room_no' => 'Room 101']
            ],
            'groups' => [
                ['id' => 'science', 'name' => 'Science (বিজ্ঞান বিভাগ)'],
                ['id' => 'humanities', 'name' => 'Humanities (মানবিক বিভাগ)'],
                ['id' => 'business_studies', 'name' => 'Business Studies (ব্যবসায় শিক্ষা)']
            ],
            'subjects' => [
                ['id' => 1, 'class_id' => 5, 'name' => 'Bangla 1st Paper', 'code' => '101', 'type' => 'compulsory', 'full_marks' => 100],
                ['id' => 2, 'class_id' => 5, 'name' => 'Bangla 2nd Paper', 'code' => '102', 'type' => 'compulsory', 'full_marks' => 100],
                ['id' => 3, 'class_id' => 5, 'name' => 'English 1st Paper', 'code' => '107', 'type' => 'compulsory', 'full_marks' => 100],
                ['id' => 4, 'class_id' => 5, 'name' => 'English 2nd Paper', 'code' => '108', 'type' => 'compulsory', 'full_marks' => 100],
                ['id' => 5, 'class_id' => 5, 'name' => 'General Mathematics', 'code' => '109', 'type' => 'compulsory', 'full_marks' => 100],
                ['id' => 6, 'class_id' => 5, 'name' => 'Physics', 'code' => '136', 'type' => 'compulsory', 'full_marks' => 100],
                ['id' => 7, 'class_id' => 5, 'name' => 'Chemistry', 'code' => '137', 'type' => 'compulsory', 'full_marks' => 100],
                ['id' => 8, 'class_id' => 5, 'name' => 'Biology', 'code' => '138', 'type' => 'compulsory', 'full_marks' => 100],
                ['id' => 9, 'class_id' => 5, 'name' => 'Higher Mathematics (4th Subject)', 'code' => '126', 'type' => 'elective_4th', 'full_marks' => 100],
                ['id' => 10, 'class_id' => 5, 'name' => 'Information & Communication Tech (ICT)', 'code' => '154', 'type' => 'compulsory', 'full_marks' => 50]
            ]
        ];

        Response::success($data, 'Academic configuration structure');
    }
}
