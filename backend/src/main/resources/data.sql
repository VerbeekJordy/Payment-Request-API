INSERT INTO `products` (`sku_id`, `image_url`, `price`, `title_en`, `title_nl`) VALUES
('0', 'https://image.coolblue.be/max/500x500/products/1392099', '110', 'monitor', 'scherm'),
('1', 'https://image.coolblue.be/max/500x500/products/1387901', '2200', 'Macbook', 'Macbook'),
('2', 'https://image.coolblue.be/max/500x500/products/1386697', '599', 'HP laptop', 'HP laptop'),
('3', 'https://image.coolblue.be/max/500x500/products/1389773', '59', 'mouse', 'muis'),
('4', 'https://image.coolblue.be/max/500x500/products/1382318', '89', 'Headset', 'Headset'),
('5', 'https://image.coolblue.be/max/500x500/products/1388600', '1499', 'HP Pavilion All', 'HP Pavilion All');

INSERT INTO `role` (`id`, `description`, `name`) VALUES
(0, 'Customer', 'USER');

INSERT INTO `user` (`id`, `email`, `full_name`, `password`, `role_id`) VALUES
(0, 'GUEST', 'guest orders', '$2a$10$JE814LS5aAtdWuXI/giQ0OfEpT9n23u2zUgho0a73olJpXIfQkej2', 0),
(1, 'verbeek.jordy@elision.eu', 'Jordy Verbeek', '$2a$10$w8705oqywRzPsaiaU8L9CuzIv/pqA01pvd7i0Po4d/n64ikWveBZm', 0);
