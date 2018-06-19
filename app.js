const restify = require('restify');
const builder = require('botbuilder');

/**
 * Setup Restify Server
 */
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log('%s listening to %s', server.name, server.url);
});

/**
 * Create chat connector for communicating with the Bot Framework Service
 */
const connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

server.post('/api/messages', connector.listen());

let bot = new builder.UniversalBot(connector, function (session){
    session.send('You said: %s', session.message.text);
});