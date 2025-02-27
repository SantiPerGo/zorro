USE ZorroDB;
GO

-- Insert Default Statuses
INSERT INTO order_status (status_name) VALUES ('PENDING'), ('SENT'), ('DELIVERED');
GO

-- Password used before hashing: MySecurePassword123
-- Insert Example Data into users
INSERT INTO users (username, email, password) VALUES 
('John Doe', 'john@example.com', '$2a$10$5IwKMIhaZmUaogQqylrJOe/BETYNiJDXd7A9EuFk6fdkt51rwWzz2'), 
('Jane Smith', 'jane@example.com', '$2a$10$5IwKMIhaZmUaogQqylrJOe/BETYNiJDXd7A9EuFk6fdkt51rwWzz2'),
('Alice Johnson', 'alice@example.com', '$2a$10$5IwKMIhaZmUaogQqylrJOe/BETYNiJDXd7A9EuFk6fdkt51rwWzz2'),
('Michael Brown', 'michael@example.com', '$2a$10$5IwKMIhaZmUaogQqylrJOe/BETYNiJDXd7A9EuFk6fdkt51rwWzz2'),
('Emma Davis', 'emma@example.com', '$2a$10$5IwKMIhaZmUaogQqylrJOe/BETYNiJDXd7A9EuFk6fdkt51rwWzz2'),
('Liam Wilson', 'liam@example.com', '$2a$10$5IwKMIhaZmUaogQqylrJOe/BETYNiJDXd7A9EuFk6fdkt51rwWzz2');
GO

-- Insert Example Data into products
INSERT INTO products (product_name, price, stock) VALUES 
('Bolsa de Manzanas', 0.50, 100), 
('Plátano Seco', 0.30, 150),
('Zanahorias de Granja', 0.40, 80),
('Leche', 1.20, 50),
('Papas Fritas Lays', 1.50, 200),
('Coca Cola en Lata', 1.00, 100),
('Bolsa de Pan', 2.00, 60),
('Cartón de Huevo', 2.50, 30),
('Queso Rallado', 3.00, 40),
('Tiras de Polllo Tyson', 5.00, 20);
GO

-- Insert Example Data into orders
INSERT INTO orders (user_id, status_id) VALUES 
(1, 1),  -- John Doe, pending
(2, 2),  -- Jane Smith, sent
(1, 3),  -- John Doe, delivered
(3, 1),  -- Alice Johnson, pending
(4, 2),  -- Michael Brown, sent
(5, 3);  -- Emma Davis, delivered
GO

-- Insert Example Data into order_details
INSERT INTO order_details (order_id, product_id, quantity) VALUES 
(1, 1, 3),  -- Order 1: 3 Apples
(1, 3, 2),  -- Order 1: 2 Carrots
(2, 2, 1),  -- Order 2: 1 Banana
(3, 4, 1),  -- Order 3: 1 Milk
(4, 5, 5),  -- Order 4: 5 Chips
(4, 7, 2),  -- Order 4: 2 Bread
(5, 6, 2),  -- Order 5: 2 Sodas
(6, 8, 1),  -- Order 6: 1 Eggs
(6, 9, 1),  -- Order 6: 1 Cheese
(6, 10, 1); -- Order 6: 1 Chicken
GO