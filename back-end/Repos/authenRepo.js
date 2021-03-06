var db = require('../fn/db');
var jwt = require('jsonwebtoken');
var randToken = require('rand-token');
var moment = require('moment');

const SECRET_KEY = "123456";
const AC_LIFETIME = 3600;
const SIZE = 80;

exports.generateAccessToken = (userEntity) => {
    let payload = {
        user: userEntity
    }

    let accessToken = jwt.sign(payload, SECRET_KEY, {
        expiresIn: AC_LIFETIME
    });

    return accessToken;
}

exports.generateRefreshToken = () => {
    var refreshToken = randToken.generate(SIZE);
    return refreshToken;
}

exports.updateRefreshToken = (userId, refreshToken) => {
    return new Promise((resolve, reject) => {
        var deleteSql = `delete from users_refresh_token where user_id = ${userId}`;

        db.excuteQuery(deleteSql)
            .then((data) => {
                
                var refreshTokenTime = moment().format('YYYY-MM-DD HH:mm:ss');
                console.log(refreshTokenTime);
                var insertSql = `insert into users_refresh_token(user_id, refresh_token, date) values ('${userId}', '${refreshToken}', '${refreshTokenTime}')`;

                return db.excuteQuery(insertSql);
            })
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                reject(err);
            })
    })
}

exports.refreshAccessToken = (refreshToken) => {
   
   
   
    return new Promise((resolve, reject) => {
        var sql = `SELECT *  FROM users_refresh_token where refresh_token =  '${refreshToken}'`;
       
        db.excuteQuery(sql)
            .then((data) => {
                var countRow1 = data.length;
                if (countRow1 >0) {
                    var sqlnext = `select * from users where user_id = ${data[0].user_id}`;
                   return db.excuteQuery(sqlnext)                   
                } else {
                    reject(null);
                }           
            })
            .then((data) => {
                var rowRow2 = data.length;
                if (rowRow2 > 0) {
                    resolve(this.generateAccessToken(data));
                }
            })
            .catch((err) => {
                reject(err);
            })
    })
}

exports.verifyAccessToken = (req, res, next) => {
    var token = req.headers['x-access-token'];
    console.log(token);

    if (token) {
        jwt.verify(token, SECRET_KEY, (err, payload) => {
            if (err) {
                res.statusCode = 401;
                res.json({
                    msg: 'INVALID TOKEN',
                    error: err
                })
            } else {
                req.token_payload = payload;
                next();
            }
        });
    } else {
        res.statusCode = 403;
        res.json({
            msg: 'NO_TOKEN'
        })
    }
}

exports.checkRefreshToken = (refreshToken) => {
    let sql = `select * from user_refresh_token where refresToken = '${refreshToken}'`;
    return db.excuteQuery(sql);
}