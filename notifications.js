var FCM = require('fcm-node');
var serverKey = 'AAAAZ6eXeoc:APA91bHa1lvdqfg8JhTEax6ig4iTdxEyT1KkkepFnVCPNpJRxNq_0ABqvV_seGVKGf-IUPQ5rwZNi8HF_qD3mb0sTXsugd-qAe7zfjcg1t8BF3PwR_x8byhHVuZlqKccxAiiLAJlMQD0'; //put your server key here
var fcm = new FCM(serverKey);

function sendNotification(notificacao, gestante, coleta){
    let titulo, corpo;
    let enviar = true;
    let statuscoleta = coleta.statuscoleta_codstatuscoleta
    if (notificacao.tipo_notificacao == 1){
        titulo = "Novo exame registrado";
        corpo = "Sua coleta foi recebida!";
        enviar = true;
    }
    else if(notificacao.tipo_notificacao == 2){
        titulo = "Atualização de exame";
        enviar = true;
        if (statuscoleta == 9){
            corpo = "Sua coleta teve problemas! Entre em contato com o posto!"
        }
        else if (statuscoleta == 6){
            corpo = "Seus exames estão prontos! Acesse o app para saber mais."
        }
        else{
            enviar = false;
        }
    }
    if (gestante.fcm_token == null || gestante.fcm_token==""){
        enviar = false;
    }
    if (enviar){
        var message = {
            to: gestante.fcm_token, 
            
            notification: {
                title: titulo, 
                body: corpo
            },
        };
        
        fcm.send(message, function(err, response){
            if (err) {
                console.log("Something has gone wrong!");
            } else {
                console.log("Successfully sent with response: ", response);
            }
        });
    }
}

module.exports = {
    sendNotification: sendNotification,
}
