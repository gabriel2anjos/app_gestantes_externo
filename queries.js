var promise = require('bluebird');
var index = require('./constants');

noToken = true;

var options = {
    // Initialization Options
    promiseLib: promise
};



function invalidKey(res) {
    res.status(401)
        .json({
            status: "Chave secreta invalida",
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
    if (req.headers['token'] == index.SECRET_KEY || noToken) {
        let op = "SELECT * FROM gestante ";
        let query = req.query;
        let queryLength = Object.keys(query).length
        let uid = req.params.uid;
        if (uid) {
            op += " WHERE codgestante=CAST(" + uid + " AS INTEGER)";
        }
        else if (query) {
            op+="WHERE ";
            if (query['nomegestante']) {
                op +=" nomegestante ILIKE '%"+query['nomegestante']+"%' AND";
            }
            if (query['cnsgestante']) {
                op +=" cnsgestante=CAST(" + query['cnsgestante'] + " AS VARCHAR) AND";
            }
            if (op.slice(-4)==' AND'){
                op = op.slice(-0,-4);
            }
            if (op.slice(-6)=='WHERE '){
                op = op.slice(-0,-6);
            }
        }
        db.any(op)
            .then(function (data) {
                res.status(200)
                    .json(data);
            })
            .catch(function (err) {
                console.log(err);
                return next(err);
            });
    }
    else {
        invalidKey(res);
    }
}

module.exports = {
    getAllGestantes: getAllGestantes,
};