var express = require('express');

var router = express.Router();

var randomstring = require('randomstring');
var accountRepo = require('../Repos/accountRepo');

// load all data 
// yêu cầu quyền
router.get('/',  (req, res) => {
    // console.log(req.body);
    accountRepo.loadAll()
        .then(data => {
            //console.log(data);
            res.statusCode = 201;
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
            res.statusCode = 500;
            res.end();
        });
});


// lấy ra 1 tài khoản thanh toán account_number
// yêu cầu quyền
router.get('/:account_number', (req, res) => {
  
    accountRepo.getAccountByAccountNumber(req.params.account_number)
        .then(data => {
            if(data.length > 0)
            {
                res.statusCode = 200;
                res.json(data[0]);
            } else {
                res.statusCode = 204;
                res.end();
            }         
        })
        .catch((err) => {
            console.log(err);
            res.statusCode = 500;
            res.end();

        });
});

//get accounts by user id
router.get("/users/:user_id", (req, res) => {

    accountRepo.getAccountsByUserId(req.params.user_id)
    .then(data => {
        if(data.length > 0)
        {
            res.statusCode = 200;
            res.json(data);
        } else {
            res.statusCode = 204;
            res.end();
        }        
    })
    .catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end();
    })
});


async function findradom() {
    var account_number_new = await randomstring.generate({
        length: 12,
        charset: '0123456789'
    });
    return await accountRepo.checkExistAccount(account_number_new)
        .then(data => {
            if (data[0].count == 0) {
                return account_number_new;
            }
            else { 
                return findradom(); 
            }
        })
        .catch(err => {
            return err;
        })
}

// tạo mới 1 tài khoản account_number
// yêu cầu quyền
router.post('/', (req, res) => {
    // tạo ra  ra mã 11 kí tự
    var pp = new Promise(function (resolve, reject) {
        var values = findradom();
        resolve(values);
    });
    pp.then(account_number_new => {
        var account = {
            account_number: account_number_new,
            user_id: req.body.user_id,
            balance: req.body.balance
        };

        accountRepo.create(account)
            .then(data => {
                res.statusCode = 201;
                res.json(data);
            })
            .catch((err) => {
                console.log("create acount_number : ", err.message);
                res.statusCode = 500;
                res.end();
            });
    })
});

// lock a account_number
router.post('/lock', (req, res) => {
    if (req.body.account_number === undefined) {
        res.statusCode = 400;
        res.json({
            "msg": "Error request",
            "error": req.body.account_number
        });
    } else {
        accountRepo.lockAccountByAccountNumber(req.body.account_number)
            .then(data => {
                res.statusCode = 200;
                res.json({
                    "msg": "account locked",
                    "data": data
                });
            })
            .catch(err => {
                res.statusCode = 500;
                res.end();
            })
    }
});

router.unlock('/', (req, res) => {

    if (req.body.account_number === undefined) {
        res.statusCode = 400;
        res.json({
            "msg": "Error request",
            "error": req.body.account_number
        });
    } else {
        accountRepo.unlockAccountByAccountNumber(req.body.account_number)
            .then(data => {
                res.statusCode = 200;
                res.json({
                    "msg": "account ativated",
                    "data": data
                });
            })
            .catch(err => {
                res.statusCode = 500;
                res.end();
            })
    }
})


module.exports = router;

