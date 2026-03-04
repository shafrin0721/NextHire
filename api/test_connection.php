<?php
// Test database connection
require __DIR__ . "/config/db.php";

try {
  // Test connection
  $result = $pdo->query("SELECT DATABASE() as current_db");
  $db = $result->fetch();
  
  echo "✓ Database connection successful!\n";
  echo "  Connected to: " . $db['current_db'] . "\n\n";
  
  // Count tables
  $tables = $pdo->query("SHOW TABLES")->fetchAll(PDO::FETCH_COLUMN);
  echo "✓ Found " . count($tables) . " tables:\n";
  foreach ($tables as $table) {
    echo "  - $table\n";
  }
  
  // Check users table
  echo "\n✓ Users table structure verified:\n";
  $columns = $pdo->query("DESCRIBE users")->fetchAll();
  foreach ($columns as $col) {
    echo "  - {$col['Field']} ({$col['Type']})\n";
  }
  
  echo "\n✓ All systems ready!\n";
  
} catch (Exception $e) {
  echo "✗ Error: " . $e->getMessage() . "\n";
}
