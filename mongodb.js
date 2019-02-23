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
    db.collection('itens_faq').find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      return res.status(200).json(result);
    });
  }
  else {
    invalidKey(res);
  }
}

function postFaqItem(req, res, next) {
  if (req.headers['token'] == index.SECRET_KEY || noToken) {
    const db = req.app.locals.db;
    //Pegar tudo na colecao
    db.collection('itens_faq').find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      return res.status(200).json(result);
    });
  }
  else {
    invalidKey(res);
  }
}

module.exports = {
  getAllFaqItems: getAllFaqItems,
  postFaqItem: postFaqItem
}