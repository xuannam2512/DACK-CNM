var db = require('../fn/db');
var md5 = require('crypto-js/md5');
var moment = require('moment');



exports.getAccountNumber  = accountNumberId => {
    
    let sql = `select * from dackcnm.account where account_number  = ${accountNumberId}`;

    return db.excuteQuery(sql);
}


exports.isExistAccount = account_number =>{

    var sql = `select count(*) as count from account where account_number = ${account_number}`;

    return db.excuteQuery(sql);
}

exports.deleteId = account_number => {
    //write some code here
    var sql =  `delete from account where account_number  = ${account_number}`;
    return db.excuteQuery(sql);
}

exports.loadAll = () => {
    var sql = `select * from dackcnm.transaction where success = 1`;
    return db.excuteQuery(sql);
}

exports.single = transaction_id => {
    var sql = `select * from dackcnm.transaction where transaction_id = ${transaction_id} and success = 1`;
    return db.excuteQuery(sql);
}

exports.loadByAccount = account_number => {
    var sql = `select * from dackcnm.transaction where (sender_account_number = ${account_number} or reciver_account_number = ${account_number}) and success = 1`;
    return db.excuteQuery(sql);
}

exports.create = transEntity => {

    var date =  moment().format('YYYY-MM-DD HH:mm:ss');

    var sql = `insert into dackcnm.transaction (payments, sender_account_number, reciver_account_number, 
        amount, date, type) values (${transEntity.payments}, "${transEntity.sender_account_number}", 
        "${transEntity.reciver_account_number}", ${transEntity.amount}, "${date}", ${transEntity.type})`;
    console.log(sql);
    return db.excuteQuery(sql);
}

exports.execute = transaction_id => {
    var sql = `update transaction set success = 1 where transaction_id = ${transaction_id}`;
    return db.excuteQuery(sql);
}