var promise = require('bluebird');
var index = require('./constants');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const nodemailer = require('nodemailer');
const url_recuperar = "appgestantes.polijr.com.br/api/externo/esqueci-minha-senha/"
const notif =  require('./notifications');
const path = require('path');

let senhaFixaPosto = "aNg_8(EdoW6gpsircd@C";

noToken = true;
confirmacaoEmail = false;

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
    password: 'R@g761206'
};
var db = pgp(cn);

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'appgestantes@polijunior.com.br',
        pass: 'appGestantes2019#'
    }
});






// add query functions


function getAllGestantes(req, res, next) {
    if (req.headers['token'] == index.SECRET_KEY || noToken) {
        let op = "SELECT * FROM gestante ";
        let query = req.query;
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
                data.forEach((e)=>{
                    delete e.senha_hash;
                    delete e.senha_salt;
                });
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

function patchGestantes(req, res, next){
    if (req.headers['token'] == index.SECRET_KEY || noToken) {
        let op = "UPDATE gestante SET ";
        let body = req.body;
        let uid = req.params.uid;
        let flag = 0;
        if (uid) {
            for (var chave in body){
                if (chave == 'celulargestante'){
                    flag = 1;
                    let valor = body[chave];
                    op+="celulargestante='"+valor+"', ";
                }
                else if (chave == 'emailgestante'){
                    flag = 1;
                    let valor = body[chave];
                    op+="emailgestante='"+valor+"', ";
                }
                else if (chave == 'telefonegestante'){
                    flag = 1;
                    let valor = body[chave];
                    op+="telefonegestante='"+valor+"', ";
                }
                else if (chave == 'rggestante'){
                    flag = 1;
                    let valor = body[chave];
                    op+="rggestante='"+valor+"', ";
                }
                else if (chave == 'tiposangabogestante'){
                    console.log("AQWI")
                    flag = 1;
                    let valor = body[chave];
                    op+="tiposangabogestante='"+valor+"', ";
                }
                else if (chave == 'fatorrhgestante'){
                    console.log("AQWI")
                    flag = 1;
                    let valor = body[chave];
                    op+="fatorrhgestante='"+valor+"', ";
                }
            }
            if(!flag){
                return res.status(500).json({status:"Nenhum parametro passado"});
            }
            else{
                if (op.slice(-2)==', '){
                    op = op.slice(-0,-2);
                }
                op += " WHERE codgestante=CAST(" + uid + " AS INTEGER)";
                console.log(op)
                db.any(op)
                .then(function (data) {
                    res.status(200)
                        .json({status:"Escrito"});
                })
                .catch(function (err) {
                    console.log(err);
                    return next(err);
                });
            }
        }
    }
    else {
        invalidKey(res);
    }
}

function getAllStatusAssVerso(req, res, next) {
    if (req.headers['token'] == index.SECRET_KEY || noToken) {
        let op = "SELECT * FROM statusassverso ";
        let query = req.query;
        let uid = req.params.uid;
        if (uid) {
            op += " WHERE codstatusassverso=CAST(" + uid + " AS INTEGER)";
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

function getAllRegiaoSaude(req, res, next) {
    if (req.headers['token'] == index.SECRET_KEY || noToken) {
        let op = "SELECT * FROM regiaosaude ";
        let query = req.query;
        let uid = req.params.uid;
        if (uid) {
            op += " WHERE codregiaosaude=CAST(" + uid + " AS INTEGER)";
        }
        else if (query) {
            op+="WHERE ";
            if (query['regiaosaude']) {
                op +=" regiaosaude ILIKE '%"+query['regiaosaude']+"%' AND";
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

function getAllCidade(req, res, next) {
    if (req.headers['token'] == index.SECRET_KEY || noToken) {
        let op = "SELECT * FROM cidade ";
        let query = req.query;
        let uid = req.params.uid;
        if (uid) {
            op += " WHERE codibgecidade=CAST(" + uid + " AS INTEGER)";
        }
        else if (query) {
            op+="WHERE ";
            if (query['nomecidade']) {
                op +=" nomecidade ILIKE '%"+query['nomecidade']+"%' AND";
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

function getAllCodIbgeUf(req, res, next) {
    if (req.headers['token'] == index.SECRET_KEY || noToken) {
        let op = "SELECT * FROM uf ";
        let query = req.query;
        let uid = req.params.uid;
        if (uid) {
            op += " WHERE codibgeuf=CAST(" + uid + " AS INTEGER)";
        }
        else if (query) {
            op+="WHERE ";
            if (query['nomeuf']) {
                op +=" nomeuf ILIKE '%"+query['nomeuf']+"%' AND";
            }
            if (query['siglauf']) {
                op +=" siglauf=CAST(" + query['siglauf'] + " AS VARCHAR) AND";
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

function getAllDistrito(req, res, next) {
    if (req.headers['token'] == index.SECRET_KEY || noToken) {
        let op = "SELECT * FROM distrito ";
        let query = req.query;
        let uid = req.params.uid;
        if (uid) {
            op += " WHERE coddistrito=CAST(" + uid + " AS INTEGER)";
        }
        else if (query) {
            op+="WHERE ";
            if (query['nomedistrito']) {
                op +=" nomedistrito ILIKE '%"+query['nomedistrito']+"%' AND";
            }
            if (query['codibgecidade']) {
                op +=" codibgecidade=CAST(" + query['codibgecidade'] + " AS VARCHAR) AND";
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

function getAllTipoColeta(req, res, next) {
    if (req.headers['token'] == index.SECRET_KEY || noToken) {
        let op = "SELECT * FROM tipocoleta ";
        let query = req.query;
        let uid = req.params.uid;
        if (uid) {
            op += " WHERE codtipocoleta=CAST(" + uid + " AS INTEGER)";
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

function getAllStatusColeta(req, res, next) {
    if (req.headers['token'] == index.SECRET_KEY || noToken) {
        let op = "SELECT * FROM statuscoleta ";
        let query = req.query;
        let uid = req.params.uid;
        if (uid) {
            op += " WHERE codstatuscoleta=CAST(" + uid + " AS INTEGER)";
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
    else {data.forEach((e)=>{
        delete e.senha_hash;
        delete e.senha_salt;
    });
        invalidKey(res);
    }
}

function getAllTipoOrigem(req, res, next) {
    if (req.headers['token'] == index.SECRET_KEY || noToken) {
        let op = "SELECT * FROM tipoorigem ";
        let query = req.query;
        let uid = req.params.uid;
        if (uid) {
            op += " WHERE codtipoorigem=CAST(" + uid + " AS INTEGER)";
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

function getAllOrigem(req, res, next) {
    if (req.headers['token'] == index.SECRET_KEY || noToken) {
        let op = "SELECT * FROM origem ";
        let query = req.query;
        let uid = req.params.uid;
        if (uid) {
            op += " WHERE codorigem=CAST(" + uid + " AS INTEGER)";
        }
        db.any(op)
            .then(function (data) {
                data.forEach((e)=>{
                    delete e.senha_hash;
                    delete e.senha_recover;
                });
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

function getAllColeta(req, res, next) {
    if (req.headers['token'] == index.SECRET_KEY || noToken) {
        let op = "SELECT * FROM coleta ";
        let query = req.query;
        let uid = req.params.uid;
        if (uid) {
            op += " WHERE codcoleta=CAST(" + uid + " AS INTEGER)";
        }
        else if (query) {
            op+="WHERE ";
            if (query['codgestante']) {
                op +=" gestante_codgestante=CAST(" + query['codgestante'] + " AS INTEGER) AND";
            }
            if (query['codlotecoleta']) {
                op +=" lotecoleta_codlotecoleta=CAST(" + query['codlotecoleta'] + " AS INTEGER) AND";
            }
            if (query['codorigem']) {
                op +=" origem_codorigem=CAST(" + query['codorigem'] + " AS INTEGER) AND";
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

function getAllStatusReconvocacao(req, res, next) {
    if (req.headers['token'] == index.SECRET_KEY || noToken) {
        let op = "SELECT * FROM statusreconvocacao ";
        let query = req.query;
        let uid = req.params.uid;
        if (uid) {
            op += " WHERE codstatusreconvocacao=CAST(" + uid + " AS INTEGER)";
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

function getAllMotivoReconvocacao(req, res, next) {
    if (req.headers['token'] == index.SECRET_KEY || noToken) {
        let op = "SELECT * FROM motivoreconvocacao ";
        let query = req.query;
        let uid = req.params.uid;
        if (uid) {
            op += " WHERE codmotivoreconvocacao=CAST(" + uid + " AS INTEGER)";
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

function getAllReconvocacao(req, res, next) {
    if (req.headers['token'] == index.SECRET_KEY || noToken) {
        let op = "SELECT * FROM reconvocacao ";
        let query = req.query;
        let uid = req.params.uid;
        if (uid) {
            op += " WHERE codreconvocacao=CAST(" + uid + " AS INTEGER)";
        }
        else if (query) {
            op+="WHERE ";
            if (query['codcoleta']) {
                op +=" coleta_codcoleta=CAST(" + query['codcoleta'] + " AS INTEGER) AND";
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

function getAllTipoParametroExameTriagem(req, res, next) {
    if (req.headers['token'] == index.SECRET_KEY || noToken) {
        let op = "SELECT * FROM tipoparametroexametriagem ";
        let query = req.query;
        let uid = req.params.uid;
        if (uid) {
            op += " WHERE codtipoparametroexametriagem=CAST(" + uid + " AS INTEGER)";
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

function getAllMaterialColeta(req, res, next) {
    if (req.headers['token'] == index.SECRET_KEY || noToken) {
        let op = "SELECT * FROM materialcoleta ";
        let query = req.query;
        let uid = req.params.uid;
        if (uid) {
            op += " WHERE codmaterialcoleta=CAST(" + uid + " AS INTEGER)";
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

function getAllParametroExameTriagem(req, res, next) {
    if (req.headers['token'] == index.SECRET_KEY || noToken) {
        let op = "SELECT * FROM parametroexametriagem ";
        let query = req.query;
        let uid = req.params.uid;
        if (uid) {
            op += " WHERE codparametroexametriagem=CAST(" + uid + " AS INTEGER)";
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

function getAllDoenca(req, res, next) {
    if (req.headers['token'] == index.SECRET_KEY || noToken) {
        let op = "SELECT * FROM doenca ";
        let query = req.query;
        let uid = req.params.uid;
        if (uid) {
            op += " WHERE coddoenca=CAST(" + uid + " AS INTEGER)";
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

function getAllExameConfirmatorio(req, res, next) {
    if (req.headers['token'] == index.SECRET_KEY || noToken) {
        let op = "SELECT * FROM exameconfirmatorio ";
        let query = req.query;
        let uid = req.params.uid;
        if (uid) {
            op += " WHERE codexameconfirmatorio=CAST(" + uid + " AS INTEGER)";
        }
        else if (query) {
            op+="WHERE ";
            if (query['codcoleta']) {
                op +=" coleta_codcoleta=CAST(" + query['codcoleta'] + " AS INTEGER) AND";
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

function getAllParametroExameConfirmatorio(req, res, next) {
    if (req.headers['token'] == index.SECRET_KEY || noToken) {
        let op = "SELECT * FROM parametroexameconfirmatorio ";
        let query = req.query;
        let uid = req.params.uid;
        if (uid) {
            op += " WHERE codparametroexameconfirmatorio=CAST(" + uid + " AS INTEGER)";
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

function getAllCodItemExameConf(req, res, next) {
    if (req.headers['token'] == index.SECRET_KEY || noToken) {
        let op = "SELECT * FROM itemexameconf ";
        let query = req.query;
        let uid = req.params.uid;
        if (uid) {
            op += " WHERE coditemexameconf=CAST(" + uid + " AS INTEGER)";
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

function getAllItemParametroExameConf(req, res, next) {
    if (req.headers['token'] == index.SECRET_KEY || noToken) {
        let op = "SELECT * FROM itemparametroexameconf ";
        let query = req.query;
        let uid = req.params.uid;
        if (uid) {
            op += " WHERE coditemparametroexameconf=CAST(" + uid + " AS INTEGER)";
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

function getAllLoteColeta(req, res, next) {
    if (req.headers['token'] == index.SECRET_KEY || noToken) {
        let op = "SELECT * FROM lotecoleta ";
        let query = req.query;
        let uid = req.params.uid;
        if (uid) {
            op += " WHERE codlotecoleta=CAST(" + uid + " AS INTEGER)";
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

function getAllAnoReferencia(req, res, next) {
    if (req.headers['token'] == index.SECRET_KEY || noToken) {
        let op = "SELECT * FROM anoreferencia ";
        let query = req.query;
        let uid = req.params.uid;
        if (uid) {
            op += " WHERE codanoreferencia=CAST(" + uid + " AS INTEGER)";
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

function getAllRefMensal(req, res, next) {
    if (req.headers['token'] == index.SECRET_KEY || noToken) {
        let op = "SELECT * FROM refmensal ";
        let query = req.query;
        let uid = req.params.uid;
        if (uid) {
            op += " WHERE codrefmensal=CAST(" + uid + " AS INTEGER)";
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

function getAllStatusRefMensal(req, res, next) {
    if (req.headers['token'] == index.SECRET_KEY || noToken) {
        let op = "SELECT * FROM statusrefmensal ";
        let query = req.query;
        let uid = req.params.uid;
        if (uid) {
            op += " WHERE codstatusrefmensal=CAST(" + uid + " AS INTEGER)";
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

function getAllResultadoTexto(req, res, next) {
    if (req.headers['token'] == index.SECRET_KEY || noToken) {
        let op = "SELECT * FROM resultadotexto ";
        let query = req.query;
        let uid = req.params.uid;
        if (uid) {
            op += " WHERE codresultadotexto=CAST(" + uid + " AS INTEGER)";
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

function getAllObsReconvocacao(req, res, next) {
    if (req.headers['token'] == index.SECRET_KEY || noToken) {
        let op = "SELECT * FROM resultadotexto ";
        let query = req.query;
        let uid = req.params.uid;
        if (uid) {
            op += " WHERE codresultadotexto=CAST(" + uid + " AS INTEGER)";
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


function getAllExameTriagem(req, res, next) {
    if (req.headers['token'] == index.SECRET_KEY || noToken) {
        let op = "SELECT * FROM exametriagem ";
        let query = req.query;
        let uid = req.params.uid;
        if (uid) {
            op += " WHERE codexametriagem=CAST(" + uid + " AS INTEGER)";
        }
        else if (query) {
            op+="WHERE ";
            if (query['codcoleta']) {
                op +=" coleta_codcoleta=CAST(" + query['codcoleta'] + " AS INTEGER) AND";
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

function postSenhaGestante(req, res, next){
    if (req.headers['token'] == index.SECRET_KEY || noToken) {
        let op = "UPDATE gestante SET ";
        let body = req.body;
        let senha = "";
        let uid = req.params.uid;
        let flag = 0;
        if (uid) {
            for (var chave in body){
                if (chave == 'password'){
                    flag = 1;
                    senha = body[chave];
                }
            }
            if(!flag){
                return res.status(500).json({status:"Nenhum parametro passado"});
            }
            
            else{
                db.any("SELECT * FROM gestante WHERE codgestante=CAST("+uid+" AS INTEGER)").then(function (data) {
                    if (data["emailgestante"]!="") {
                        bcrypt.genSalt(saltRounds).then(function(salt, err_salt) {
                            bcrypt.hash(senha, salt).then(function(hash, err_hash) {
                                let random = Math.random()*10000000000000000
                                random = Math.round(random);
                                op+="senha_hash='"+hash+"', ";
                                if (!confirmacaoEmail) op+="email_ativo=true, ";
                                op+="senha_salt='"+random+"'";
                                op += " WHERE codgestante=CAST(" + uid + " AS INTEGER)";
                                db.any(op)
                                .then(function (data) {
                                    return res.status(200)
                                        .json({status:"Escrito"});
                                })
                                .catch(function (err) {
                                    console.log(err);
                                    return next(err);
                                });
                        })
                    });
            }
                else{
                    return res.status(500)
                    .json({status:"Precisa antes de um email!"});
                }
            });
        }
        }
    }
    else {
        invalidKey(res);
    }
}

function postLoginGestante(req, res, next){
    if (req.headers['token'] == index.SECRET_KEY || noToken) {
        let body = req.body;
        let uid = req.params.uid;
        let flag = 0;
        if (uid) {
            db.any("SELECT * FROM gestante WHERE codgestante=CAST("+uid+" AS INTEGER)").then(function (data) {

                if (data.length != 0) {
                    if ((data["email_ativo"] || !confirmacaoEmail) && (data[0]["senha_hash"]!=null)){
                        let gestante=data[0];
                        bcrypt.compare(body["password"], gestante["senha_hash"]).then(function(ok) {
                            if (ok){
                                if(body["fcm_token"]){
                                    db.any("UPDATE gestante SET fcm_token='"+body["fcm_token"]+"' WHERE codgestante=CAST("+uid+" AS INTEGER)").then(function(b)
                                    {
                                        return res.status(200)
                                            .json({ status : "Logado como "+ gestante["nomegestante"]+" com token FCM " +body["fcm_token"]} );
                                    }
                                    )
                                }
                                else{
                                    return res.status(200)
                                        .json({ status : "Logado como "+ gestante["nomegestante"]+" sem token FCM"} );
                                }
                            }
                            else {
                                return res.status(400)
                                .json({ status : "Senha invalida"} );
                            }
                        });
                    }
                    else {
                        res.status(500)
                        .json({ status : "Email nao ativado"} );
                    }
                }
                else{
                    return res.status(400)
                    .json({ status : "ID invalido!"} );
                }
        });}
        else {
            res.status(400)
            .json({ status : "Passe um ID"} );
        }
    }
    else {
        invalidKey(res);
    }
}


function getRecuperarSenhaGestante(req, res, next){
    let uid = req.params.uid;
    if (uid){
        let op = "SELECT * FROM gestante WHERE senha_salt='"+uid+"'";
        db.any(op).then(function (data) {
            if (data.length==1){

                db.any("UPDATE gestante SET senha_hash='' WHERE senha_salt='"+uid+"'").then(function (data) {
                    return res.sendfile(path.resolve(__dirname, './templates/paginaLink/senha-recuperada.html'));
            });
            }
            else{
                return res.status(500)
                .json({ status : "Erro"} );
            }
        });
    }
    else {
        return res.status(500)
        .json({ status : "Passe um ID"} );
    }
}   


function getAtivarRecuperacaoSenhaGestante(req, res, next){
    let uid = req.params.uid;
    if (uid){
        let op = "SELECT * FROM gestante WHERE codgestante=CAST("+uid+" AS INTEGER)";
        db.any(op).then(function (data) {
            if (!data[0].emailgestante || data[0].emailgestante==""){
                return res.status(500)
                .json({ status : "Gestante sem email"} );
            }
            else{
                let random = Math.round((Math.random()*1000000000000)).toString()+Math.round((Math.random()*10000000000)).toString()+Math.round((Math.random()*10000000000)).toString();
                let op = "UPDATE gestante SET senha_salt='"+random+"' WHERE codgestante=CAST(" + uid + " AS INTEGER)";
                db.any(op)
                .then(function (dataup) {
                    var mailOptions = {
                        from: "Aplicativo Teste da Mamãe",
                        to: data[0].emailgestante,
                        subject: 'Foi você que esqueceu sua senha?',
                        text: 'Olá!',
                        html:"Para recuperar sua senha acesse o link appgestantes.polijr.com.br/api/externo/esqueci-minha-senha/"+random,
                    };

                    transporter.sendMail(mailOptions, (err) => {

                        if (err) {
                            console.log(err)
                            return res.status(500)
                            .json({ "status" : "Erro ao enviar email!"} );
                        } else {
                            return res.status(200)
                            .json({ "status" : "Email enviado!"} );
                        }

                    });
                }).catch(function (err) {
                    console.log(err)
                    return res.status(500)
                        .json({ status : "Erro ao encontrar gestante!"} );
                });
            }
        });
    }
    else {
        return res.status(500)
        .json({ status : "Passe um ID"} );
    }
}   

function postSenhaOrigem(req, res, next){
    if (req.headers['token'] == index.SECRET_KEY || noToken) {
        let op = "UPDATE origem SET ";
        let body = req.body;
        let senha = "";
        let uid = req.params.uid;
        let flag = 0;
        if (uid) {
            for (var chave in body){
                if (chave == 'password'){
                    flag = 1;
                    senha = body[chave];
                }
            }
            if(!flag){
                return res.status(500).json({status:"Nenhum parametro passado"});
            }
            
            else{
                db.any("SELECT * FROM origem WHERE codorigem=CAST("+uid+" AS INTEGER)").then(function (data) {
                    if (data["emailorigem"]!="" && data["emailorigem"]!="-") {
                        bcrypt.genSalt(saltRounds).then(function(salt, err_salt) {
                            bcrypt.hash(senha, salt).then(function(hash, err_hash) {
                                let random = Math.random()*10000000000000000
                                random = Math.round(random);
                                op+="senha_hash='"+hash+"', ";
                                if (!confirmacaoEmail) op+="email_ativo=true, ";
                                op+="senha_recover='"+random+"'";
                                op += " WHERE codorigem=CAST(" + uid + " AS INTEGER)";
                                db.any(op)
                                .then(function (data) {
                                    return res.status(200)
                                        .json({status:"Escrito"});
                                })
                                .catch(function (err) {
                                    console.log(err);
                                    return next(err);
                                });
                        })
                    });
            }
                else{
                    return res.status(500)
                    .json({status:"Precisa antes de um email!"});
                }
            });
        }
        }
    }
    else {
        invalidKey(res);
    }
}

function postLoginOrigem(req, res, next){
    if (req.headers['token'] == index.SECRET_KEY || noToken) {
        let body = req.body;
        let uid = req.params.uid;
        let flag = 0;
        if (uid) {
            db.any("SELECT * FROM origem WHERE codorigem=CAST("+uid+" AS INTEGER)").then(function (data) {
                if (data.length != 0) {
                    if ((data["email_ativo"] || !confirmacaoEmail) && (data[0]["senha_hash"]!=null)){
                        let origem=data[0];
                        bcrypt.compare(body["password"], origem["senha_hash"]).then(function(ok) {
                            if (ok){
                                    return res.status(200)
                                        .json({ status : "Logado como posto "+ origem["nomeorigem"]} );
                            }
                            else {
                                return res.status(400)
                                .json({ status : "Senha invalida"} );
                            }
                        });
                    }
                    else if (data[0]["senha_hash"]==null && (!data["email_ativo"] || !confirmacaoEmail) ){
                        let origem=data[0];
                        if (body["password"]==senhaFixaPosto) {
                                    return res.status(200)
                                        .json({ status : "Logado como posto "+ origem["nomeorigem"]} );
                            }
                            else {
                                return res.status(400)
                                .json({ status : "Senha invalida"} );
                            }
                        
                    }
                    else {
                        res.status(500)
                        .json({ status : "Email nao ativado"} );
                    }
                }
                else{
                    return res.status(400)
                    .json({ status : "ID invalido!"} );
                }
        });}
        else {
            res.status(400)
            .json({ status : "Passe um ID"} );
        }
    }
    else {
        invalidKey(res);
    }
}


function getRecuperarSenhaOrigem(req, res, next){
    let uid = req.params.uid;
    if (uid){
        let op = "SELECT * FROM origem WHERE senha_recover='"+uid+"'";
        db.any(op).then(function (data) {
            if (data.length==1){
                db.any("UPDATE origem SET senha_hash='' WHERE senha_recover='"+uid+"'").then(function (data) {
                    return res.sendFile('./templaces/paginaLink/senha-recuperada.html');
            });}
            else{
                return res.status(500)
                .json({ status : "Erro"} );
            }
        });
    }
    else {
        return res.status(500)
        .json({ status : "Passe um ID"} );
    }
}   


function getAtivarRecuperacaoSenhaOrigem(req, res, next){
    let uid = req.params.uid;
    if (uid){
        let op = "SELECT * FROM origem WHERE codorigem=CAST("+uid+" AS INTEGER)";
        db.any(op).then(function (data) {
            if (!data[0].emailorigem || data[0].emailorigem==""){
                return res.status(500)
                .json({ status : "Posto sem email"} );
            }
            else{
                let random = Math.round((Math.random()*1000000000000)).toString()+Math.round((Math.random()*10000000000)).toString()+Math.round((Math.random()*10000000000)).toString();
                let op = "UPDATE origem SET senha_recover='"+random+"' WHERE codorigem=CAST(" + uid + " AS INTEGER)";
                db.any(op)
                .then(function (dataup) {
                    console.log(data[0].emailorigem)
                    var mailOptions = {
                        from: "Aplicativo Teste da Mamãe",
                        to: data[0].emailorigem,
                        subject: 'Foi você que esqueceu sua senha?',
                        text: 'Olá!',
                        html:"Para recuperar sua senha acesse o link appgestantes.polijr.com.br/api/externo/esqueci-minha-senha/"+random,
                    };
         
                    transporter.sendMail(mailOptions, (err) => {

                        if (err) {
                            return res.status(500)
                            .json({ "status" : "Erro ao enviar email!"} );
                        } else {
                            return res.status(200)
                            .json({ "status" : "Email enviado!"} );
                        }

                    });
                }).catch(function (err) {
                    return res.status(500)
                        .json({ status : "Erro ao encontrar posto!"} );
                });
            }
        });
    }
    else {
        return res.status(500)
        .json({ status : "Passe um ID"} );
    }
}   

function patchOrigem(req, res, next){
    if (req.headers['token'] == index.SECRET_KEY || noToken) {
        let op = "UPDATE origem SET ";
        let body = req.body;
        let uid = req.params.uid;
        let flag = 0;
        if (uid) {
            for (var chave in body){
                if (chave == 'emailorigem'){
                    flag = 1;
                    let valor = body[chave];
                    op+="emailorigem='"+valor+"', ";
                }
            }
            if(!flag){
                return res.status(500).json({status:"Nenhum parametro passado"});
            }
            else{
                if (op.slice(-2)==', '){
                    op = op.slice(-0,-2);
                }
                op += " WHERE codorigem=CAST(" + uid + " AS INTEGER)";
                console.log(op)
                db.any(op)
                .then(function (data) {
                    res.status(200)
                        .json({status:"Escrito"});
                })
                .catch(function (err) {
                    console.log(err);
                    return next(err);
                });
            }
        }
    }
    else {
        invalidKey(res);
    }
}


function notificationsService(req, res, next){
    db.any("SELECT * FROM notificacoesapp").then(function (notificacoes) {
    notificacoes.forEach((notificacao)=>{
        db.any("SELECT * FROM gestante WHERE codgestante=CAST("+notificacao.codgestante_gestante+" AS INTEGER)").then(function (gestante) {
        db.any("SELECT * FROM coleta WHERE codcoleta=CAST("+notificacao.codcoleta_coleta+" AS INTEGER)").then(function (coleta) {
        console.log(gestante[0])
        notif.sendNotification(notificacao, gestante[0], coleta[0]);
        db.any("DELETE FROM notificacoesapp WHERE id=CAST("+notificacao.id+" AS INTEGER)");
        });
        });
    });
});
}   

setInterval(notificationsService, 120000); 

module.exports = {
    getAllGestantes: getAllGestantes,
    patchGestantes: patchGestantes,
    getAllStatusAssVerso: getAllStatusAssVerso,
    getAllRegiaoSaude: getAllRegiaoSaude,
    getAllCidade: getAllCidade,
    getAllCodIbgeUf: getAllCodIbgeUf,
    getAllDistrito: getAllDistrito,
    getAllTipoColeta: getAllTipoColeta,
    getAllStatusColeta: getAllStatusColeta,
    getAllTipoOrigem: getAllTipoOrigem,
    getAllOrigem: getAllOrigem,
    getAllColeta: getAllColeta,
    getAllStatusReconvocacao: getAllStatusReconvocacao,
    getAllMotivoReconvocacao: getAllMotivoReconvocacao,
    getAllReconvocacao: getAllReconvocacao,
    getAllTipoParametroExameTriagem: getAllTipoParametroExameTriagem,
    getAllMaterialColeta: getAllMaterialColeta,
    getAllParametroExameTriagem: getAllParametroExameTriagem,
    getAllDoenca: getAllDoenca,
    getAllExameConfirmatorio: getAllExameConfirmatorio,
    getAllParametroExameConfirmatorio: getAllParametroExameConfirmatorio,
    getAllCodItemExameConf: getAllCodItemExameConf,
    getAllItemParametroExameConf: getAllItemParametroExameConf,
    getAllLoteColeta: getAllLoteColeta,
    getAllAnoReferencia: getAllAnoReferencia,
    getAllRefMensal: getAllRefMensal,
    getAllStatusRefMensal: getAllStatusRefMensal,
    getAllResultadoTexto: getAllResultadoTexto,
    getAllObsReconvocacao: getAllObsReconvocacao,
    getAllExameTriagem: getAllExameTriagem,
    postSenhaGestante: postSenhaGestante,
    postLoginGestante: postLoginGestante,   
    getRecuperarSenhaGestante: getRecuperarSenhaGestante,
    getAtivarRecuperacaoSenhaGestante : getAtivarRecuperacaoSenhaGestante,
    postSenhaOrigem: postSenhaOrigem,
    postLoginOrigem: postLoginOrigem,   
    getRecuperarSenhaOrigem: getRecuperarSenhaOrigem,
    getAtivarRecuperacaoSenhaOrigem : getAtivarRecuperacaoSenhaOrigem,
    patchOrigem : patchOrigem
};
