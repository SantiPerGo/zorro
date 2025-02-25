USE ZorroDB;
GO

-- Insert Default Statuses
INSERT INTO order_status (status_name) VALUES ('pending'), ('sent'), ('delivered');
GO

-- Insert Example Data into users
INSERT INTO users (username, email, password) VALUES 
('John Doe', 'john@example.com', 'hashedpassword1'), 
('Jane Smith', 'jane@example.com', 'hashedpassword2'),
('Alice Johnson', 'alice@example.com', 'hashedpassword3'),
('Michael Brown', 'michael@example.com', 'hashedpassword4'),
('Emma Davis', 'emma@example.com', 'hashedpassword5'),
('Liam Wilson', 'liam@example.com', 'hashedpassword6');
GO

-- Insert Example Data into products
INSERT INTO products (product_name, price, stock) VALUES 
('Apple', 0.50, 100), 
('Banana', 0.30, 150),
('Carrot', 0.40, 80),
('Milk', 1.20, 50),
('Chips', 1.50, 200),
('Soda', 1.00, 100),
('Bread', 2.00, 60),
('Eggs', 2.50, 30),
('Cheese', 3.00, 40),
('Chicken', 5.00, 20);
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