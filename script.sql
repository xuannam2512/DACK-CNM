CREATE DATABASE dackcnm;

USE dackcnm;

#permission: 0 - nhân viên, 1 - người dùng bình thường
CREATE TABLE users (
	user_id int(11) auto_increment not null unique,
    username varchar(50) unique not null,
    fullname nvarchar(50) not null,
    phone varchar(11) not null,
    email varchar(50) not null unique,
    password varchar(100) not null,
    permission int(2) not null,
    primary key (user_id)
);

CREATE TABLE users_refresh_token (
	user_id int(11) not null unique,
    refresh_token varchar(100) not null,
    date datetime default now(),
    primary key (user_id),
    foreign key (user_id) references users(user_id)
);

CREATE TABLE account (
	account_number varchar(13) not null unique,
    user_id int(11) not null,
    balance bigint(32) default 0,
    date datetime default now(),
    primary key (account_number),
    foreign key (user_id) references users(user_id)
);

#payments: 0 - người nhận trả phí, 1 - Người gửi trả phí
#type: 0 - nạp tiền vào tài khoảng, 1 - chuyển tiền
CREATE TABLE transaction (
	transaction_id int(32) not null auto_increment unique,
    payments int(2) not null default 0,
    sender_account_number varchar(13) not null,
    reciver_account_number varchar(13) not null,
    amount bigint(32) not null default 0,
    date datetime default now(),
    type int(2) not null default 0,
    primary key (transaction_id),
    foreign key (sender_account_number) references account(account_number),
    foreign key (reciver_account_number) references account(account_number)
);

CREATE TABLE transaction_authentication (
	transaction_id int(32) not null unique,
    code varchar(100) not null,
    datetime datetime default now(),
    primary key (transaction_id),
    foreign key (transaction_id) references transaction (transaction_id)
);

CREATE TABLE account_recivers (	
    reciver_account_number varchar(13) not null,
    user_id int not null,
    remider_name nvarchar(50) not null,
    primary key (reciver_account_number, user_id),
    foreign key (reciver_account_number) references account(account_number),
    foreign key (user_id) references users(user_id)
);

#delete event if exist
DROP EVENT IF EXISTS AutoDeleteOldCode;

#create a event to delete row
#Auto delete row in table transaction_authentication
CREATE EVENT AutoDeleteOldCode
ON SCHEDULE AT CURRENT_TIMESTAMP
ON COMPLETION PRESERVE
DO
DELETE LOW_PRIORITY from dackcnm.transaction_authentication where datetime < DATE_SUB(NOW(), INTERVAL 1 MINUTE);
