<?php

namespace EduManage\Controllers;

use EduManage\Core\Request;
use EduManage\Core\Response;

class PayrollController {
    public function getStaffPayroll(Request $request): void {
        $month = $request->getQuery('month', '2026-03');

        $staffPayroll = [
            [
                'id' => 1,
                'staff_name' => 'Prof. Kazi Faruq Ahmed',
                'designation' => 'Principal',
                'department' => 'Administration',
                'basic' => 85000.00,
                'house_rent' => 20000.00,
                'medical' => 5000.00,
                'conveyance' => 5000.00,
                'deduction' => 2000.00,
                'net_salary' => 113000.00,
                'status' => 'paid',
                'payment_date' => '2026-03-01'
            ],
            [
                'id' => 2,
                'staff_name' => 'Mohammad Rafiqul Islam',
                'designation' => 'Senior Teacher',
                'department' => 'Mathematics',
                'basic' => 52000.00,
                'house_rent' => 12000.00,
                'medical' => 3000.00,
                'conveyance' => 2000.00,
                'deduction' => 1000.00,
                'net_salary' => 68000.00,
                'status' => 'paid',
                'payment_date' => '2026-03-01'
            ],
            [
                'id' => 3,
                'staff_name' => 'Nusrat Jahan',
                'designation' => 'Lecturer',
                'department' => 'English',
                'basic' => 48000.00,
                'house_rent' => 10000.00,
                'medical' => 3000.00,
                'conveyance' => 2000.00,
                'deduction' => 0.00,
                'net_salary' => 63000.00,
                'status' => 'paid',
                'payment_date' => '2026-03-01'
            ],
            [
                'id' => 4,
                'staff_name' => 'Md. Shahinur Rahman',
                'designation' => 'Senior Accountant',
                'department' => 'Accounts',
                'basic' => 38000.00,
                'house_rent' => 8000.00,
                'medical' => 2500.00,
                'conveyance' => 1500.00,
                'deduction' => 0.00,
                'net_salary' => 50000.00,
                'status' => 'paid',
                'payment_date' => '2026-03-01'
            ]
        ];

        $summary = [
            'total_staff' => 4,
            'total_disbursed' => 294000.00,
            'pending_disbursement' => 0.00
        ];

        Response::success([
            'month' => $month,
            'summary' => $summary,
            'records' => $staffPayroll
        ], 'Staff payroll and salary slips retrieved');
    }
}
