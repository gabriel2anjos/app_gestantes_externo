var promise = require('bluebird');
var index = require('./constants');
var options = {
  // Initialization Options
  promiseLib: promise
};



function invalidKey(req, res, next){
    res.status(401)
    .json({
        status:"Chave secreta invalida",
    });
}

var pgp = require('pg-promise')(options);
const cn = {
    host: 'ppn_go.postgresql.dbaas.com.br',
    port: 5432,
    database: 'ppn_go',
    user: 'ppn_go',
    password: 'Fh1Lu2Dilm@'
};
var db = pgp(cn);

// add query functions


function getAllGestantes(req, res, next) {
    // if(req.headers['token']==index.SECRET_KEY){
    if(true){
        let op = 'select * from gestante where cnsgestante=CAST('+(req.query['cnsgestante']).toString()+' AS VARCHAR)'
        console.log(op);
        db.any(op)
        .then(function (data) {
            res.status(200)
            .json(data[0]);
        })
        .catch(function (err) {
            console.log(err);
            return next(err);
        });
    }
    else{
        invalidKey(req, res, next);
    }
  }

  module.exports = {
    getAllGestantes: getAllGestantes,
  };