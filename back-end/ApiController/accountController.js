var express = require('express');

var router = express.Router();

var randomstring = require('randomstring');
var accountRepo = require('../Repos/accountRepo');
var authenRepo = require('../repos/authenRepo');
var verifyAccessToken = require('../repos/authenRepo').verifyAccessToken;
//test


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
  
    accountRepo.getAccountNumber(req.params.account_number)
        .then(data => {
            res.statusCode = 200;
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
            res.statusCode = 500;
            res.end();

        });
});


async function findradom() {
    var account_number_new = await randomstring.generate({
        length: 13,
        charset: '0123456789'
    });
    return await accountRepo.isExistAccount(account_number_new)
        .then(data => {
            if (data[0].count == 0) {
                return account_number_new;
            }
            else { return findradom(); }
        })
        .catch(err => {
            console.log('loi : hahaha : ', err.message);

        })
}

// tạo mới 1 tài khoản account_number
// yêu cầu quyền
router.post('/', verifyAccessToken,(req, res) => {
    // tạo ra  ra mã 11 kí tự
    var pp = new Promise(function (resolve, reject) {
        var values = findradom();
        resolve(values);
    });
    pp.then(account_number_new => {
        var json = {
            account_number: account_number_new,
            user_id: req.body.user_id,
            balance: req.body.balance
        };

        accountRepo.create(json)
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

// delete 1 tài khoản account_number
// yêu cầu quyền
router.delete('/', verifyAccessToken, (req, res) => {
   accountRepo.deleteId(req.body.account_number)
   .then(data=>{
    res.statusCode = 200;
    res.end();
   })
   .catch(err=>{
    console.log("delete acount_number : ", err.message);
    res.statusCode = 500;
    res.end();
   })
});





module.exports = router;

