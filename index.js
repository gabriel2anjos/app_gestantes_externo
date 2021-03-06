var express = require('express');
var router = express.Router();
var cors = require('cors')
var app = express();
var bodyParser = require('body-parser')
var MongoClient = require('mongodb').MongoClient;
var mongo_url = "mongodb://gestantes:NSWFpj17@127.0.0.1/gestantes";


app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

var dbe = require('./queries');
var pass = require('./passwords');
var cb = require ('./chatbot')
var dbm = require('./mongodb')

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, PATCH, DELETE, OPTIONS');
    next();
  });

app.get('/', homePage);
app.get('/gestante/:uid?', dbe.getAllGestantes)
.patch('/gestante/:uid', dbe.patchGestantes);
app.post('/senha/gestante/:uid?', dbe.postSenhaGestante);
app.post('/login/gestante/:uid?', dbe.postLoginGestante);
app.get('/esqueci-minha-senha/:uid', dbe.getRecuperarSenhaGestante);
app.get('/ativar-recuperar-senha/gestante/:uid', dbe.getAtivarRecuperacaoSenhaGestante);
app.get('/status-ass-verso/:uid?', dbe.getAllStatusAssVerso);
app.get('/regiao-saude/:uid?', dbe.getAllRegiaoSaude);
app.get('/cidade/:uid?', dbe.getAllCidade);
app.get('/cod-ibge-uf/:uid?', dbe.getAllCodIbgeUf);
app.get('/distrito/:uid?', dbe.getAllDistrito);
app.get('/tipo-coleta/:uid?', dbe.getAllTipoColeta);
app.get('/status-coleta/:uid?', dbe.getAllStatusColeta);
app.get('/tipo-origem/:uid?', dbe.getAllTipoOrigem);
app.get('/origem/:uid?', dbe.getAllOrigem)
.patch('/origem/:uid', dbe.patchOrigem);
app.post('/senha/origem/:uid?', dbe.postSenhaOrigem);
app.post('/login/origem/:uid?', dbe.postLoginOrigem);
app.get('/esqueci-minha-senha/origem/:uid', dbe.getRecuperarSenhaOrigem);
app.get('/ativar-recuperar-senha/origem/:uid', dbe.getAtivarRecuperacaoSenhaOrigem);
app.get('/coleta/:uid?', dbe.getAllColeta);
app.get('/status-reconvocacao/:uid?', dbe.getAllStatusReconvocacao);
app.get('/motivo-reconvocacao/:uid?', dbe.getAllMotivoReconvocacao);
app.get('/reconvocacao/:uid?', dbe.getAllReconvocacao);
app.get('/tipo-parametro-exame-triagem/:uid?', dbe.getAllTipoParametroExameTriagem);
app.get('/material-coleta/:uid?', dbe.getAllMaterialColeta);
app.get('/parametro-exame-triagem/:uid?', dbe.getAllParametroExameTriagem);
app.get('/doenca/:uid?', dbe.getAllDoenca);
app.get('/exame-confirmatorio/:uid?', dbe.getAllExameConfirmatorio);
app.get('/parametro-exame-confirmatorio/:uid?', dbe.getAllParametroExameConfirmatorio);
app.get('/cod-item-exame-conf/:uid?', dbe.getAllCodItemExameConf);
app.get('/item-parametro-exame-conf/:uid?', dbe.getAllItemParametroExameConf);
app.get('/lote-coleta/:uid?', dbe.getAllLoteColeta);
app.get('/ano-referencia/:uid?', dbe.getAllAnoReferencia);
app.get('/ref-mensal/:uid?', dbe.getAllRefMensal);
app.get('/status-ref-mensal/:uid?', dbe.getAllStatusRefMensal);
app.get('/resultado-texto/:uid?', dbe.getAllResultadoTexto);
app.get('/obs-reconvocacao/:uid?', dbe.getAllObsReconvocacao);
app.get('/exame-triagem/:uid?', dbe.getAllExameTriagem);
app.post('/mensagem/', cb.postMensagem);
app.post('/mensagem/iniciar-sessao/', cb.postIniciarSessao);
//mongo
app.get('/mongo/itens-faq/', dbm.getAllFaqItems);
app.post('/mongo/dia-calendario', dbm.postDiaCalendario);
app.get('/mongo/dia-calendario/:uid?', dbm.getDiaCalendario)
.patch('/mongo/dia-calendario/:uid', dbm.patchDiaCalendario)
.delete('/mongo/dia-calendario/:uid', dbm.deleteDiaCalendario);

app.get('*', function(req, res){
    res.send(404);
  });



app.get('*', function(req, res){
    res.send(404);
  });




function homePage(req, res, next) {
    res.status(200);
    res.json({
        status:"OK",
    })
}
MongoClient.connect(mongo_url).then(client =>{
    const db = client.db('gestantes');
    app.locals.db = db;
    var server = app.listen(17221,'127.0.0.1', function () {
        var host = server.address().address
        var port = server.address().port
        console.log("Example app listening at http://%s:%s", host, port)
    });
});

