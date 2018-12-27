var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    cors = require('cors');

var app = express();

//api controller
var userApiController = require('./ApiController/userController'),
    accountApiController  =require('./ApiController/accountController'),
    transactionController  =require('./ApiController/transactionController');


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.statusCode = 200;
    res.json({
        msg: "Hello World"
    });
})

app.use('/api/users', userApiController);
app.use('/api/accounts', accountApiController);
app.use('/api/transactions', transactionController);


//listen on port 3000
var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});