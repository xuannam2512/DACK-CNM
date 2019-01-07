var express = require('express');

var router = express.Router();

var userRepo = require('../repos/userRepo');
var accountRepo = require('../Repos/accountRepo');
var authenRepo = require('../repos/authenRepo');
var verifyAccessToken = require('../repos/authenRepo').verifyAccessToken;
//test

router.get('/',(req, res) => {
    // console.log(req.body);
    userRepo.loadAll()
        .then(data => {
            //console.log(data);
            res.statusCode = 201;
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
            res.statusCode = 500;
            res.json(err);
        });
});

//get id  account
router.get('/:id',verifyAccessToken,  (req, res) => {

    userRepo.getUserById(req.params.id)
        .then(data => {
            if(data.length == 0)
            {
                res.statusCode = 204;
                res.end();
            } else {
                res.statusCode = 200;
                res.json(data[0]);
            }            
        })
        .catch((err) => {
            console.log(err);
            res.statusCode = 500;
            res.json(err);
        })
});

// get user by refresh token
router.get('/token/:refreshToken', (req, res) => {

    userRepo.getUserByToken(req.params.refreshToken)
        .then(data => {
            if(data.length == 0)
            {
                res.statusCode = 204;
                res.end();
            } else {
                res.statusCode = 200;
                res.json(data[0]);
            } 
        })
        .catch((err) => {
            console.log(err);
            res.statusCode = 500;
            res.json(err);
        });
})

//get user by account number
router.get('/account/:account_number', verifyAccessToken, (req, res) => {
    
    accountRepo.getAccountByAccountNumber(req.params.account_number)
    .then(data => {
        if(data.length > 0)
        {
            console.log(data[0].user_id);            
            return userRepo.getUserById(data[0].user_id)
        } else {
            res.statusCode = 204;
            res.json({
                "msg": "Account is not exist"
            })
        }
    })
    .then(data => {
        console.log("user: ", data)
        if(data.length > 0) {
            res.statusCode = 200;
            res.json(data[0]);
        } else {
            res.statusCode = 204;
            res.json({
                "msg": "User is not exist"
            });
        }
    })
    .catch(err => {
        res.statusCode = 500;
        res.json(err);
    })
})

//register a account.
router.post('/', (req, res) => {
    userRepo.create(req.body)
        .then(data => {
            res.statusCode = 201;
            res.json(data);
        })
        .catch((err) => {
            //username is exist
            let value = err.toString();
            if (value.indexOf("username") > 0) {
                res.statusCode = 203;
                res.json({
                    "message": "Username Invalid"
                });
            } 
            else if (value.indexOf("fullname") > 0) {
                res.statusCode = 203;
                res.json({
                    "message": "Fullname Invalid"
                });
            } 
            else if (value.indexOf("phone") > 0) {
                res.statusCode = 203;
                res.json({
                    "message": "Phone Invalid"
                });
            }
            else if (value.indexOf("email") > 0) {
                res.statusCode = 203;
                res.json({
                    "message": "Email Invalid"
                });
            } 
            else if (value.indexOf("password") > 0) {
                res.statusCode = 203;
                res.json({
                    "message": "Password Invalid"
                });
            }
            else {
                console.log(err);
                res.statusCode = 500;
                res.json(err);
            }
        });
});

//login account
router.post('/login', (req, res) => {

    console.log('come in');
    
    userRepo.login(req.body)
        .then(data => {
            var countRow = data.length;
            console.log(countRow);
            if (countRow > 0) {
                //  đăng nhập thành công
                var accessToken = authenRepo.generateAccessToken(data);
                var refeshToken = authenRepo.generateRefreshToken();
                authenRepo.updateRefreshToken(data[0].user_id, refeshToken)
                .then(value => {
                    res.statusCode = 201;
                    res.json({
                        "user": data[0],
                        "accessToken": accessToken,
                        "refreshToken": refeshToken
                    });
                })                
            } else {
                res.statusCode = 204;
                res.end();
            }
        })
        .catch((err) => {
            console.log(err);
            res.statusCode = 500;
            res.json(err);
        })
});

router.post('/logout',verifyAccessToken, (req, res) => {
    //write some code here
    console.log(req.body.userId);
    userRepo.logout(req.body.userId)
        .then(data => {
            res.status = 200;
            res.json(data);
        }).catch((err) => {
            console.log(err);
            res.statusCode = 500;
            res.json(err);
        })
});

// hiển thị all list friend
// yêu cầu quyền
router.get('/:user_id/recivers',verifyAccessToken,  (req, res) => {
    console.log(" hien thi all : ",req.params.user_id);
    
    userRepo.loadAllReciversFlowId(req.params.user_id)
    .then(data=>{
     res.statusCode = 200;
     res.json(data);
    })
    .catch(err=>{
     console.log("get  users/recivers : ", err.message);
     res.statusCode = 500;
     res.json(err);
    })
 });


 // thêm 1  friend vào list 
// yêu cầu quyền
router.post('/:user_id/recivers',  (req, res) => {
    
    var json = {user_id : req.params.user_id, ...req.body }
    userRepo.createReciversFlowId(json)
    .then(data=>{
     res.statusCode = 200;
     res.json(data);
    })
    .catch(err=>{
     console.log("get  users/recivers : ", err.message);
     res.statusCode = 500;
     res.json(err);
    })
 });


  // Xem list danh sách tất cả các  giao dịch
// yêu cầu quyền
router.get('/:user_id/transactions',  (req, res) => {
    
    userRepo.loadAllTransactionsFlowId(req.params.user_id)
    .then(data=>{
     res.statusCode = 200;
     res.json(data);
    })
    .catch(err=>{
     console.log("Xem chi tiết một giao dịch : ", err.message);
     res.statusCode = 500;
     res.json(err);
    })
 });


  // Xem chi tiết một giao dịch
// yêu cầu quyền
router.get('/:user_id/transactions/:transaction_id',  (req, res) => {
    
    var json = {user_id : req.params.user_id, transaction_id : req.params.transaction_id}
    userRepo.loadTransactionsFlowId(json)
    .then(data=>{
     res.statusCode = 200;
     res.json(data);
    })
    .catch(err=>{
     console.log("Xem chi tiết một giao dịch : ", err.message);
     res.statusCode = 500;
     res.json(err);
    })
 });

 //Nạp tiền vào tài khoảng
// yêu cầu quyền
router.post('/:user_id/transactions/',  (req, res) => {
    
    userRepo.loadTransactionsFlowId(json)
    .then(data=>{
     res.statusCode = 200;
     res.json(data);
    })
    .catch(err=>{
     console.log("Xem chi tiết một giao dịch : ", err.message);
     res.statusCode = 500;
     res.json(err);
    })
 });



module.exports = router;

