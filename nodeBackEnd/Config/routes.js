const participantController = require('../Controllers/participantController')
const exchangeController = require('../Controllers/ExchangeController')

function routes(app){
    app.post('/exchange', exchangeController.createExchange)

    app.get('/join/:participantUrl', exchangeController.getExchangeFromParticipantUrl)

    app.get('/organise/:adminUrl', exchangeController.getExchangeFromAdminUrl)

    app.post('/join', participantController.createParticipant)

    app.post('/email', exchangeController.sendEmailToParticipant)

    // app.put('/participants/:id', participantController.editParticipant)

    // app.delete('/participants/:id', participantController.deleteParticipant)
}

module.exports = routes
