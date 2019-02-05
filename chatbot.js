const AssistantV1 = require('watson-developer-cloud/assistant/v1');

const watson = new AssistantV1({
    version: '2018-07-10',
    // username: '9e0b657c-c3e4-4a4c-896f-8d3682003942',
    username: 'e_ZC3d6grmMciv1REfyW_ZqA0GFgR6h-sL8M8IGifBrd',
    password: 'gestantesIBM2019#',
    url: 'https://gateway.watsonplatform.net/assistant/api'
});

function postMensagem(req, res) {
    const { text, context = {} } = req.body;

    const params = {
        input: { text },
        workspace_id: '01c2d412-b993-4b1f-8fc9-4d8d84ec36af',
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