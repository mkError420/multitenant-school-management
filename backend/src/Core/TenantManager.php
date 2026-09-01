<?php

namespace EduManage\Core;

class TenantManager {
    private static ?array $currentTenant = null;

    public static function setCurrentTenant(?array $tenant): void {
        self::$currentTenant = $tenant;
    }

    public static function getCurrentTenant(): ?array {
        return self::$currentTenant;
    }

    public static function getTenantId(): ?int {
        return self::$currentTenant ? (int)self::$currentTenant['id'] : null;
    }

    public static function resolveFromRequest(Request $request): ?array {
        // 1. Check Explicit Header (Highest priority for API calls)
        $tenantHeader = $request->getHeader('x-tenant-id') ?: $request->getHeader('x-tenant-subdomain');
        if (!empty($tenantHeader)) {
            return self::findTenantByIdOrSubdomain($tenantHeader);
        }

        // 2. Check Query parameter
        $tenantQuery = $request->getQuery('tenant_id') ?: $request->getQuery('subdomain');
        if (!empty($tenantQuery)) {
            return self::findTenantByIdOrSubdomain($tenantQuery);
        }

        // 3. Check Host / Subdomain
        $host = $_SERVER['HTTP_HOST'] ?? '';
        $parts = explode('.', $host);
        if (count($parts) >= 3) {
            $subdomain = $parts[0];
            $tenant = self::findTenantBySubdomain($subdomain);
            if ($tenant) return $tenant;
        }

        // Check custom domain
        if (!empty($host)) {
            $tenant = self::findTenantByCustomDomain($host);
            if ($tenant) return $tenant;
        }

        return null;
    }

    private static function findTenantByIdOrSubdomain(string $identifier): ?array {
        if (is_numeric($identifier)) {
            $tenant = Database::queryOne("SELECT * FROM tenants WHERE id = ? LIMIT 1", [(int)$identifier]);
            if ($tenant) return $tenant;
        }
        
        $tenant = Database::queryOne("SELECT * FROM tenants WHERE subdomain = ? OR uuid = ? LIMIT 1", [$identifier, $identifier]);
        if ($tenant) return $tenant;

        // Fallback demo mock if database not yet migrated
        return self::getMockTenant($identifier);
    }

    private static function findTenantBySubdomain(string $subdomain): ?array {
        $tenant = Database::queryOne("SELECT * FROM tenants WHERE subdomain = ? LIMIT 1", [$subdomain]);
        return $tenant ?: self::getMockTenant($subdomain);
    }

    private static function findTenantByCustomDomain(string $domain): ?array {
        $tenant = Database::queryOne("SELECT * FROM tenants WHERE custom_domain = ? LIMIT 1", [$domain]);
        return $tenant ?: null;
    }

    public static function getMockTenant(string $identifier = '1'): array {
        $demos = [
            '1' => [
                'id' => 1,
                'uuid' => '0190a42f-871d-7201-987a-351df986aa01',
                'name' => 'Dhaka Residential Model College',
                'short_name' => 'DRMC',
                'eiin_number' => '107985',
                'board_name' => 'Dhaka',
                'subdomain' => 'drmc',
                'custom_domain' => 'drmc.edu.bd',
                'logo_url' => 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=120&auto=format&fit=crop&q=80',
                'theme_color' => '#059669',
                'email' => 'info@drmc.edu.bd',
                'phone' => '+8801711000001',
                'address' => 'Mirpur Road, Mohammadpur, Dhaka-1207',
                'status' => 'active',
                'subscription_plan_id' => 3,
                'sms_balance' => 4500
            ],
            '2' => [
                'id' => 2,
                'uuid' => '0190a42f-871d-7201-987a-351df986aa02',
                'name' => 'Ideal School and College',
                'short_name' => 'ISC',
                'eiin_number' => '108277',
                'board_name' => 'Dhaka',
                'subdomain' => 'idealschool',
                'custom_domain' => 'idealschool.edu.bd',
                'logo_url' => 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=120&auto=format&fit=crop&q=80',
                'theme_color' => '#2563eb',
                'email' => 'contact@idealschool.edu.bd',
                'phone' => '+8801811000002',
                'address' => 'Motijheel, Dhaka-1000',
                'status' => 'active',
                'subscription_plan_id' => 3,
                'sms_balance' => 3200
            ],
            'drmc' => [
                'id' => 1,
                'uuid' => '0190a42f-871d-7201-987a-351df986aa01',
                'name' => 'Dhaka Residential Model College',
                'short_name' => 'DRMC',
                'eiin_number' => '107985',
                'board_name' => 'Dhaka',
                'subdomain' => 'drmc',
                'custom_domain' => 'drmc.edu.bd',
                'logo_url' => 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=120&auto=format&fit=crop&q=80',
                'theme_color' => '#059669',
                'email' => 'info@drmc.edu.bd',
                'phone' => '+8801711000001',
                'address' => 'Mirpur Road, Mohammadpur, Dhaka-1207',
                'status' => 'active',
                'subscription_plan_id' => 3,
                'sms_balance' => 4500
            ]
        ];

        return $demos[$identifier] ?? $demos['1'];
    }
}
