// const participantController = require('../Controllers/participantController')
const exchangeController = require('../Controllers/ExchangeController')

function routes(app){
    app.post('/exchange', exchangeController.createExchange)

    // app.get('/participants', participantController.getParticipants)
    //
    // app.put('/participants/:id', participantController.editParticipant)
    //
    // app.post('/participants', participantController.createParticipant)
    //
    // app.delete('/participants/:id', participantController.deleteParticipant)
}

module.exports = routes
