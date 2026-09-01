<?php
/**
 * Application Configuration for maneschool.site.je
 */

return [
    'app_name' => 'EduManageBD SaaS - School & College Management System',
    'app_env' => 'production',
    'app_url' => 'https://maneschool.site.je',
    'jwt_secret' => 'BD_EduManage_Super_Secret_Key_2026_!@#$',
    'jwt_expire_hours' => 72,
    'default_timezone' => 'Asia/Dhaka',
    'currency' => 'BDT',
    'currency_symbol' => '৳',
    'sms_gateways' => [
        'greenweb' => [
            'api_token' => 'demo_greenweb_token',
            'api_url' => 'https://api.greenweb.com.bd/api.php',
        ],
        'bulksmsbd' => [
            'api_key' => 'demo_bulksms_key',
            'sender_id' => 'DRMC_EDU',
        ]
    ],
    'payment_gateways' => [
        'bkash' => [
            'app_key' => 'demo_bkash_key',
            'app_secret' => 'demo_bkash_secret',
            'username' => 'demo_user',
            'password' => 'demo_pass',
            'sandbox' => true
        ],
        'nagad' => [
            'merchant_id' => '68000000000',
            'sandbox' => true
        ],
        'sslcommerz' => [
            'store_id' => 'edumanage_live',
            'store_passwd' => 'edumanage@123',
            'sandbox' => true
        ]
    ]
];
