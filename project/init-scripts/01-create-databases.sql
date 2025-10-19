-- Create all required databases
CREATE DATABASE IF NOT EXISTS auth_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS wallet_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Grant all privileges to walletuser for both databases
GRANT ALL PRIVILEGES ON auth_db.* TO 'walletuser'@'%';
GRANT ALL PRIVILEGES ON wallet_db.* TO 'walletuser'@'%';
FLUSH PRIVILEGES;