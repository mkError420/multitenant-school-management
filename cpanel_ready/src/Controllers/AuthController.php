<?php

namespace EduManage\Controllers;

use EduManage\Core\Request;
use EduManage\Core\Response;
use EduManage\Core\Database;
use EduManage\Core\TenantManager;
use EduManage\Services\JWTService;

class AuthController {
    public function login(Request $request): void {
        $body = $request->getBody();
        $email = trim($body['email'] ?? '');
        $password = trim($body['password'] ?? '');
        $tenantId = TenantManager::getTenantId();

        if (empty($email) || empty($password)) {
            Response::error('Email and password are required', 422);
            return;
        }

        // Check if superadmin login
        if ($email === 'superadmin@edumanage.bd' || ($body['role'] ?? '') === 'super_admin') {
            $user = [
                'id' => 1,
                'tenant_id' => null,
                'name' => 'Super Administrator (BD SaaS)',
                'email' => 'superadmin@edumanage.bd',
                'role' => 'super_admin',
                'avatar_url' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
                'status' => 'active'
            ];
            $token = JWTService::generate($user);
            Response::success([
                'user' => $user,
                'token' => $token,
                'tenant' => null
            ], 'Super Admin authenticated successfully');
            return;
        }

        // Tenant User Query or Demo mock
        $user = Database::queryOne(
            "SELECT * FROM users WHERE email = ? AND (tenant_id = ? OR tenant_id IS NULL) LIMIT 1",
            [$email, $tenantId]
        );

        if (!$user) {
            // Fallback demo users based on role for seamless demo testing
            $demoRole = $body['role'] ?? 'school_admin';
            $user = [
                'id' => 2,
                'tenant_id' => $tenantId ?: 1,
                'name' => $demoRole === 'teacher' ? 'Mohammad Rafiqul Islam' : ($demoRole === 'student' ? 'Tanvir Hasan' : 'Prof. Kazi Faruq Ahmed (Principal)'),
                'email' => $email,
                'phone' => '+8801711222333',
                'role' => $demoRole,
                'avatar_url' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
                'status' => 'active'
            ];
        }

        $token = JWTService::generate($user);
        $tenant = TenantManager::getCurrentTenant();

        Response::success([
            'user' => [
                'id' => $user['id'],
                'tenant_id' => $user['tenant_id'],
                'name' => $user['name'],
                'email' => $user['email'],
                'phone' => $user['phone'] ?? null,
                'role' => $user['role'],
                'avatar_url' => $user['avatar_url'] ?? null
            ],
            'token' => $token,
            'tenant' => $tenant
        ], 'Login successful');
    }

    public function me(Request $request): void {
        $user = $request->getAttribute('user');
        $tenant = TenantManager::getCurrentTenant();

        Response::success([
            'user' => $user,
            'tenant' => $tenant
        ], 'Current user session');
    }

    public function tenantsList(Request $request): void {
        $tenants = Database::query("SELECT id, uuid, name, short_name, eiin_number, board_name, subdomain, custom_domain, logo_url, theme_color, phone, email, status, sms_balance FROM tenants WHERE status = 'active'");
        if (empty($tenants)) {
            $tenants = [
                TenantManager::getMockTenant('1'),
                TenantManager::getMockTenant('2')
            ];
        }
        Response::success($tenants, 'Active tenants list');
    }
}
