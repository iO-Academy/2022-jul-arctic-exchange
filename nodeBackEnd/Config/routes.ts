const exchangeController = require('../Controllers/exchangeController')
const participantController = require('../Controllers/participantController')

function routes(app){

    app.post('/exchange', exchangeController.createExchange)

    app.get('/participants', participantController.getParticipants)

    app.put('/participants/:id', participantController.changeParticipant)


    app.delete('/participants/:id', participantController.deleteParticipant)
}

module.exports = routes