var express = require('express');

var router = express.Router();

//import repos
var recieverRepo = require('../Repos/recieverRepo');

//get All reciever
router.get('/', (req, res) => {
    recieverRepo.getAccountRecievers()
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
        res.statusCode = 500;
        res.json(err);
    })
});

//get reciever by user_id
router.get('/users/:user_id', (req, res) => {
    let userId = req.params.user_id;

    recieverRepo.getAccountRecieversByUserId(userId)
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
        res.statusCode = 500;
        res.json(err);
    });
});

//get reciever by user_id and account_number
router.get('/:user_id/:account_number', (req, res) => {
    let userId = req.params.user_id;
    let accountNumber = req.params.account_number;

    recieverRepo.getAccountRecieversByUserIdAndAccountNumber(userId, accountNumber)
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
    .catch(err => {
        res.statusCode = 500;
        res.json(err);
    });
});

//create a account_reciver
router.post('/', (req, res) => {
    let recieverEntity = req.body;

    recieverRepo.createAccountReciever(recieverEntity)
    .then(data => {
        res.statusCode = 201;
        res.json(data);
    })
    .catch(err => {
        res.statusCode = 500;
        res.json(err);
    });
});

//update remider name of account reciever
router.put('/', (req, res) => {
    let recieverEntity = req.body;

    recieverRepo.updateAccountReciever(recieverEntity)
    .then(data => {
        res.statusCode = 200;
        res.json(data);
    })
    .catch(err => {
        res.statusCode = 500;
        res.json(err);
    });
});

router.delete('/', (req, res) => {
    let userId = req.body.user_id;
    let accountNumber = req.body.reciver_account_number;

    recieverRepo.deleteAccountReciever(accountNumber, userId)
    .then(data => {
        res.statusCode = 200;
        res.json(data);
    })
    .catch(err => {
        res.statusCode = 500;
        res.json(err);
    });
});

module.exports = router;