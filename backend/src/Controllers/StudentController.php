<?php

namespace EduManage\Controllers;

use EduManage\Core\Request;
use EduManage\Core\Response;
use EduManage\Core\Database;
use EduManage\Core\TenantManager;

class StudentController {
    public function listStudents(Request $request): void {
        $classId = $request->getQuery('class_id');
        $sectionId = $request->getQuery('section_id');
        $search = strtolower(trim($request->getQuery('search', '')));

        // Demo sample students list for instant preview
        $students = [
            [
                'id' => 1,
                'admission_no' => 'ADM-2026-1001',
                'roll_no' => 1,
                'name_en' => 'Tanvir Hasan',
                'name_bn' => 'তানভীর হাসান',
                'class_name' => 'Class 10 (SSC Candidate)',
                'class_id' => 5,
                'section_name' => 'Padma (Morning)',
                'section_id' => 1,
                'shift_name' => 'Morning Shift',
                'group_name' => 'Science',
                'gender' => 'Male',
                'blood_group' => 'O+',
                'religion' => 'Islam',
                'father_name' => 'Md. Kamrul Hasan',
                'father_phone' => '+8801711888001',
                'emergency_contact' => '+8801711888001',
                'present_address' => 'House 24, Road 5, Dhanmondi, Dhaka',
                'photo_url' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
                'status' => 'active',
                'fee_status' => 'paid',
                'total_due' => 0.00
            ],
            [
                'id' => 2,
                'admission_no' => 'ADM-2026-1002',
                'roll_no' => 2,
                'name_en' => 'Sadia Afrin',
                'name_bn' => 'সাদিয়া আফরিন',
                'class_name' => 'Class 10 (SSC Candidate)',
                'class_id' => 5,
                'section_name' => 'Padma (Morning)',
                'section_id' => 1,
                'shift_name' => 'Morning Shift',
                'group_name' => 'Science',
                'gender' => 'Female',
                'blood_group' => 'A+',
                'religion' => 'Islam',
                'father_name' => 'Engr. Mahbubur Rahman',
                'father_phone' => '+8801711888002',
                'emergency_contact' => '+8801711888002',
                'present_address' => 'Flat B-3, Green Road, Dhaka',
                'photo_url' => 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
                'status' => 'active',
                'fee_status' => 'paid',
                'total_due' => 0.00
            ],
            [
                'id' => 3,
                'admission_no' => 'ADM-2026-1003',
                'roll_no' => 3,
                'name_en' => 'Arafat Rahman',
                'name_bn' => 'আরাফাত রহমান',
                'class_name' => 'Class 10 (SSC Candidate)',
                'class_id' => 5,
                'section_name' => 'Padma (Morning)',
                'section_id' => 1,
                'shift_name' => 'Morning Shift',
                'group_name' => 'Science',
                'gender' => 'Male',
                'blood_group' => 'B+',
                'religion' => 'Islam',
                'father_name' => 'Dr. Aminul Islam',
                'father_phone' => '+8801711888003',
                'emergency_contact' => '+8801711888003',
                'present_address' => 'Sector 4, Uttara, Dhaka',
                'photo_url' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
                'status' => 'active',
                'fee_status' => 'unpaid',
                'total_due' => 3100.00
            ],
            [
                'id' => 4,
                'admission_no' => 'ADM-2026-1004',
                'roll_no' => 4,
                'name_en' => 'Farzana Akter',
                'name_bn' => 'ফারজানা আক্তার',
                'class_name' => 'Class 10 (SSC Candidate)',
                'class_id' => 5,
                'section_name' => 'Padma (Morning)',
                'section_id' => 1,
                'shift_name' => 'Morning Shift',
                'group_name' => 'Science',
                'gender' => 'Female',
                'blood_group' => 'AB+',
                'religion' => 'Islam',
                'father_name' => 'Jahangir Alam',
                'father_phone' => '+8801711888004',
                'emergency_contact' => '+8801711888004',
                'present_address' => 'Lalmatia Block D, Dhaka',
                'photo_url' => 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80',
                'status' => 'active',
                'fee_status' => 'partially_paid',
                'total_due' => 1700.00
            ],
            [
                'id' => 5,
                'admission_no' => 'ADM-2026-1005',
                'roll_no' => 5,
                'name_en' => 'Mahir Faisal',
                'name_bn' => 'মাহির ফয়সাল',
                'class_name' => 'Class 10 (SSC Candidate)',
                'class_id' => 5,
                'section_name' => 'Padma (Morning)',
                'section_id' => 1,
                'shift_name' => 'Morning Shift',
                'group_name' => 'Science',
                'gender' => 'Male',
                'blood_group' => 'O+',
                'religion' => 'Islam',
                'father_name' => 'Abdur Razzaq',
                'father_phone' => '+8801711888005',
                'emergency_contact' => '+8801711888005',
                'present_address' => 'Mirpur-10, Dhaka',
                'photo_url' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
                'status' => 'active',
                'fee_status' => 'paid',
                'total_due' => 0.00
            ]
        ];

        // Apply filtering
        if (!empty($search)) {
            $students = array_values(array_filter($students, function ($s) use ($search) {
                return str_contains(strtolower($s['name_en']), $search) ||
                       str_contains(strtolower($s['admission_no']), $search) ||
                       str_contains((string)$s['roll_no'], $search) ||
                       str_contains(strtolower($s['father_phone']), $search);
            }));
        }

        Response::success([
            'students' => $students,
            'total' => count($students)
        ], 'Students list retrieved');
    }

    public function createStudent(Request $request): void {
        $body = $request->getBody();
        $nameEn = trim($body['name_en'] ?? '');
        $classId = $body['class_id'] ?? 5;
        $rollNo = intval($body['roll_no'] ?? (rand(6, 60)));

        if (empty($nameEn)) {
            Response::error('Student English Name is required', 422);
            return;
        }

        $admissionNo = 'ADM-2026-' . rand(1006, 9999);
        $newStudent = [
            'id' => rand(6, 999),
            'admission_no' => $admissionNo,
            'roll_no' => $rollNo,
            'name_en' => $nameEn,
            'name_bn' => $body['name_bn'] ?? $nameEn,
            'class_name' => $body['class_name'] ?? 'Class 10 (SSC Candidate)',
            'class_id' => $classId,
            'section_name' => $body['section_name'] ?? 'Padma (Morning)',
            'section_id' => $body['section_id'] ?? 1,
            'shift_name' => $body['shift_name'] ?? 'Morning Shift',
            'group_name' => $body['group_name'] ?? 'Science',
            'gender' => $body['gender'] ?? 'Male',
            'blood_group' => $body['blood_group'] ?? 'A+',
            'religion' => $body['religion'] ?? 'Islam',
            'father_name' => $body['father_name_en'] ?? 'Guardian Name',
            'father_phone' => $body['father_phone'] ?? '+8801711000000',
            'emergency_contact' => $body['emergency_contact'] ?? '+8801711000000',
            'present_address' => $body['present_address'] ?? 'Dhaka, Bangladesh',
            'photo_url' => $body['photo_url'] ?? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
            'status' => 'active',
            'fee_status' => 'unpaid',
            'total_due' => 2500.00
        ];

        Response::success($newStudent, "Student {$nameEn} admitted successfully with Roll #{$rollNo}", 201);
    }
}
