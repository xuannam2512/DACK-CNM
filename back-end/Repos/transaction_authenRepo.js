var db = require('../fn/db');
var moment = require('moment');

exports.checkExistCode = code => {
    var sql = `select count(*) as count from transaction_authentication where code = ${code}`;
    return db.excuteQuery(sql);
}

exports.create = (transaction_id, code) => {
    var datetime =  moment().format('YYYY-MM-DD HH:mm:ss');
    var sql = `insert into transaction_authentication (transaction_id, code, datetime) values (${transaction_id},
        "${code}", "${datetime}")`;

    return db.excuteQuery(sql);
}

exports.checkCode = (transaction_id, code) => {
    var sql = `select *, count(*) as count from transaction_authentication ta, transaction t where (ta.transaction_id = ${transaction_id} and ta.code = "${code}") and t.transaction_id = ${transaction_id}`;
    return db.excuteQuery(sql);
}