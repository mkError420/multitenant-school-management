<?php

namespace EduManage\Core;

use PDO;
use PDOException;

class Database {
    private static ?PDO $instance = null;

    public static function getConnection(): ?PDO {
        if (self::$instance === null) {
            $config = require __DIR__ . '/../../config/database.php';
            $dsn = "mysql:host={$config['host']};port={$config['port']};dbname={$config['database']};charset={$config['charset']}";
            
            try {
                self::$instance = new PDO($dsn, $config['username'], $config['password'], $config['options']);
            } catch (PDOException $e) {
                // If MySQL connection fails in local demo mode, log and return null
                // Controllers have graceful fallback demo data responses.
                error_log("Database connection error: " . $e->getMessage());
                return null;
            }
        }
        return self::$instance;
    }

    public static function query(string $sql, array $params = []): array {
        $pdo = self::getConnection();
        if (!$pdo) {
            return [];
        }
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll();
    }

    public static function queryOne(string $sql, array $params = []): ?array {
        $pdo = self::getConnection();
        if (!$pdo) {
            return null;
        }
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        $result = $stmt->fetch();
        return $result ?: null;
    }

    public static function execute(string $sql, array $params = []): bool {
        $pdo = self::getConnection();
        if (!$pdo) {
            return false;
        }
        $stmt = $pdo->prepare($sql);
        return $stmt->execute($params);
    }

    public static function lastInsertId(): string {
        $pdo = self::getConnection();
        return $pdo ? $pdo->lastInsertId() : '0';
    }
}
