var express = require('express');

var router = express.Router();

var randomstring = require('randomstring');
var transactionRepo = require('../Repos/transactionRepo');
var transaction_authenRepo = require('../Repos/transaction_authenRepo');
var accountRepo = require('../Repos/accountRepo');


router.get('/', (req, res) => {
    transactionRepo.loadAll()
        .then(rows => {
            if (rows === undefined) {
                res.statusCode = 404;
                res.end();    
            } else {
                if (rows.length == 0) {
                    res.statusCode = 204;
                    res.end();
                } else {
                    res.statusCode = 201;
                    res.json(rows);
                }
            }
        })
        .catch((error) => {
            res.statusCode = 500;
            res.end();
        });
});

router.get('/:id', (req, res) => {
    transactionRepo.single(req.params.id)
    .then(rows => {
        if (rows === undefined) {
            res.statusCode = 404;
            res.end();
        } else {
            if (rows.length == 0) {
                res.statusCode = 204;
                res.end();
            } else {
                res.statusCode = 201;
                res.json(rows[0]);
            }
        }
    })
    .catch(error => {
        res.statusCode = 500;
        res.end();
    });
});

router.get('/user/:account_number', (req, res) => {
    transactionRepo.loadByAccount(req.params.account_number)
    .then(rows => {
        if (rows === undefined) {
            res.statusCode = 404;
            res.end();
        } else {
            if (rows.length == 0) {
                res.statusCode = 204;
                res.end();
            } else {
                res.statusCode = 201;
                res.json(rows);
            }
        }
    })
    .catch(error => {
        res.statusCode = 500;
        res.end();
    });
});

router.post('/', (req, res) => {

    if (req.body.type == 0) {           //nap tien
        transactionRepo.create(req.body)
        .then(rows => {
            res.statusCode = 201;
            res.json(rows);
        })
        .catch(error => {
            res.statusCode = 500;
            res.end();
        });
    } else if (req.body.type == 1) {    //chuyen tien
        var subAmount = req.body.amount;
        var fee = 5000;
        if (req.body.payments == 1){
            subAmount = subAmount + fee;
        }

        accountRepo.getAccountByAccountNumber(req.body.sender_account_number)
        .then(acc => {
            if (acc[0].balance >= subAmount) {
                transactionRepo.create(req.body)
                .then(rows => {
                    res.statusCode = 201;
                    res.json(rows);
                })
                .catch(error => {
                    res.statusCode = 500;
                    res.end();
                });
            } else {
                res.statusCode = 202;
                res.json({"message": "Tai khoan khong du tien de thuc hien giao dich"});
            }
        })
        .catch(e => {
            res.statusCode = 500;
            res.end();
        });

    }
    
});

async function generate_code() {
    var new_code = await randomstring.generate({
        length: 6,
        charset: '0123456789'
    });
    return await transaction_authenRepo.checkExistCode(new_code)
        .then(data => {
            if (data[0].count == 0) {
                return new_code;
            }
            else { 
                return findradom(); 
            }
        })
        .catch(err => {
            return err;
        })
}

router.post('/code/generate', (req, res) => {

    var p = new Promise(function (resolve, reject){
        var values = generate_code();
        resolve(values);
    });

    p.then(new_code => {
        transaction_authenRepo.create(req.body.transaction_id, new_code)
        .then(rows => {
            console.log(rows);
            res.statusCode = 201;
            res.json({"code": new_code});
        })
        .catch(error => {
            res.statusCode = 500;
            res.end();
        });
    })
});

router.post('/code/verify', (req, res) => {

    transaction_authenRepo.checkCode(req.body.transaction_id, req.body.code)
    .then(rows => {
        if (rows[0].count == 1) {

            if (rows[0].type == 0) {                //nap tien vao tai khoan

                var p1 = accountRepo.addBalance(rows[0].reciver_account_number, rows[0].amount);
                var p2 = transactionRepo.execute(rows[0].transaction_id);
                Promise.all([p1, p2])
                .then(values => {
                    res.statusCode = 201;
                    res.json({"message": "Nap tien thanh cong"});
                })
                .catch(err => {
                    res.statusCode = 500;
                    res.end();
                });
            } else if (rows[0].type == 1) {         //chuyen tien
                var fee = 5000;
                var addAmount;
                var subAmount;
                if (rows[0].payments == 0) {
                    addAmount = rows[0].amount - fee;
                    subAmount = rows[0].amount;
                } else {
                    addAmount = rows[0].amount;
                    subAmount = rows[0].amount + fee;
                }

                accountRepo.getAccountByAccountNumber(rows[0].sender_account_number)
                .then(acc => {
                    if (acc[0].balance >= subAmount) {
                        var p1 = accountRepo.addBalance(rows[0].reciver_account_number, addAmount);
                        var p2 = accountRepo.subBalance(rows[0].sender_account_number, subAmount);
                        var p3 = transactionRepo.execute(rows[0].transaction_id);
                        Promise.all([p1, p2, p3])
                        .then(values => {
                            res.statusCode = 201;
                            res.json({"message": "Chuyen tien thanh cong"});
                        })
                        .catch(err => {
                            res.statusCode = 500;
                            res.end();
                        });
                    } else {
                        res.statusCode = 202;
                        res.json({"message": "Tai khoan khong du tien de thuc hien giao dich"});
                    }
                })
                .catch(e => {
                    res.statusCode = 500;
                    res.end();
                });
            }
        } else {
            res.statusCode = 202;
            res.json({"message": "OTP khong chinh xac"});
        }
    })
    .catch(error => {
        res.statusCode = 500;
        res.end();
    })
});

module.exports = router;

