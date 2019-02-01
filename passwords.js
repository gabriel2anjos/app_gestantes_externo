// const bcrypt = require('bcrypt');
// const saltRounds = 10;

// //As senhas sao hasheadas e somadas com o salt. No Db temos um campo pro Salt, e um pro Salt+Hash nessa ordem. Respectivos tamanhos:29 bytes, 60 bytes

// let hash;

// let genSalt = bcrypt.genSalt(saltRounds, function(err, salt) {
//     bcrypt.hash("gabilu00adsadasdasdassas", salt, function(err, hash) {
//         console.log(salt);
//         console.log(hash);
//         hash = hash;
//         console.log("aq")
// bcrypt.compare("gabilu00a", hash, function(err, res) {
//     console.log(res)
// });

//     });
// });



// module.exports = {
//     genSalt : genSalt,

// };