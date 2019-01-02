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

