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



///////////////////////////////////////////////////////


exports.create = (accountEntity) => {
    
    var date =  moment().format('YYYY-MM-DD HH:mm:ss');
    var sql =  ` INSERT INTO account (account_number, user_id, balance, date) VALUES
     ('${accountEntity.account_number}','${accountEntity.user_id}',${accountEntity.balance},'${date}') `;
    console.log(":::::::  ",sql);
    
    return db.excuteQuery(sql);
}

exports.logout = (userId) => {
    //write some code here
    var sql =  `delete from user_refresh_token where user_id = ${userId}`;
    return db.excuteQuery(sql);
}

exports.getId = (userId) => {
    //write some code here
    var sql =  `select * from users where user_id = ${userId}`;
    return db.excuteQuery(sql);
}

