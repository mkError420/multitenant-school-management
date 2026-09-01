<?php

namespace EduManage\Services;

use EduManage\Core\Database;

class PaymentGatewayService {
    /**
     * Initiate Payment Transaction (bKash / Nagad / Cash POS)
     */
    public static function createPayment(int $tenantId, int $invoiceId, int $studentId, float $amount, string $method, ?int $collectedBy = null, ?string $payerPhone = null): array {
        $trxId = strtoupper($method) . '_' . date('Ymd') . '_' . strtoupper(bin2hex(random_bytes(4)));

        // Update or insert payment transaction
        Database::execute(
            "INSERT INTO payment_transactions (tenant_id, invoice_id, student_id, trx_id, payment_method, amount, payer_phone, collected_by, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'success')",
            [$tenantId, $invoiceId, $studentId, $trxId, $method, $amount, $payerPhone, $collectedBy]
        );

        // Update invoice balance
        $invoice = Database::queryOne("SELECT * FROM student_invoices WHERE id = ? AND tenant_id = ?", [$invoiceId, $tenantId]);
        if ($invoice) {
            $newPaid = floatval($invoice['paid_amount']) + $amount;
            $newDue = max(0.00, floatval($invoice['total_amount']) - $newPaid);
            $newStatus = $newDue <= 0 ? 'paid' : 'partially_paid';

            Database::execute(
                "UPDATE student_invoices SET paid_amount = ?, due_amount = ?, status = ? WHERE id = ?",
                [$newPaid, $newDue, $newStatus, $invoiceId]
            );
        }

        // Also record in accounting cash book / income transactions
        Database::execute(
            "INSERT INTO accounting_transactions (tenant_id, type, category, amount, date, payment_method, voucher_no, description) VALUES (?, 'income', 'Student Fee Collection', ?, CURDATE(), ?, ?, ?)",
            [$tenantId, $amount, ucfirst($method), $trxId, "Fee collected for invoice #{$invoiceId}"]
        );

        return [
            'success' => true,
            'trx_id'  => $trxId,
            'amount'  => $amount,
            'method'  => $method,
            'status'  => 'success',
            'paid_at' => date('Y-m-d H:i:s')
        ];
    }
}
