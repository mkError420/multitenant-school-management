<?php

namespace EduManage\Controllers;

use EduManage\Core\Request;
use EduManage\Core\Response;
use EduManage\Core\TenantManager;
use EduManage\Services\SMSGatewayService;

class AttendanceController {
    public function getAttendanceSheet(Request $request): void {
        $date = $request->getQuery('date', date('Y-m-d'));
        $classId = $request->getQuery('class_id', 5);
        $sectionId = $request->getQuery('section_id', 1);

        $attendanceList = [
            [
                'student_id' => 1,
                'roll_no' => 1,
                'name' => 'Tanvir Hasan',
                'photo_url' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
                'phone' => '+8801711888001',
                'status' => 'present',
                'in_time' => '07:42 AM',
                'remarks' => ''
            ],
            [
                'student_id' => 2,
                'roll_no' => 2,
                'name' => 'Sadia Afrin',
                'photo_url' => 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
                'phone' => '+8801711888002',
                'status' => 'present',
                'in_time' => '07:38 AM',
                'remarks' => ''
            ],
            [
                'student_id' => 3,
                'roll_no' => 3,
                'name' => 'Arafat Rahman',
                'photo_url' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
                'phone' => '+8801711888003',
                'status' => 'absent',
                'in_time' => null,
                'remarks' => 'Fever reported by parent'
            ],
            [
                'student_id' => 4,
                'roll_no' => 4,
                'name' => 'Farzana Akter',
                'photo_url' => 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80',
                'phone' => '+8801711888004',
                'status' => 'present',
                'in_time' => '07:45 AM',
                'remarks' => ''
            ],
            [
                'student_id' => 5,
                'roll_no' => 5,
                'name' => 'Mahir Faisal',
                'photo_url' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
                'phone' => '+8801711888005',
                'status' => 'late',
                'in_time' => '08:15 AM',
                'remarks' => 'Traffic delay'
            ]
        ];

        $summary = [
            'total' => count($attendanceList),
            'present' => 3,
            'absent' => 1,
            'late' => 1,
            'leave' => 0,
            'attendance_rate' => 80.0
        ];

        Response::success([
            'date' => $date,
            'class_id' => $classId,
            'section_id' => $sectionId,
            'summary' => $summary,
            'records' => $attendanceList
        ], 'Class attendance sheet fetched');
    }

    public function saveAttendance(Request $request): void {
        $body = $request->getBody();
        $date = $body['date'] ?? date('Y-m-d');
        $records = $body['records'] ?? [];

        Response::success([
            'date' => $date,
            'records_updated' => count($records)
        ], 'Attendance saved successfully');
    }

    public function triggerAbsentSMS(Request $request): void {
        $body = $request->getBody();
        $absents = $body['absents'] ?? [];
        $tenantId = TenantManager::getTenantId() ?: 1;
        $tenant = TenantManager::getCurrentTenant();
        $schoolName = $tenant['short_name'] ?? 'School';

        $dispatched = [];
        foreach ($absents as $student) {
            $msg = "শ্রদ্ধেয় অভিভাবক, আপনার সন্তান {$student['name']} (রোল {$student['roll_no']}) আজ বিদ্যালয়ে অনুপস্থিত। - {$schoolName}";
            $result = SMSGatewayService::sendSMS($tenantId, $student['phone'] ?? '+8801711000000', $msg, 'parent');
            $dispatched[] = $result;
        }

        Response::success([
            'sent_count' => count($dispatched),
            'dispatches' => $dispatched
        ], 'Absent alert SMS sent to ' . count($dispatched) . ' parents');
    }
}
