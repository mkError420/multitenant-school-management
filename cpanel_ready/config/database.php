<?php
/**
 * Live Database Configuration for maneschool.site.je
 */

return [
    'driver'    => 'mysql',
    'host'      => 'sql101.infinityfree.com',
    'port'      => '3306',
    'database'  => 'if0_42784359_myscmanagement',
    'username'  => 'if0_42784359',
    'password'  => '4naAUPQvgRj3',
    'charset'   => 'utf8mb4',
    'collation' => 'utf8mb4_unicode_ci',
    'options'   => [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ]
];
