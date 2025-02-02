USE api;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100),
  token VARCHAR(255),
  avatar VARCHAR(100),
  role VARCHAR(255),
  is_block INT default(0),
  PRIMARY KEY (id)
);


INSERT INTO users (username, password, role, is_block)
VALUES ('user1', '1', 'user', 0);

INSERT INTO users (username, password, role, is_block)
VALUES ('user2', '2', 'user', 0);

INSERT INTO users (username, password, email, avatar, role, is_block)
VALUES ('admin1', '1', 'admin1@gmail.com', 'avatar1.png', 'admin', 0);

INSERT INTO users (username, password, email, avatar, role, is_block)
VALUES ('admin2', '2', 'admin2@gmail.com', 'avatar2.png', 'admin', 0);

INSERT INTO users (username, password, email, avatar, role, is_block)
VALUES ('admin3', '$2a$10$VWJc1OnYdThT3CJzwk05GOumF5j3eRIvBsqfZDQ1IYM0./JPznKSm', 'admin3@gmail.com', 'avatar2.png', 'admin', 0);
-- $2a$10$VWJc1OnYdThT3CJzwk05GOumF5j3eRIvBsqfZDQ1IYM0./JPznKSm là băm của 3
