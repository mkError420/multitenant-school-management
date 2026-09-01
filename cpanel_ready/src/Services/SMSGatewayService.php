<?php

namespace EduManage\Services;

use EduManage\Core\Database;

class SMSGatewayService {
    /**
     * Send SMS via Bangladeshi Gateway (Greenweb, BulkSMSBD, or Mock)
     */
    public static function sendSMS(int $tenantId, string $recipientPhone, string $message, string $recipientType = 'parent'): array {
        // Clean phone number (format: 88017xxxxxxxx or 017xxxxxxxx)
        $cleanPhone = preg_replace('/[^0-9]/', '', $recipientPhone);
        if (strlen($cleanPhone) === 11 && strpos($cleanPhone, '01') === 0) {
            $cleanPhone = '88' . $cleanPhone;
        }

        $isBangla = preg_match('/[\x{0980}-\x{09FF}]/u', $message);
        $charLimit = $isBangla ? 70 : 160;
        $smsCount = ceil(mb_strlen($message, 'UTF-8') / $charLimit);

        // Deduct from tenant balance
        $tenant = Database::queryOne("SELECT sms_balance, name FROM tenants WHERE id = ?", [$tenantId]);
        if ($tenant && $tenant['sms_balance'] < $smsCount) {
            return [
                'success' => false,
                'message' => 'Insufficient SMS balance in tenant account',
                'sms_count' => $smsCount
            ];
        }

        // Mock gateway dispatch or HTTP cURL execution
        $trxId = 'SMS_' . strtoupper(bin2hex(random_bytes(6)));

        // Record log
        Database::execute(
            "INSERT INTO sms_logs (tenant_id, recipient_phone, recipient_type, message, sms_count, gateway, gateway_trx_id, status) VALUES (?, ?, ?, ?, ?, 'GreenwebBD', ?, 'sent')",
            [$tenantId, $recipientPhone, $recipientType, $message, $smsCount, $trxId]
        );

        if ($tenant) {
            Database::execute("UPDATE tenants SET sms_balance = sms_balance - ? WHERE id = ?", [$smsCount, $tenantId]);
        }

        return [
            'success' => true,
            'trx_id' => $trxId,
            'recipient' => $recipientPhone,
            'sms_count' => $smsCount,
            'message' => $message
        ];
    }

    /**
     * Pre-defined localized templates
     */
    public static function getTemplates(): array {
        return [
            'absent_alert' => "শ্রদ্ধেয় অভিভাবক, আপনার সন্তান {student_name} (রোল {roll_no}) আজ {date} তারিখে বিদ্যালয়ে অনুপস্থিত। - {school_name}",
            'fee_reminder' => "Dear Guardian, Monthly fee for {student_name} (Roll {roll_no}) for {month} is BDT {amount}. Last date: {due_date}. - {school_name}",
            'payment_received' => "Dear Guardian, Payment of BDT {amount} for {student_name} received successfully. TrxID: {trx_id}. - {school_name}",
            'exam_result' => "Result: {student_name} (Roll {roll_no}) obtained GPA {gpa} (Grade: {grade}) in {exam_name}. - {school_name}"
        ];
    }
}
