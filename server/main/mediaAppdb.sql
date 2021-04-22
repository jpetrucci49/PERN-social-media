CREATE DATABASE socialMediaApp7Db;

CREATE TABLE users (
  uid SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE,
  email VARCHAR(255) UNIQUE,
  email_verified BOOLEAN,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  date_created TIMESTAMP DEFAULT Now(),
  date_modified TIMESTAMP DEFAULT Now(),
  last_login TIMESTAMP DEFAULT Now()
);

CREATE TABLE posts (
  pid SERIAL PRIMARY KEY,
  uid INT REFERENCES users(uid),
  parent_id INT REFERENCES posts(pid),
  title VARCHAR(255),
  body VARCHAR,
  search_vector TSVECTOR,
  author VARCHAR REFERENCES users(username),
  date_created TIMESTAMP DEFAULT Now(),
  date_updated TIMESTAMP,
  like_user_id INT[] DEFAULT ARRAY[]::INT[],
  likes INT DEFAULT 0
);
