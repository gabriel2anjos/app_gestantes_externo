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
    workspace_id: 'e0144021-23b1-4d20-8fb0-95db345a77cc',
    input: {text: "ola"}
},  function(err, response) {
    if (err)
        console.log('error:', err);
    else
        console.log(response);
});