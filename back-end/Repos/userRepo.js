var db = require('../fn/db');
var md5 = require('crypto-js/md5');


exports.loadAll  = () => {
    var sql = `select * from users`;
    return db.excuteQuery(sql);
}

exports.create = userEntity => {
    let md5_password = md5(userEntity.password);
    let sql = `insert into users (username,fullname,phone,email,password,permission) values ('${userEntity.username}',N'${userEntity.fullname}', '${userEntity.phone}', '${userEntity.email}', '${md5_password}',  '${userEntity.permission}')`;

    return db.excuteQuery(sql);
}

// exports.login = function(loginEntity) {   //write some code here }
exports.login = (userEntity) => {
    var md5_password = md5(userEntity.password);

    var sql =  `select * from	 users where username = '${userEntity.username}' and password = '${md5_password}' `;
    return db.excuteQuery(sql);
}

exports.logout = (userId) => {
    //write some code here
    var sql =  `delete from user_refresh_token where user_id = ${userId}`;
    return db.excuteQuery(sql);
}

exports.getUserById = (userId) => {
    //write some code here
    var sql =  `select * from users where user_id = ${userId}`;
    return db.excuteQuery(sql);
}

//get user by token
exports.getUserByToken = token => {
    var sql = `SELECT * ` +
    `FROM dackcnm.users u join dackcnm.users_refresh_token urt on urt.user_id = u.user_id ` + 
    `where urt.refresh_token like '${token}'`;

    return db.excuteQuery(sql);
}

exports.loadAllReciversFlowId = (userId) => {
    //write some code here
    var sql =  `SELECT * FROM dackcnm.account_recivers where user_id = ${userId}`;
    return db.excuteQuery(sql);
}

exports.createReciversFlowId = (reciverEntity) => {
    //write some code here
    var sql =  `INSERT INTO dackcnm.account_recivers (reciver_account_number, user_id, remider_name) VALUES
        ('${reciverEntity.reciver_account_number}',${reciverEntity.user_id},N'${reciverEntity.remider_name}') `;
    return db.excuteQuery(sql);
}
exports.loadAllTransactionsFlowId = (userId) => {
    //write some code here
    var sql =  `select * from transaction a inner join account b 
    on a.sender_account_number = b.account_number and b.user_id = ${userId}  `;
    return db.excuteQuery(sql);
}
exports.loadTransactionsFlowId = (transactionEntity) => {
    //write some code here
    var sql =  `select * from transaction a inner join account b 
    on a.sender_account_number = b.account_number and b.user_id = ${transactionEntity.user_id} and a.transaction_id = ${transactionEntity.transaction_id} `;
    return db.excuteQuery(sql);
}

exports.insertTransactionsFlowId = (transactionEntity) => {
    //write some code here
    var sql =  `select * from transaction a inner join account b 
    on a.sender_account_number = b.account_number and b.user_id = ${transactionEntity.user_id} and a.transaction_id = ${transactionEntity.transaction_id} `;
    return db.excuteQuery(sql);
}
