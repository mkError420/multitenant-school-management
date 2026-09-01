<?php

namespace EduManage\Controllers;

use EduManage\Core\Request;
use EduManage\Core\Response;
use EduManage\Core\TenantManager;
use EduManage\Services\SMSGatewayService;

class NoticeSMSController {
    public function getNotices(Request $request): void {
        $notices = [
            [
                'id' => 1,
                'title' => 'Half-Yearly Examination 2026 Routine & Admit Card Collection',
                'content' => 'The Half-Yearly Examination 2026 will start on 10th June 2026. All students must collect their Admit Cards by 5th June after clearing tuition dues.',
                'target_role' => 'all',
                'author' => 'Prof. Kazi Faruq Ahmed (Principal)',
                'date' => '2026-03-01',
                'is_pinned' => true
            ],
            [
                'id' => 2,
                'title' => 'Shaheed Dibash & International Mother Language Day Program',
                'content' => 'Cultural program and discussion meeting will be held at college auditorium at 9:00 AM on 21st February.',
                'target_role' => 'all',
                'author' => 'College Authority',
                'date' => '2026-02-18',
                'is_pinned' => false
            ],
            [
                'id' => 3,
                'title' => 'Special Science Practical Revision Classes on Saturdays',
                'content' => 'Extra physics and chemistry lab classes will be conducted for SSC Candidates starting this Saturday.',
                'target_role' => 'students',
                'author' => 'Science Department',
                'date' => '2026-02-10',
                'is_pinned' => false
            ]
        ];

        Response::success($notices, 'Notices list retrieved');
    }

    public function createNotice(Request $request): void {
        $body = $request->getBody();
        $title = trim($body['title'] ?? '');
        $content = trim($body['content'] ?? '');

        if (empty($title) || empty($content)) {
            Response::error('Notice title and content are required', 422);
            return;
        }

        $newNotice = [
            'id' => rand(4, 999),
            'title' => $title,
            'content' => $content,
            'target_role' => $body['target_role'] ?? 'all',
            'author' => 'Admin',
            'date' => date('Y-m-d'),
            'is_pinned' => !empty($body['is_pinned'])
        ];

        Response::success($newNotice, 'Notice published successfully', 201);
    }

    public function sendBulkSMS(Request $request): void {
        $body = $request->getBody();
        $target = $body['target_group'] ?? 'all_parents'; // all_parents, class_10, teachers
        $message = trim($body['message'] ?? '');
        $tenantId = TenantManager::getTenantId() ?: 1;

        if (empty($message)) {
            Response::error('Message text cannot be empty', 422);
            return;
        }

        // Mock sending to target group
        $recipientsCount = $target === 'class_10' ? 60 : 350;
        $isBangla = preg_match('/[\x{0980}-\x{09FF}]/u', $message);
        $smsPerUser = ceil(mb_strlen($message, 'UTF-8') / ($isBangla ? 70 : 160));
        $totalCredits = $recipientsCount * $smsPerUser;

        $tenant = TenantManager::getCurrentTenant();
        if ($tenant && $tenant['sms_balance'] < $totalCredits) {
            Response::error("Insufficient SMS credits. Required: {$totalCredits}, Available: {$tenant['sms_balance']}", 400);
            return;
        }

        Response::success([
            'recipients_count' => $recipientsCount,
            'sms_per_recipient' => $smsPerUser,
            'total_credits_deducted' => $totalCredits,
            'gateway' => 'GreenwebBD (Masking: DRMC_EDU)',
            'status' => 'queued_for_delivery'
        ], "Bulk SMS queued for {$recipientsCount} recipients successfully");
    }

    public function getSMSLogs(Request $request): void {
        $logs = [
            ['id' => 1, 'recipient' => '+8801711888001', 'type' => 'parent', 'message' => 'Payment of BDT 3100 received for Tanvir Hasan (Roll 1).', 'count' => 1, 'gateway' => 'bKash-Webhook', 'status' => 'delivered', 'time' => '2026-03-05 11:21 AM'],
            ['id' => 2, 'recipient' => '+8801711888003', 'type' => 'parent', 'message' => 'শ্রদ্ধেয় অভিভাবক, আপনার সন্তান আরাফাত রহমান (রোল ৩) আজ অনুপস্থিত।', 'count' => 1, 'gateway' => 'GreenwebBD', 'status' => 'delivered', 'time' => '2026-03-01 09:30 AM'],
            ['id' => 3, 'recipient' => '+8801711888004', 'type' => 'parent', 'message' => 'Monthly fee notice for Farzana Akter (Roll 4). Due: 10th March.', 'count' => 1, 'gateway' => 'GreenwebBD', 'status' => 'delivered', 'time' => '2026-02-28 04:15 PM']
        ];

        Response::success($logs, 'SMS delivery logs retrieved');
    }
}
