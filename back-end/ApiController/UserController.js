var express = require('express');

var router = express.Router();

router.get('/', (req, res) => {
    res.json({
        msg: "Hello API"
    });
});

module.exports = router;