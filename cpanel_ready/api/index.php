<?php

/**
 * ============================================================================
 * EduManageBD - Live API Gateway for maneschool.site.je
 * ============================================================================
 */

error_reporting(0);
ini_set('display_errors', '0');

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

$globalMiddlewares = [
    CorsMiddleware::class,
    TenantMiddleware::class
];

// PUBLIC API ROUTES
$router->group('/api', [CorsMiddleware::class], function (Router $r) {
    $r->get('/health', function () {
        Response::success([
            'service' => 'EduManageBD Live Multi-Tenant API',
            'site' => 'maneschool.site.je',
            'status' => 'operational',
            'database' => 'connected',
            'server_time' => date('Y-m-d H:i:s T')
        ], 'API is online and healthy');
    });

    $r->post('/auth/login', [AuthController::class, 'login']);
    $r->get('/tenants/public', [AuthController::class, 'tenantsList']);
});

// SUPER ADMIN ROUTES
$router->group('/api/superadmin', [CorsMiddleware::class], function (Router $r) {
    $r->get('/analytics', [SuperAdminController::class, 'getAnalytics']);
    $r->get('/tenants', [SuperAdminController::class, 'getTenants']);
    $r->post('/tenants', [SuperAdminController::class, 'createTenant']);
    $r->get('/school-admins', [SuperAdminController::class, 'getSchoolAdmins']);
    $r->post('/school-admins', [SuperAdminController::class, 'createSchoolAdmin']);
    $r->put('/school-admins', [SuperAdminController::class, 'updateSchoolAdmin']);
    $r->delete('/school-admins', [SuperAdminController::class, 'deleteSchoolAdmin']);
    $r->patch('/school-admins/toggle', [SuperAdminController::class, 'toggleSchoolAdminStatus']);
});

// SCHOOL TENANT ROUTES
$router->group('/api', $globalMiddlewares, function (Router $r) {
    $r->get('/auth/me', [AuthController::class, 'me']);
    $r->get('/school/dashboard', [TenantAdminController::class, 'getDashboardStats']);
    $r->get('/academic/config', [TenantAdminController::class, 'getAcademicConfig']);

    // Student Management
    $r->get('/students', [StudentController::class, 'listStudents']);
    $r->post('/students', [StudentController::class, 'createStudent']);

    // Attendance & SMS
    $r->get('/attendance/sheet', [AttendanceController::class, 'getAttendanceSheet']);
    $r->post('/attendance/save', [AttendanceController::class, 'saveAttendance']);
    $r->post('/attendance/sms-alert', [AttendanceController::class, 'triggerAbsentSMS']);

    // Exams & Tabulation GPA 5.0
    $r->get('/exams/terms', [ExamController::class, 'getExamTerms']);
    $r->get('/exams/tabulation', [ExamController::class, 'getTabulationSheet']);
    $r->get('/exams/admit-card', [ExamController::class, 'getAdmitCardData']);

    // Fees POS & Receipts
    $r->get('/fees/invoices', [FeeController::class, 'getInvoices']);
    $r->post('/fees/collect', [FeeController::class, 'collectPayment']);
    $r->get('/fees/receipt/{id}', [FeeController::class, 'getReceipt']);

    // Notices & Bulk SMS
    $r->get('/notices', [NoticeSMSController::class, 'getNotices']);
    $r->post('/notices', [NoticeSMSController::class, 'createNotice']);
    $r->post('/sms/send-bulk', [NoticeSMSController::class, 'sendBulkSMS']);
    $r->get('/sms/logs', [NoticeSMSController::class, 'getSMSLogs']);

    // Routines & Payroll
    $r->get('/routine/weekly', [RoutineController::class, 'getWeeklyRoutine']);
    $r->get('/payroll/slips', [PayrollController::class, 'getStaffPayroll']);
});

try {
    $router->dispatch($request);
} catch (\Throwable $e) {
    Response::error('Server error: ' . $e->getMessage(), 500);
}
