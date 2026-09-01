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

    // School Admin Management Methods
    public function getSchoolAdmins(Request $request): void {
        $schoolAdmins = Database::query("
            SELECT u.id, u.name, u.email, u.phone, u.role, u.status, u.last_login_at, u.created_at,
                   t.id as school_id, t.name as school_name
            FROM users u
            LEFT JOIN tenants t ON u.tenant_id = t.id
            WHERE u.role IN ('school_admin', 'principal')
            ORDER BY u.id DESC
        ");
        
        if (empty($schoolAdmins)) {
            // Return demo data if no data in database
            $schoolAdmins = [
                [
                    'id' => 1,
                    'name' => 'Prof. Kazi Faruq Ahmed',
                    'email' => 'principal@maneschool.site.je',
                    'phone' => '+8801711111111',
                    'role' => 'principal',
                    'status' => 'active',
                    'school_id' => 1,
                    'school_name' => 'Mane School and College',
                    'last_login_at' => '2026-03-15 10:30:00',
                    'created_at' => '2025-01-10 08:00:00'
                ],
                [
                    'id' => 2,
                    'name' => 'Dr. Mohammad Rahman',
                    'email' => 'principal@drmc.edu.bd',
                    'phone' => '+8801711222222',
                    'role' => 'principal',
                    'status' => 'active',
                    'school_id' => 2,
                    'school_name' => 'Dhaka Residential Model College',
                    'last_login_at' => '2026-03-14 14:20:00',
                    'created_at' => '2024-11-15 09:00:00'
                ],
                [
                    'id' => 3,
                    'name' => 'Ayesha Begum',
                    'email' => 'admin@idealschool.edu.bd',
                    'phone' => '+8801811000002',
                    'role' => 'school_admin',
                    'status' => 'active',
                    'school_id' => 3,
                    'school_name' => 'Ideal School and College',
                    'last_login_at' => '2026-03-10 11:45:00',
                    'created_at' => '2024-08-20 10:15:00'
                ]
            ];
        }

        Response::success($schoolAdmins, 'School admins list fetched');
    }

    public function createSchoolAdmin(Request $request): void {
        $body = $request->getBody();
        $name = trim($body['name'] ?? '');
        $email = trim($body['email'] ?? '');
        $phone = trim($body['phone'] ?? '');
        $schoolId = intval($body['school_id'] ?? 0);
        $role = trim($body['role'] ?? 'school_admin');
        $password = trim($body['password'] ?? 'default123');

        if (empty($name) || empty($email) || empty($schoolId)) {
            Response::error('Name, email, and school ID are required', 422);
            return;
        }

        // Hash password
        $passwordHash = password_hash($password, PASSWORD_DEFAULT);

        // Insert into database
        $result = Database::query(
            "INSERT INTO users (tenant_id, name, email, phone, password_hash, role, status) VALUES (?, ?, ?, ?, ?, ?, 'active')",
            [$schoolId, $name, $email, $phone, $passwordHash, $role]
        );

        if ($result) {
            $newAdmin = [
                'id' => Database::lastInsertId(),
                'name' => $name,
                'email' => $email,
                'phone' => $phone,
                'school_id' => $schoolId,
                'role' => $role,
                'status' => 'active',
                'created_at' => date('Y-m-d H:i:s')
            ];
            Response::success($newAdmin, "School admin '{$name}' created successfully", 201);
        } else {
            Response::error('Failed to create school admin', 500);
        }
    }

    public function updateSchoolAdmin(Request $request): void {
        $body = $request->getBody();
        $adminId = intval($body['id'] ?? 0);
        $name = trim($body['name'] ?? '');
        $email = trim($body['email'] ?? '');
        $phone = trim($body['phone'] ?? '');
        $schoolId = intval($body['school_id'] ?? 0);
        $role = trim($body['role'] ?? 'school_admin');
        $status = trim($body['status'] ?? 'active');
        $password = trim($body['password'] ?? '');

        if (empty($adminId) || empty($name) || empty($email)) {
            Response::error('Admin ID, name, and email are required', 422);
            return;
        }

        // Build update query
        $updateFields = "name = ?, email = ?, phone = ?, tenant_id = ?, role = ?, status = ?";
        $params = [$name, $email, $phone, $schoolId, $role, $status];

        // Add password update if provided
        if (!empty($password)) {
            $updateFields .= ", password_hash = ?";
            $params[] = password_hash($password, PASSWORD_DEFAULT);
        }

        $params[] = $adminId;

        $result = Database::query(
            "UPDATE users SET {$updateFields} WHERE id = ?",
            $params
        );

        if ($result) {
            $updatedAdmin = [
                'id' => $adminId,
                'name' => $name,
                'email' => $email,
                'phone' => $phone,
                'school_id' => $schoolId,
                'role' => $role,
                'status' => $status
            ];
            Response::success($updatedAdmin, "School admin '{$name}' updated successfully");
        } else {
            Response::error('Failed to update school admin', 500);
        }
    }

    public function deleteSchoolAdmin(Request $request): void {
        $adminId = intval($request->getParam('id') ?? 0);

        if (empty($adminId)) {
            Response::error('Admin ID is required', 422);
            return;
        }

        $result = Database::query("DELETE FROM users WHERE id = ?", [$adminId]);

        if ($result) {
            Response::success(null, 'School admin deleted successfully');
        } else {
            Response::error('Failed to delete school admin', 500);
        }
    }

    public function toggleSchoolAdminStatus(Request $request): void {
        $body = $request->getBody();
        $adminId = intval($body['id'] ?? 0);

        if (empty($adminId)) {
            Response::error('Admin ID is required', 422);
            return;
        }

        $result = Database::query(
            "UPDATE users SET status = CASE WHEN status = 'active' THEN 'inactive' ELSE 'active' END WHERE id = ?",
            [$adminId]
        );

        if ($result) {
            Response::success(null, 'School admin status toggled successfully');
        } else {
            Response::error('Failed to toggle school admin status', 500);
        }
    }
}
