<?php
/**
 * Live Database Configuration for maneschool.site.je (InfinityFree / cPanel)
 */

return [
    'driver'    => getenv('DB_DRIVER') ?: 'mysql',
    'host'      => getenv('DB_HOST') ?: 'sql101.infinityfree.com',
    'port'      => getenv('DB_PORT') ?: '3306',
    'database'  => getenv('DB_DATABASE') ?: 'if0_42784359_myscmanagement',
    'username'  => getenv('DB_USERNAME') ?: 'if0_42784359',
    'password'  => getenv('DB_PASSWORD') ?: '4naAUPQvgRj3',
    'charset'   => 'utf8mb4',
    'collation' => 'utf8mb4_unicode_ci',
    'options'   => [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ]
];
