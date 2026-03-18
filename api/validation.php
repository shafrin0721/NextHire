<?php
/**
 * Validation Utility for NextHire API
 */
declare(strict_types=1);

class Validator {
    private static array $errors = [];

    public static function reset(): void {
        self::$errors = [];
    }

    public static function addError(string $field, string $message): void {
        self::$errors[$field] = $message;
    }

    public static function getErrors(): array {
        return self::$errors;
    }

    public static function hasErrors(): bool {
        return !empty(self::$errors);
    }

    public static function required($value, string $field): bool {
        if (empty($value)) {
            self::addError($field, "{$field} is required");
            return false;
        }
        return true;
    }

    public static function email($value, string $field = 'email'): bool {
        if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
            self::addError($field, "Invalid email format");
            return false;
        }
        return true;
    }

    public static function minLength($value, int $min, string $field): bool {
        if (strlen($value) < $min) {
            self::addError($field, "{$field} must be at least {$min} characters");
            return false;
        }
        return true;
    }

    public static function maxLength($value, int $max, string $field): bool {
        if (strlen($value) > $max) {
            self::addError($field, "{$field} must not exceed {$max} characters");
            return false;
        }
        return true;
    }

    public static function numeric($value, string $field): bool {
        if (!is_numeric($value)) {
            self::addError($field, "{$field} must be numeric");
            return false;
        }
        return true;
    }

    public static function unique($pdo, string $table, string $column, $value, string $field): bool {
        try {
            $stmt = $pdo->prepare("SELECT COUNT(*) FROM {$table} WHERE {$column} = ?");
            $stmt->execute([$value]);
            if ($stmt->fetchColumn() > 0) {
                self::addError($field, "{$field} already exists");
                return false;
            }
            return true;
        } catch (Exception $e) {
            self::addError($field, "Database error");
            return false;
        }
    }

    public static function exists($pdo, string $table, string $column, $value, string $field): bool {
        try {
            $stmt = $pdo->prepare("SELECT COUNT(*) FROM {$table} WHERE {$column} = ?");
            $stmt->execute([$value]);
            if ($stmt->fetchColumn() === 0) {
                self::addError($field, "{$field} not found");
                return false;
            }
            return true;
        } catch (Exception $e) {
            self::addError($field, "Database error");
            return false;
        }
    }
}

function respondError(int $code, string $message, array $errors = []): void {
    http_response_code($code);
    $response = ['status' => 'error', 'message' => $message];
    if (!empty($errors)) {
        $response['errors'] = $errors;
    }
    exit(json_encode($response));
}

function respondSuccess(array $data = [], string $message = 'Success'): void {
    http_response_code(200);
    exit(json_encode(['status' => 'success', 'message' => $message, 'data' => $data]));
}

function respondCreated(array $data = [], string $message = 'Created successfully'): void {
    http_response_code(201);
    exit(json_encode(['status' => 'success', 'message' => $message, 'data' => $data]));
}
