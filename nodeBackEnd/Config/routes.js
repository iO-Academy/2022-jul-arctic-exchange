const participantController = require('../Controllers/participantController')
const exchangeController = require('../Controllers/ExchangeController')

function routes(app){
    app.post('/exchange', exchangeController.createExchange)

    app.get('/join/:participantUrl', exchangeController.getExchangeFromParticipantUrl)

    app.get('/organise/:adminUrl', exchangeController.getExchangeFromAdminUrl)

    app.post('/join', participantController.createParticipant)

    app.post('/assign', participantController.assignParticipants)

    app.post('/exclude', participantController.excludeParticipants)
}

module.exports = routes
