CREATE KEYSPACE IF NOT EXISTS dev_space
WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 3 };


CREATE TABLE IF NOT EXISTS dev_space.user (
  id int,
  name text,
  address text,
  PRIMARY KEY (id,name)
)
WITH CLUSTERING ORDER BY (name DESC);

INSERT INTO dev_space.user (id, name, address)
  VALUES (1, 'Alex', 'Endereco 1');
INSERT INTO dev_space.user (id, name, address)
  VALUES (2, 'Pedro', 'Endereco 2');
INSERT INTO dev_space.user (id, name, address)
  VALUES (3, 'Manuel', 'Endereco 3');
INSERT INTO dev_space.user (id, name, address)
  VALUES (4, 'Carol', 'Endereco 4');

select * from dev_space.user;
