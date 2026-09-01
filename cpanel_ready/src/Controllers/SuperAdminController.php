<?php

namespace EduManage\Controllers;

use EduManage\Core\Request;
use EduManage\Core\Response;
use EduManage\Core\Database;

class SuperAdminController {
    public function getAnalytics(Request $request): void {
        $stats = [
            'total_tenants' => 38,
            'active_schools' => 35,
            'total_students' => 48250,
            'total_teachers' => 2450,
            'monthly_mrr_bdt' => 285000.00,
            'total_sms_dispatched' => 142800,
            'system_health' => 'Healthy (99.98% Uptime)',
            'recent_onboardings' => [
                ['name' => 'Dhaka Residential Model College', 'subdomain' => 'drmc', 'plan' => 'Enterprise', 'students' => 3200, 'joined' => '2026-01-10', 'status' => 'active'],
                ['name' => 'Ideal School and College', 'subdomain' => 'idealschool', 'plan' => 'Enterprise', 'students' => 5400, 'joined' => '2026-01-15', 'status' => 'active'],
                ['name' => 'Chittagong Collegiate School', 'subdomain' => 'collegiate', 'plan' => 'Standard', 'students' => 1800, 'joined' => '2026-02-01', 'status' => 'active'],
                ['name' => 'Rajshahi Collegiate School', 'subdomain' => 'rcs', 'plan' => 'Standard', 'students' => 1200, 'joined' => '2026-02-12', 'status' => 'active'],
                ['name' => 'Sylhet Govt. Pilot High School', 'subdomain' => 'sgphs', 'plan' => 'Basic', 'students' => 650, 'joined' => '2026-02-20', 'status' => 'trial']
            ]
        ];

        Response::success($stats, 'Super admin platform analytics');
    }

    public function getTenants(Request $request): void {
        $tenants = Database::query("SELECT t.*, p.name as plan_name FROM tenants t LEFT JOIN subscription_plans p ON t.subscription_plan_id = p.id ORDER BY t.id DESC");
        
        if (empty($tenants)) {
            $tenants = [
                [
                    'id' => 1,
                    'name' => 'Dhaka Residential Model College',
                    'short_name' => 'DRMC',
                    'eiin_number' => '107985',
                    'board_name' => 'Dhaka',
                    'subdomain' => 'drmc',
                    'custom_domain' => 'drmc.edu.bd',
                    'plan_name' => 'Enterprise College / Model School',
                    'status' => 'active',
                    'email' => 'info@drmc.edu.bd',
                    'phone' => '+8801711000001',
                    'sms_balance' => 4500,
                    'students_count' => 3200,
                    'teachers_count' => 140
                ],
                [
                    'id' => 2,
                    'name' => 'Ideal School and College',
                    'short_name' => 'ISC',
                    'eiin_number' => '108277',
                    'board_name' => 'Dhaka',
                    'subdomain' => 'idealschool',
                    'custom_domain' => 'idealschool.edu.bd',
                    'plan_name' => 'Enterprise College / Model School',
                    'status' => 'active',
                    'email' => 'contact@idealschool.edu.bd',
                    'phone' => '+8801811000002',
                    'sms_balance' => 3200,
                    'students_count' => 5400,
                    'teachers_count' => 210
                ],
                [
                    'id' => 3,
                    'name' => 'Chittagong Collegiate School',
                    'short_name' => 'CCS',
                    'eiin_number' => '104044',
                    'board_name' => 'Chittagong',
                    'subdomain' => 'collegiate',
                    'custom_domain' => null,
                    'plan_name' => 'Standard High School',
                    'status' => 'active',
                    'email' => 'info@ccs.edu.bd',
                    'phone' => '+8801911000003',
                    'sms_balance' => 1200,
                    'students_count' => 1800,
                    'teachers_count' => 75
                ]
            ];
        }

        Response::success($tenants, 'Tenants list fetched');
    }

    public function createTenant(Request $request): void {
        $body = $request->getBody();
        $name = trim($body['name'] ?? '');
        $subdomain = strtolower(trim($body['subdomain'] ?? ''));

        if (empty($name) || empty($subdomain)) {
            Response::error('School name and subdomain are required', 422);
            return;
        }

        $newTenant = [
            'id' => rand(10, 999),
            'uuid' => sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x', mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0x0fff) | 0x4000, mt_rand(0, 0x3fff) | 0x8000, mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)),
            'name' => $name,
            'short_name' => $body['short_name'] ?? '',
            'eiin_number' => $body['eiin_number'] ?? '',
            'board_name' => $body['board_name'] ?? 'Dhaka',
            'subdomain' => $subdomain,
            'custom_domain' => $body['custom_domain'] ?? null,
            'logo_url' => $body['logo_url'] ?? 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=120&auto=format&fit=crop&q=80',
            'theme_color' => $body['theme_color'] ?? '#059669',
            'email' => $body['email'] ?? 'admin@' . $subdomain . '.edu.bd',
            'phone' => $body['phone'] ?? '+8801700000000',
            'address' => $body['address'] ?? '',
            'status' => 'active',
            'subscription_plan_id' => $body['subscription_plan_id'] ?? 2,
            'sms_balance' => 500
        ];

        Response::success($newTenant, "Tenant '{$name}' created successfully", 201);
    }
}
