<?php

namespace EduManage\Controllers;

use EduManage\Core\Request;
use EduManage\Core\Response;
use EduManage\Core\TenantManager;
use EduManage\Services\PaymentGatewayService;
use EduManage\Services\SMSGatewayService;

class FeeController {
    public function getInvoices(Request $request): void {
        $status = $request->getQuery('status', 'all');
        $studentId = $request->getQuery('student_id');

        $invoices = [
            [
                'id' => 1,
                'invoice_no' => 'INV-2026-03-1001',
                'student_id' => 1,
                'student_name' => 'Tanvir Hasan',
                'roll_no' => 1,
                'class_name' => 'Class 10 (SSC)',
                'title' => 'Tuition & Lab Fee - March 2026',
                'month_year' => 'March 2026',
                'subtotal' => 3100.00,
                'discount' => 0.00,
                'fine' => 0.00,
                'total_amount' => 3100.00,
                'paid_amount' => 3100.00,
                'due_amount' => 0.00,
                'status' => 'paid',
                'payment_method' => 'bKash (Trx: BKASH9A87X21)',
                'due_date' => '2026-03-10',
                'paid_at' => '2026-03-05 11:20 AM'
            ],
            [
                'id' => 2,
                'invoice_no' => 'INV-2026-03-1002',
                'student_id' => 2,
                'student_name' => 'Sadia Afrin',
                'roll_no' => 2,
                'class_name' => 'Class 10 (SSC)',
                'title' => 'Tuition & Lab Fee - March 2026',
                'month_year' => 'March 2026',
                'subtotal' => 3100.00,
                'discount' => 500.00,
                'fine' => 0.00,
                'total_amount' => 2600.00,
                'paid_amount' => 2600.00,
                'due_amount' => 0.00,
                'status' => 'paid',
                'payment_method' => 'Cash (Counter Slip #502)',
                'due_date' => '2026-03-10',
                'paid_at' => '2026-03-06 09:40 AM'
            ],
            [
                'id' => 3,
                'invoice_no' => 'INV-2026-03-1003',
                'student_id' => 3,
                'student_name' => 'Arafat Rahman',
                'roll_no' => 3,
                'class_name' => 'Class 10 (SSC)',
                'title' => 'Tuition & Lab Fee - March 2026',
                'month_year' => 'March 2026',
                'subtotal' => 3100.00,
                'discount' => 0.00,
                'fine' => 0.00,
                'total_amount' => 3100.00,
                'paid_amount' => 0.00,
                'due_amount' => 3100.00,
                'status' => 'unpaid',
                'payment_method' => null,
                'due_date' => '2026-03-10',
                'paid_at' => null
            ],
            [
                'id' => 4,
                'invoice_no' => 'INV-2026-03-1004',
                'student_id' => 4,
                'student_name' => 'Farzana Akter',
                'roll_no' => 4,
                'class_name' => 'Class 10 (SSC)',
                'title' => 'Tuition & Lab Fee - March 2026',
                'month_year' => 'March 2026',
                'subtotal' => 3100.00,
                'discount' => 0.00,
                'fine' => 100.00,
                'total_amount' => 3200.00,
                'paid_amount' => 1500.00,
                'due_amount' => 1700.00,
                'status' => 'partially_paid',
                'payment_method' => 'Nagad (Trx: NAGAD88B129)',
                'due_date' => '2026-03-10',
                'paid_at' => '2026-03-08 02:15 PM'
            ]
        ];

        if ($status !== 'all') {
            $invoices = array_values(array_filter($invoices, fn($inv) => $inv['status'] === $status));
        }

        Response::success([
            'invoices' => $invoices,
            'summary' => [
                'total_billed' => 12000.00,
                'total_collected' => 7200.00,
                'total_due' => 4800.00
            ]
        ], 'Invoices list retrieved');
    }

    public function collectPayment(Request $request): void {
        $body = $request->getBody();
        $invoiceId = intval($body['invoice_id'] ?? 3);
        $studentId = intval($body['student_id'] ?? 3);
        $amount = floatval($body['amount'] ?? 3100.00);
        $method = $body['payment_method'] ?? 'cash';
        $payerPhone = $body['payer_phone'] ?? '+8801711888003';
        $tenantId = TenantManager::getTenantId() ?: 1;

        $paymentResult = PaymentGatewayService::createPayment($tenantId, $invoiceId, $studentId, $amount, $method, 1, $payerPhone);

        // Optionally send payment SMS
        if (!empty($body['send_sms'])) {
            $smsMsg = "Dear Guardian, Payment of BDT {$amount} received successfully for student (ID: {$studentId}). TrxID: {$paymentResult['trx_id']}. Thank you.";
            SMSGatewayService::sendSMS($tenantId, $payerPhone, $smsMsg, 'parent');
        }

        Response::success($paymentResult, "Payment of ৳{$amount} recorded successfully via " . strtoupper($method));
    }

    public function getReceipt(Request $request, array $params = []): void {
        $invoiceId = $params['id'] ?? 1;
        $tenant = TenantManager::getCurrentTenant();

        $receipt = [
            'receipt_no' => 'REC-2026-03-' . str_pad($invoiceId, 4, '0', STR_PAD_LEFT),
            'date' => date('d M, Y'),
            'institution' => [
                'name' => $tenant['name'] ?? 'Dhaka Residential Model College',
                'eiin' => $tenant['eiin_number'] ?? '107985',
                'phone' => $tenant['phone'] ?? '+8801711000001',
                'email' => $tenant['email'] ?? 'info@drmc.edu.bd',
                'address' => $tenant['address'] ?? 'Mirpur Road, Mohammadpur, Dhaka-1207'
            ],
            'student' => [
                'name' => 'Tanvir Hasan',
                'name_bn' => 'তানভীর হাসান',
                'roll_no' => 1,
                'admission_no' => 'ADM-2026-1001',
                'class' => 'Class 10 (SSC)',
                'section' => 'Padma',
                'shift' => 'Morning Shift'
            ],
            'breakdown' => [
                ['particular' => 'Monthly Tuition Fee (March 2026)', 'amount' => 2500.00],
                ['particular' => 'Science Laboratory & Computer Lab Charge', 'amount' => 600.00]
            ],
            'subtotal' => 3100.00,
            'discount' => 0.00,
            'fine' => 0.00,
            'total_amount' => 3100.00,
            'paid_amount' => 3100.00,
            'due_amount' => 0.00,
            'payment_method' => 'bKash Checkout (Trx: BKASH9A87X21)',
            'in_words' => 'Three Thousand One Hundred Taka Only (তিন হাজার একশত টাকা মাত্র)'
        ];

        Response::success($receipt, 'Payment receipt generated');
    }
}
