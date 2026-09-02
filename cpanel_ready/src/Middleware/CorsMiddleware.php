<?php

namespace EduManage\Middleware;

use EduManage\Core\Request;

class CorsMiddleware {
    public function handle(Request $request) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Tenant-ID, X-Tenant-Subdomain, X-Requested-With, Accept');
        header('Access-Control-Allow-Credentials: true');

        if ($request->getMethod() === 'OPTIONS') {
            http_response_code(200);
            exit;
        }
        return null;
    }
}
