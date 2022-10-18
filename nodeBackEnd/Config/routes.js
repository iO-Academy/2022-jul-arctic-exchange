const participantController = require('../Controllers/participantController')
const exchangeController = require('../Controllers/ExchangeController')

function routes(app){
    app.post('/exchange', exchangeController.createExchange)

    app.get('/join/:participantUrl', exchangeController.getExchangeFromParticipantUrl)

    app.get('/organise/:adminUrl', exchangeController.getExchangeFromAdminUrl)

    app.post('/join', participantController.createParticipant)

    // app.put('/participants/:id', participantController.editParticipant)
    //
    // app.post('/participants', participantController.createParticipant)
    //
    // app.delete('/participants/:id', participantController.deleteParticipant)
}

module.exports = routes
