var express = require('express');
var router = express.Router();
var authen = require('../repos/authenRepo');

router.post('/accesstoken', (req, res) => {
        authen.refreshAccessToken(req.body.refeshToken)
        .then((data)=>{
                res.status = 201;
                res.json({
                    "accesToken": data
                });
        })
        .catch((err)=>{
            console.log(err);
            res.statusCode = 500;
            res.end();
        })

});

router.get('/:authToken', (req, res) => {
    console.log(req.params.authToken);
    authen.checkRefreshToken(req.params.authToken)
    .then((data) => {
        if(data.length > 0) {
            res.statusCode = 200;
            res.json({
                "msg": "Valid",
                "data": data
            });
        }
    })
    .catch((err) => {
        res.statusCode = 500;
        res.end();
    })
})

module.exports = router;
