var db = require('../fn/db');
var md5 = require('crypto-js/md5');
var moment = require('moment');

exports.loadAll  = userEntity =>{
    var sql = `SELECT * FROM dackcnm.account`;
    return db.excuteQuery(sql);
}


exports.getAccountByAccountNumber  = accountNumberId => {
    
    let sql = `select * from dackcnm.account where account_number  = ${accountNumberId}`;

    return db.excuteQuery(sql);
}

exports.getAccountsByUserId = user_id => {
    let sql = `SELECT * FROM account WHERE user_id = ${user_id}`;

    return db.excuteQuery(sql);
}


exports.checkExistAccount = account_number =>{

    var sql = `select count(*) as count from account where account_number = ${account_number}`;

    return db.excuteQuery(sql);
}

//lock a account by id
exports.lockAccountByAccountNumber = account_number => {
    let sql = `UPDATE account SET status = 0 WHERE account_number = ${account_number}`;

    return db.excuteQuery(sql);
}

//unlock a account bu account number
exports.unlockAccountByAccountNumber = account_number => {
    let sql = `UPDATE account SET status = 1 WHERE account_number = ${account_number}`;

    return db.excuteQuery(sql);
}

//create a account
exports.create = (accountEntity) => {
    
    var date =  moment().format('YYYY-MM-DD HH:mm:ss');
    var sql =  ` INSERT INTO account (account_number, user_id, balance, date, status) VALUES
     ('${accountEntity.account_number}','${accountEntity.user_id}',${accountEntity.balance},'${date}', ${accountEntity.status}) `;

    return db.excuteQuery(sql);
}
