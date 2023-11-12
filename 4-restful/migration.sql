CREATE DATABASE petshop;

-- Connect to the new database
\c petshop;


CREATE TABLE pet_shop (
    id serial PRIMARY KEY,
    age int,
    kind varchar(20) NOT NULL,
    name varchar(20) NOT NULL
);