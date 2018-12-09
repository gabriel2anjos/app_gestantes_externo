var express = require('express');
var router = express.Router();
var app = express();
var db = require('./queries');

app.get('/', homePage);
app.get('/gestante/:uid?', db.getAllGestantes);
// app.get('status-ass-verso');
// app.get('regiao-saude');
// app.get('cidade');
// app.get('cod-ibge-uf');
// app.get('distrito');
// app.get('tipo-coleta');
// app.get('status-coleta');
// app.get('tipo-origem');
// app.get('origem');
// app.get('coleta');
// app.get('status-reconvocacao');
// app.get('motivo-reconvocacao');
// app.get('reconvocacao');
// app.get('tipo-parametro-exame-triagem');
// app.get('material-coleta');
// app.get('parametro-origem-triagem');
// app.get('doenca');
// app.get('exame-confirmatorio');
// app.get('parametro-exame-confirmatorio');
// app.get('cod-item-exame-conf');
// app.get('item-parametro-exame-conf');
// app.get('lote-coleta');
// app.get('ano-referencia');
// app.get('ref-mensal');
// app.get('status-ref-mensal');
// app.get('resultado-texto');
// app.get('obs-reconvocacao');
// app.get('exame-triagem');

function homePage(req, res, next) {
    res.status(200);
    res.json({
        status:"OK",
    })
}

var server = app.listen(3001, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})