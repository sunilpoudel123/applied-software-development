USE auth_db;

-- Create roles table
CREATE TABLE IF NOT EXISTS roles (
                                     id INT AUTO_INCREMENT PRIMARY KEY,
                                     role_name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

-- Create users table
CREATE TABLE IF NOT EXISTS users (
                                     id BINARY(16) PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    user_type VARCHAR(50),
    status VARCHAR(50),
    auth_provider VARCHAR(50),
    email_verified BOOLEAN DEFAULT FALSE,
    phone_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    active BOOLEAN DEFAULT TRUE
    );

-- Create user_roles table
CREATE TABLE IF NOT EXISTS user_roles (
                                          user_id BINARY(16) NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
    );

-- Insert roles
INSERT IGNORE INTO roles (role_name, description)
VALUES ('ROLE_ADMIN', 'Administrator role with full privileges');

INSERT IGNORE INTO roles (role_name, description)
VALUES ('ROLE_USER', 'USER role with limited privileges');

INSERT IGNORE INTO roles (role_name, description)
VALUES ('ROLE_MERCHANT', 'MERCHANT role with merchant privileges');

-- Insert admin user
INSERT IGNORE INTO users (id, username, email, password, user_type, status, auth_provider, email_verified, phone_verified, created_at, updated_at, last_login, active)
VALUES (UUID_TO_BIN('e9a6c1f4-56b3-4e1f-8e56-1569e2e9ff9f'), 'admin', 'admin@example.com', '$2a$12$H6IDKnEpQJPyn6ba6rIF9u8.cple9xl6OWbC2KkBE7KrU2/jsRbKW', 'ADMIN', 'ACTIVE', 'LOCAL', false, false, NOW(), NOW(), NOW(), true);

-- Assign admin role to admin user
INSERT IGNORE INTO user_roles (user_id, role_id)
VALUES ((SELECT id FROM users WHERE username = 'admin'), 1);