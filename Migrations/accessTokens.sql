create table access_tokens (
  id varchar(255) primary key,
  user_id varchar(255), foreign key (user_id) references users (id),
  device varchar(255),
  createAt varchar(255),
  expiresAt varchar(255),
  value varchar(2048)
);