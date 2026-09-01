<?php

namespace EduManage\Controllers;

use EduManage\Core\Request;
use EduManage\Core\Response;
use EduManage\Core\TenantManager;
use EduManage\Services\BangladeshGradingEngine;

class ExamController {
    public function getExamTerms(Request $request): void {
        $terms = [
            ['id' => 1, 'name' => 'Half-Yearly Examination 2026', 'start_date' => '2026-06-10', 'end_date' => '2026-06-25', 'is_published' => true],
            ['id' => 2, 'name' => 'Pre-Test / Model Test Examination 2026', 'start_date' => '2026-09-15', 'end_date' => '2026-09-30', 'is_published' => false],
            ['id' => 3, 'name' => 'Annual Examination 2026', 'start_date' => '2026-11-15', 'end_date' => '2026-11-30', 'is_published' => false]
        ];

        Response::success($terms, 'Exam terms retrieved');
    }

    public function getTabulationSheet(Request $request): void {
        $examTermId = $request->getQuery('exam_term_id', 1);
        $classId = $request->getQuery('class_id', 5);

        // Subject list
        $subjects = [
            ['id' => 1, 'name' => 'Bangla 1st', 'code' => '101', 'full_marks' => 100, 'type' => 'compulsory'],
            ['id' => 2, 'name' => 'Bangla 2nd', 'code' => '102', 'full_marks' => 100, 'type' => 'compulsory'],
            ['id' => 3, 'name' => 'English 1st', 'code' => '107', 'full_marks' => 100, 'type' => 'compulsory'],
            ['id' => 4, 'name' => 'English 2nd', 'code' => '108', 'full_marks' => 100, 'type' => 'compulsory'],
            ['id' => 5, 'name' => 'General Math', 'code' => '109', 'full_marks' => 100, 'type' => 'compulsory'],
            ['id' => 6, 'name' => 'Physics', 'code' => '136', 'full_marks' => 100, 'type' => 'compulsory'],
            ['id' => 7, 'name' => 'Chemistry', 'code' => '137', 'full_marks' => 100, 'type' => 'compulsory'],
            ['id' => 8, 'name' => 'Biology', 'code' => '138', 'full_marks' => 100, 'type' => 'compulsory'],
            ['id' => 9, 'name' => 'Higher Math (4th)', 'code' => '126', 'full_marks' => 100, 'type' => 'elective_4th']
        ];

        // Students marks matrix
        $studentsRaw = [
            [
                'id' => 1,
                'roll_no' => 1,
                'name' => 'Tanvir Hasan',
                'admission_no' => 'ADM-2026-1001',
                'marks' => [
                    1 => ['cq' => 62, 'mcq' => 26, 'practical' => 0, 'ca' => 0],
                    2 => ['cq' => 58, 'mcq' => 25, 'practical' => 0, 'ca' => 0],
                    3 => ['cq' => 88, 'mcq' => 0,  'practical' => 0, 'ca' => 0],
                    4 => ['cq' => 84, 'mcq' => 0,  'practical' => 0, 'ca' => 0],
                    5 => ['cq' => 65, 'mcq' => 28, 'practical' => 0, 'ca' => 0],
                    6 => ['cq' => 44, 'mcq' => 22, 'practical' => 24, 'ca' => 0],
                    7 => ['cq' => 42, 'mcq' => 21, 'practical' => 23, 'ca' => 0],
                    8 => ['cq' => 45, 'mcq' => 22, 'practical' => 24, 'ca' => 0],
                    9 => ['cq' => 45, 'mcq' => 23, 'practical' => 25, 'ca' => 0] // 4th
                ]
            ],
            [
                'id' => 2,
                'roll_no' => 2,
                'name' => 'Sadia Afrin',
                'admission_no' => 'ADM-2026-1002',
                'marks' => [
                    1 => ['cq' => 58, 'mcq' => 24, 'practical' => 0, 'ca' => 0],
                    2 => ['cq' => 55, 'mcq' => 23, 'practical' => 0, 'ca' => 0],
                    3 => ['cq' => 78, 'mcq' => 0,  'practical' => 0, 'ca' => 0],
                    4 => ['cq' => 76, 'mcq' => 0,  'practical' => 0, 'ca' => 0],
                    5 => ['cq' => 58, 'mcq' => 22, 'practical' => 0, 'ca' => 0],
                    6 => ['cq' => 38, 'mcq' => 19, 'practical' => 22, 'ca' => 0],
                    7 => ['cq' => 40, 'mcq' => 20, 'practical' => 24, 'ca' => 0],
                    8 => ['cq' => 42, 'mcq' => 21, 'practical' => 23, 'ca' => 0],
                    9 => ['cq' => 42, 'mcq' => 22, 'practical' => 24, 'ca' => 0] // 4th
                ]
            ],
            [
                'id' => 3,
                'roll_no' => 3,
                'name' => 'Arafat Rahman',
                'admission_no' => 'ADM-2026-1003',
                'marks' => [
                    1 => ['cq' => 45, 'mcq' => 20, 'practical' => 0, 'ca' => 0],
                    2 => ['cq' => 42, 'mcq' => 19, 'practical' => 0, 'ca' => 0],
                    3 => ['cq' => 65, 'mcq' => 0,  'practical' => 0, 'ca' => 0],
                    4 => ['cq' => 62, 'mcq' => 0,  'practical' => 0, 'ca' => 0],
                    5 => ['cq' => 48, 'mcq' => 18, 'practical' => 0, 'ca' => 0],
                    6 => ['cq' => 32, 'mcq' => 16, 'practical' => 20, 'ca' => 0],
                    7 => ['cq' => 35, 'mcq' => 17, 'practical' => 21, 'ca' => 0],
                    8 => ['cq' => 36, 'mcq' => 17, 'practical' => 20, 'ca' => 0],
                    9 => ['cq' => 35, 'mcq' => 18, 'practical' => 22, 'ca' => 0] // 4th
                ]
            ]
        ];

        // Process each student through BangladeshGradingEngine
        $tabulationRows = [];
        foreach ($studentsRaw as $stu) {
            $studentSubjectPayload = [];
            foreach ($subjects as $sub) {
                $subMarks = $stu['marks'][$sub['id']] ?? ['cq' => 0, 'mcq' => 0, 'practical' => 0, 'ca' => 0];
                $studentSubjectPayload[] = array_merge($sub, [
                    'cq_marks' => $subMarks['cq'],
                    'mcq_marks' => $subMarks['mcq'],
                    'practical_marks' => $subMarks['practical'],
                    'ca_marks' => $subMarks['ca'],
                    'is_4th_subject' => ($sub['type'] === 'elective_4th')
                ]);
            }

            $computed = BangladeshGradingEngine::calculateFinalGPA($studentSubjectPayload);

            $tabulationRows[] = [
                'student_id' => $stu['id'],
                'roll_no' => $stu['roll_no'],
                'name' => $stu['name'],
                'admission_no' => $stu['admission_no'],
                'subject_scores' => $computed['subjects'],
                'total_marks' => $computed['total_marks_obtained'],
                'fourth_bonus' => $computed['fourth_subject_bonus'],
                'gpa' => $computed['gpa'],
                'grade' => $computed['letter_grade'],
                'status' => $computed['status'],
                'position' => count($tabulationRows) + 1
            ];
        }

        Response::success([
            'exam_term_id' => $examTermId,
            'exam_name' => 'Half-Yearly Examination 2026',
            'class_name' => 'Class 10 (Science)',
            'subjects' => $subjects,
            'students' => $tabulationRows
        ], 'Tabulation sheet generated successfully');
    }

    public function getAdmitCardData(Request $request): void {
        $studentId = $request->getQuery('student_id', 1);
        $tenant = TenantManager::getCurrentTenant();

        $admitCard = [
            'institution' => [
                'name' => $tenant['name'] ?? 'Dhaka Residential Model College',
                'eiin' => $tenant['eiin_number'] ?? '107985',
                'board' => $tenant['board_name'] ?? 'Dhaka',
                'logo_url' => $tenant['logo_url'] ?? '',
                'address' => $tenant['address'] ?? 'Mohammadpur, Dhaka-1207'
            ],
            'exam_name' => 'Half-Yearly Examination 2026',
            'student' => [
                'id' => $studentId,
                'name' => 'Tanvir Hasan',
                'name_bn' => 'তানভীর হাসান',
                'admission_no' => 'ADM-2026-1001',
                'roll_no' => 1,
                'class' => 'Class 10 (SSC)',
                'section' => 'Padma (Morning)',
                'shift' => 'Morning Shift',
                'group' => 'Science',
                'photo_url' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
                'barcode' => 'BD-ADM-2026-1001'
            ],
            'schedule' => [
                ['date' => '10-06-2026', 'day' => 'Wednesday', 'time' => '10:00 AM - 01:00 PM', 'subject' => 'Bangla 1st Paper (101)', 'room' => 'Room 301'],
                ['date' => '12-06-2026', 'day' => 'Friday',    'time' => '10:00 AM - 01:00 PM', 'subject' => 'Bangla 2nd Paper (102)', 'room' => 'Room 301'],
                ['date' => '15-06-2026', 'day' => 'Monday',    'time' => '10:00 AM - 01:00 PM', 'subject' => 'English 1st Paper (107)', 'room' => 'Room 301'],
                ['date' => '17-06-2026', 'day' => 'Wednesday', 'time' => '10:00 AM - 01:00 PM', 'subject' => 'English 2nd Paper (108)', 'room' => 'Room 301'],
                ['date' => '20-06-2026', 'day' => 'Saturday',  'time' => '10:00 AM - 01:00 PM', 'subject' => 'General Mathematics (109)', 'room' => 'Room 301'],
                ['date' => '22-06-2026', 'day' => 'Monday',    'time' => '10:00 AM - 01:00 PM', 'subject' => 'Physics (136)', 'room' => 'Room 301'],
                ['date' => '24-06-2026', 'day' => 'Wednesday', 'time' => '10:00 AM - 01:00 PM', 'subject' => 'Chemistry (137)', 'room' => 'Room 301']
            ],
            'instructions' => [
                'Students must enter the exam hall at least 15 minutes before exam starts.',
                'Carrying mobile phones, smart watches, or unauthorized materials is strictly prohibited.',
                'Admit card must be signed by the Principal/Head of Institution.'
            ]
        ];

        Response::success($admitCard, 'Admit card data generated');
    }
}
