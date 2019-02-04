const AssistantV1 = require('watson-developer-cloud/assistant/v1');

const watson = new AssistantV1({
    version: '2018-07-10',
    username: '9e0b657c-c3e4-4a4c-896f-8d3682003942',
    password: 'GtVC4WZqnX15',
    url: 'https://gateway.watsonplatform.net/assistant/api'
});

function postMensagem(req, res) {
    const { text, context = {} } = req.body;

    const params = {
        input: { text },
        workspace_id: '254f7313-df11-4910-b8d3-00a9ce77da47',
        context,
    };

    watson.message(params, (err, response) => {
        if (err) res.status(500).json(err);
        res.json(response);
    });
};

module.exports = {
    postMensagem:postMensagem,
};