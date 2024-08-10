create table passwords (
  id varchar(255) primary key,
  user_id varchar(255), foreign key (user_id) references users (id),
  createAt varchar(255),
  updateAt varchar(255),
  value varchar(2048)
);