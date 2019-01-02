var db = require('../fn/db');

//get all 
exports.getAccountRecievers = () => {
    let sql = `SELECT * FROM account_recivers`;

    return db.excuteQuery(sql);
}

exports.getAccountRecieversByUserId = user_id => {
    let sql = `SELECT * FROM account_recivers WHERE user_id = ${user_id}`;

    return db.excuteQuery(sql);
}

exports.getAccountRecieversByUserIdAndAccountNumber = (user_id, account_number) => {
    let sql = `SELECT * FROM account_recivers WHERE user_id = ${user_id} and reciver_account_number = ${account_number}`;

    return db.excuteQuery(sql);
}

exports.createAccountReciever = accountRecieverEntity => {
    let sql = `INSERT INTO account_recivers(reciver_account_number, user_id, remider_name) VALUES` + 
    `('${accountRecieverEntity.reciver_account_number}', ${accountRecieverEntity.user_id}, '${accountRecieverEntity.remider_name}')`;

    return db.excuteQuery(sql);
}

exports.updateAccountReciever = accountRecieverEntity => {
    let sql = `UPDATE account_recivers set remider_name = '${accountRecieverEntity.remider_name}'` + 
    `WHERE reciver_account_number = '${accountRecieverEntity.reciver_account_number}' and user_id = ${accountRecieverEntity.user_id}`;

    return db.excuteQuery(sql);
}

exports.deleteAccountReciever = (account_number, user_id) => {
    let sql = `DELETE FROM account_recivers WHERE reciver_account_number = '${account_number}' and user_id = ${user_id}`;

    return db.excuteQuery(sql);
}

