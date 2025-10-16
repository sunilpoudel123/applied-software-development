use auth_db;
INSERT INTO roles (role_name, description)
VALUES ('ROLE_ADMIN', 'Administrator role with full privileges');

INSERT INTO roles (role_name, description)
VALUES ('ROLE_USER', 'USER role with limited privileges');

INSERT INTO roles (role_name, description)
VALUES ('ROLE_MERCHANT', 'USER role with limited privileges');

INSERT INTO users (id, username, email, password, user_type, status, auth_provider, email_verified, phone_verified, created_at, updated_at, last_login, active)
VALUES (UUID_TO_BIN('e9a6c1f4-56b3-4e1f-8e56-1569e2e9ff9f'), 'admin', 'admin@example.com', '$2a$12$H6IDKnEpQJPyn6ba6rIF9u8.cple9xl6OWbC2KkBE7KrU2/jsRbKW', 'ADMIN', 'ACTIVE', 'LOCAL', false, false, NOW(), NOW(), NOW(), true);


INSERT INTO user_roles (user_id, role_id)
VALUES ((SELECT id FROM users WHERE username = 'admin'), 1);