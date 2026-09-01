<?php

namespace EduManage\Middleware;

use EduManage\Core\Request;
use EduManage\Core\Response;
use EduManage\Core\TenantManager;

class TenantMiddleware {
    public function handle(Request $request) {
        $tenant = TenantManager::resolveFromRequest($request);

        if (!$tenant) {
            // Default to demo tenant 1 for smooth development experience if no header supplied
            $tenant = TenantManager::getMockTenant('1');
        }

        if ($tenant['status'] === 'suspended') {
            Response::error('This school account has been suspended. Please contact the platform administrator.', 403);
            return false;
        }

        TenantManager::setCurrentTenant($tenant);
        $request->setAttribute('tenant', $tenant);
        return null;
    }
}
