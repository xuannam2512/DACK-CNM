var express = require('express');

var router = express.Router();

var randomstring = require('randomstring');
var transactionRepo = require('../Repos/transactionRepo');
var authenRepo = require('../repos/authenRepo');
var verifyAccessToken = require('../repos/authenRepo').verifyAccessToken;
//test


// load all data 
// yêu cầu quyền
router.get('/', (req, res) => {
    console.log('comming');
    // console.log(req.body);
    transactionRepo.loadAll()
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





module.exports = router;

