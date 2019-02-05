var express = require('express');
var router = express.Router();
var cors = require('cors')
var app = express();
var bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

var db = require('./queries');
var pass = require('./passwords');
var cb = require ('./chatbot')



app.get('/', homePage);
// app.get('/ativacao/:uid?', db.getAtivarContaGestante);
app.get('/gestante/:uid?', db.getAllGestantes).patch('/gestante/:uid', db.patchGestantes);
// app.post('/gestante/senha/:uid?', db.postSenhaGestante);
// app.post('/gestante/login/:uid?', db.postLoginGestante);
app.get('/status-ass-verso/:uid?', db.getAllStatusAssVerso);
app.get('/regiao-saude/:uid?', db.getAllRegiaoSaude);
app.get('/cidade/:uid?', db.getAllCidade);
app.get('/cod-ibge-uf/:uid?', db.getAllCodIbgeUf);
app.get('/distrito/:uid?', db.getAllDistrito);
app.get('/tipo-coleta/:uid?', db.getAllTipoColeta);
app.get('/status-coleta/:uid?', db.getAllStatusColeta);
app.get('/tipo-origem/:uid?', db.getAllTipoOrigem);
app.get('/origem/:uid?', db.getAllOrigem);
app.get('/coleta/:uid?', db.getAllColeta);
app.get('/status-reconvocacao/:uid?', db.getAllStatusReconvocacao);
app.get('/motivo-reconvocacao/:uid?', db.getAllMotivoReconvocacao);
app.get('/reconvocacao/:uid?', db.getAllReconvocacao);
app.get('/tipo-parametro-exame-triagem/:uid?', db.getAllTipoParametroExameTriagem);
app.get('/material-coleta/:uid?', db.getAllMaterialColeta);
app.get('/parametro-exame-triagem/:uid?', db.getAllParametroExameTriagem);
app.get('/doenca/:uid?', db.getAllDoenca);
app.get('/exame-confirmatorio/:uid?', db.getAllExameConfirmatorio);
app.get('/parametro-exame-confirmatorio/:uid?', db.getAllParametroExameConfirmatorio);
app.get('/cod-item-exame-conf/:uid?', db.getAllCodItemExameConf);
app.get('/item-parametro-exame-conf/:uid?', db.getAllItemParametroExameConf);
app.get('/lote-coleta/:uid?', db.getAllLoteColeta);
app.get('/ano-referencia/:uid?', db.getAllAnoReferencia);
app.get('/ref-mensal/:uid?', db.getAllRefMensal);
app.get('/status-ref-mensal/:uid?', db.getAllStatusRefMensal);
app.get('/resultado-texto/:uid?', db.getAllResultadoTexto);
app.get('/obs-reconvocacao/:uid?', db.getAllObsReconvocacao);
app.get('/exame-triagem/:uid?', db.getAllExameTriagem);
app.post('/mensagem/', cb.postMensagem);
app.post('/mensagem/iniciar-sessao/', cb.postIniciarSessao);
app.get('*', function(req, res){
    res.send(404);
  });



function homePage(req, res, next) {
    res.status(200);
    res.json({
        status:"OK",
    })
}

var server = app.listen(29616, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})
