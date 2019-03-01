// var index = require('./constants');

// function postTokenDB(req, res, next) {
//   if (req.headers['token'] == index.SECRET_KEY || noToken) {
//     const db = req.app.locals.db;
//     //Pegar tudo na colecao
//     db.collection('tokens').find({}).toArray(function(err, result) {
//       if (err) throw err;
//       console.log(result);
//       return res.status(200).json(result);
//     });
//   }
//   else {
//     invalidKey(res);
//   }
// }

// module.exports = {
//     getAllFaqItems: getAllFaqItems,
//     postFaqItem: postFaqItem,
//   }