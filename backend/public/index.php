<?php

/**
 * ============================================================================
 * EduManageBD - Multi-Tenant School & College Management REST API
 * Production Entry Point
 * ============================================================================
 */

// Error handling in production/demo
error_reporting(E_ALL);
ini_set('display_errors', '0');

// Autoload function for EduManage PSR-4 namespace
spl_autoload_register(function ($class) {
    $prefix = 'EduManage\\';
    $baseDir = __DIR__ . '/../src/';

    $len = strlen($prefix);
    if (strncmp($prefix, $class, $len) !== 0) {
        return;
    }

    $relativeClass = substr($class, $len);
    $file = $baseDir . str_replace('\\', '/', $relativeClass) . '.php';

    if (file_exists($file)) {
        require_once $file;
    }
});

use EduManage\Core\Request;
use EduManage\Core\Response;
use EduManage\Core\Router;
use EduManage\Middleware\CorsMiddleware;
use EduManage\Middleware\TenantMiddleware;
use EduManage\Middleware\AuthMiddleware;
use EduManage\Middleware\RoleMiddleware;
use EduManage\Controllers\AuthController;
use EduManage\Controllers\SuperAdminController;
use EduManage\Controllers\TenantAdminController;
use EduManage\Controllers\StudentController;
use EduManage\Controllers\AttendanceController;
use EduManage\Controllers\ExamController;
use EduManage\Controllers\FeeController;
use EduManage\Controllers\NoticeSMSController;
use EduManage\Controllers\RoutineController;
use EduManage\Controllers\PayrollController;

$request = new Request();
$router = new Router();

// Global Middlewares: CORS & Multi-Tenancy Scoping
$globalMiddlewares = [
    CorsMiddleware::class,
    TenantMiddleware::class
];

// ----------------------------------------------------------------------------
// PUBLIC API ROUTES
// ----------------------------------------------------------------------------
$router->group('/api', [CorsMiddleware::class], function (Router $r) {
    // Health & Service Discovery
    $r->get('/health', function () {
        Response::success([
            'service' => 'EduManageBD Multi-Tenant API',
            'version' => '2.5.0',
            'status' => 'operational',
            'country' => 'Bangladesh',
            'server_time' => date('Y-m-d H:i:s T')
        ], 'API is healthy');
    });

    // Authentication & Tenants
    $r->post('/auth/login', [AuthController::class, 'login']);
    $r->get('/tenants/public', [AuthController::class, 'tenantsList']);
});

// ----------------------------------------------------------------------------
// SUPER ADMIN (SAAS PLATFORM) ROUTES
// ----------------------------------------------------------------------------
$router->group('/api/superadmin', [CorsMiddleware::class], function (Router $r) {
    $r->get('/analytics', [SuperAdminController::class, 'getAnalytics']);
    $r->get('/tenants', [SuperAdminController::class, 'getTenants']);
    $r->post('/tenants', [SuperAdminController::class, 'createTenant']);
});

// ----------------------------------------------------------------------------
// TENANT SPECIFIC & ACADEMIC CORE ROUTES (School Admin, Teachers, Staff)
// ----------------------------------------------------------------------------
$router->group('/api', $globalMiddlewares, function (Router $r) {
    // Profile / Current Tenant Session
    $r->get('/auth/me', [AuthController::class, 'me']);

    // School Dashboard & Academic Setup
    $r->get('/school/dashboard', [TenantAdminController::class, 'getDashboardStats']);
    $r->get('/academic/config', [TenantAdminController::class, 'getAcademicConfig']);

    // Students Module
    $r->get('/students', [StudentController::class, 'listStudents']);
    $r->post('/students', [StudentController::class, 'createStudent']);

    // Attendance Module & Absent Alert SMS
    $r->get('/attendance/sheet', [AttendanceController::class, 'getAttendanceSheet']);
    $r->post('/attendance/save', [AttendanceController::class, 'saveAttendance']);
    $r->post('/attendance/sms-alert', [AttendanceController::class, 'triggerAbsentSMS']);

    // Exams, Marksheets, Bangladesh GPA 5.0 Tabulation & Admit Cards
    $r->get('/exams/terms', [ExamController::class, 'getExamTerms']);
    $r->get('/exams/tabulation', [ExamController::class, 'getTabulationSheet']);
    $r->get('/exams/admit-card', [ExamController::class, 'getAdmitCardData']);

    // Fees, Invoices, bKash POS Payment & Printable Money Receipts
    $r->get('/fees/invoices', [FeeController::class, 'getInvoices']);
    $r->post('/fees/collect', [FeeController::class, 'collectPayment']);
    $r->get('/fees/receipt/{id}', [FeeController::class, 'getReceipt']);

    // Notices & Bulk SMS Portal
    $r->get('/notices', [NoticeSMSController::class, 'getNotices']);
    $r->post('/notices', [NoticeSMSController::class, 'createNotice']);
    $r->post('/sms/send-bulk', [NoticeSMSController::class, 'sendBulkSMS']);
    $r->get('/sms/logs', [NoticeSMSController::class, 'getSMSLogs']);

    // Weekly Class Routine
    $r->get('/routine/weekly', [RoutineController::class, 'getWeeklyRoutine']);

    // Payroll & Salary Slips
    $r->get('/payroll/slips', [PayrollController::class, 'getStaffPayroll']);
});

// Dispatch Request
try {
    $router->dispatch($request);
} catch (\Throwable $e) {
    Response::error('Server exception: ' . $e->getMessage(), 500);
}
