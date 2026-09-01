<?php

namespace EduManage\Middleware;

use EduManage\Core\Request;
use EduManage\Core\Response;

class RoleMiddleware {
    private array $allowedRoles;

    public function __construct(array $allowedRoles = []) {
        $this->allowedRoles = $allowedRoles;
    }

    public function handle(Request $request) {
        $user = $request->getAttribute('user');
        if (!$user) {
            Response::error('Unauthorized: User context missing', 401);
            return false;
        }

        $userRole = $user['role'] ?? '';

        // Super Admin has global bypass
        if ($userRole === 'super_admin') {
            return null;
        }

        if (!empty($this->allowedRoles) && !in_array($userRole, $this->allowedRoles)) {
            Response::error("Forbidden: Your role '{$userRole}' cannot access this resource", 403);
            return false;
        }

        return null;
    }
}
