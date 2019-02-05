const AssistantV2 = require('watson-developer-cloud/assistant/v2');

var assistant = new AssistantV2({
    version: '2018-11-08',
    username: 'apikey',
    password: 'kdZ70f7NLVM4NFtgXKoU8pax4sQQxa6CjNpvHN8UZ-hi',
    url:'https://gateway.watsonplatform.net/assistant/api'
  });

const assistantId = "cdad6538-b694-44bd-bd4a-664917fd9b0d";

  var newContext = {
    global : {
      system : {
        turn_count : 1
      }
    }
  };

function postIniciarSessao(req, res) {
    assistant.createSession({
        assistant_id: assistantId
      }, function(err, result) {
        if (err) {
            return res.status(500)
            .json(err);
        }
        return res.status(200)
        .json(result);
      });
}

function postMensagem(req, res) {
    assistant.message(
        {
          input: { text: req.body.input.text },
          assistant_id: assistantId,
          session_id: req.body.session_id,
        },
        function(err, result) {
            console.log(req.body.input.text)
          if (err) {
            return res.status(500)
                .json(err);
          } else {
            return res.status(200)
                .json(result);
          }
        }
      );
};

module.exports = {
    postMensagem:postMensagem,
    postIniciarSessao:postIniciarSessao
};