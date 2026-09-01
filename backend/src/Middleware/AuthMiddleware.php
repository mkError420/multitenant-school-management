<?php

namespace EduManage\Middleware;

use EduManage\Core\Request;
use EduManage\Core\Response;
use EduManage\Services\JWTService;

class AuthMiddleware {
    public function handle(Request $request) {
        $authHeader = $request->getHeader('authorization');
        if (!$authHeader || !preg_match('/Bearer\s+(.*)$/i', $authHeader, $matches)) {
            Response::error('Unauthorized: Missing or invalid token', 401);
            return false;
        }

        $token = $matches[1];
        $payload = JWTService::verify($token);

        if (!$payload) {
            Response::error('Unauthorized: Token has expired or is invalid', 401);
            return false;
        }

        $request->setAttribute('user', $payload);
        return null;
    }
}
