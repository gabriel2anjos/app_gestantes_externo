var watson = require('watson-developer-cloud')

var assistant = new watson.AssistantV1(
    {
        version: '2018-09-20',
        username: 'apikey',
        password: '2-yYMykODEoXIUmBPxx0Xw9N_Q-6UjeSBbm16aslSxkh',
        url: 'https://gateway.watsonplatform.net/assistant/api'       
    }
);

assistant.message({
    workspace_id: '6319e464-f009-460a-b509-5943243abc54',
    input: {text: "Gostaria de ajuda para comprar um celular"}
},  function(err, response) {
    if (err)
        console.log('error:', err);
    else
        console.log(response);
});