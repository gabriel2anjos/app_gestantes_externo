var index = require('./constants');
var ObjectId = require('mongodb').ObjectID;
function invalidKey(res) {
  res.status(401)
      .json({
          status: "Chave secreta invalida",
      });
}

function getAllFaqItems(req, res, next) {
  if (req.headers['token'] == index.SECRET_KEY || noToken) {
    const db = req.app.locals.db;
    //Pegar tudo na colecao
    try{
    db.collection('itens_faq').find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      return res.status(200).json(result);
    });}
    catch(e){
      return res.status(500).send("Erro");
    }
  }
  else {
    invalidKey(res);
  }
}


function postDiaCalendario(req, res, next) {
  if (req.headers['token'] == index.SECRET_KEY || noToken) {
    const db = req.app.locals.db;
    let body = req.body;
    //Pegar tudo na colecao
    try{
    db.collection('dias_calendario').insertOne(body, function(err, result) {
      if (err) throw err;
      return res.status(200).json({"id":result.insertedId});
    });
  }
    catch(e){
      return res.status(500).send("Erro");
    }
  }
  else {
    invalidKey(res);
  }
}

function getDiaCalendario(req, res, next) {
  if (req.headers['token'] == index.SECRET_KEY || noToken) {
    const db = req.app.locals.db;
    let query = req.query;
    let uid = req.params.uid;
    try{
    if (uid) {
     query = {_id:ObjectId(req.params.uid)};
     db.collection('dias_calendario').findOne(query)
    .then(item => {
      return res.status(200).json(item);
    });
    }
    else{
    //Pegar tudo na colecao
      db.collection('dias_calendario').find(query)
      .toArray()
      .then(items => {
        return res.status(200).json(items);
      });
    }
  }
  catch(e){
    return res.status(500).send("Erro");
  }
  }
  else {
    invalidKey(res);
  }
}


function patchDiaCalendario(req, res, next) {
  if (req.headers['token'] == index.SECRET_KEY || noToken) {
    const db = req.app.locals.db;
    let body = req.body;
    let uid = req.params.uid;
    if (!uid) {
      return res.status(404).json({"Erro":"Sem uid"});
    }
    // body._id=uid;
    //Pegar tudo na colecao
    try{
    db.collection('dias_calendario').findOneAndUpdate({_id:ObjectId(req.params.uid)}, {$set:body},{returnNewDocument : true }, function (err, result) {
    if(err){
      return res.status(500).send("Erro!");
    }
    db.collection('dias_calendario').findOne({_id:ObjectId(req.params.uid)})
    .then(item => {
      return res.status(200).json(item);
    });
  });
  }
  catch(e){
    return res.status(500).send("Erro!");
  }
}
  else {
    invalidKey(res);
  }
}

function deleteDiaCalendario(req, res, next) {
  if (req.headers['token'] == index.SECRET_KEY || noToken) {
    const db = req.app.locals.db;
    let uid = req.params.uid;
    if (!uid) {
      return res.status(404).json({"Erro":"Sem uid"});
    }
    // body._id=uid;
    //Pegar tudo na colecao
    try{
    db.collection('dias_calendario').deleteOne({_id:ObjectId(req.params.uid)},function (err, result) {
    if(err){
      return res.status(500).send("Erro!");
    }
      return res.status(200).json({"Status":"Deletado"});
  });
  }
  catch(e){
    return res.status(500).send("Erro!");
  }
}
  else {
    invalidKey(res);
  }
}

module.exports = {
  getAllFaqItems: getAllFaqItems,
  postDiaCalendario: postDiaCalendario,
  getDiaCalendario: getDiaCalendario,
  patchDiaCalendario: patchDiaCalendario,
  deleteDiaCalendario: deleteDiaCalendario,
}