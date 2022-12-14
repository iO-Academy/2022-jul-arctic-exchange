const DbService = require('../Services/DbService')
const EmailService = require('../Services/EmailService')
const assignRecipientService = require('../Services/AssignRecipientService')
const ObjectId = require('mongodb').ObjectId
const validator = require('email-validator')


const createParticipant = async (req, res) => {
    let result
    const failedData = {
        message: "Failed to create participant due to incorrect input",
        data: [{}]
    }
    const collection = await DbService.connectToDb()
    const exchangeId = ObjectId(req.body.data._id)
    const participantData = {
        name: req.body.data.name,
        email: req.body.data.email,
        address: req.body.data.address,
        recipient: {},
        exclusions: []
    }
    const nameLength = participantData.name.length
    const addressLength = participantData.address.length
    if(nameLength !== 0 && addressLength !== 0 && validator.validate(participantData.email)) {
        result = await collection.updateOne(
            {_id: exchangeId},
            {$push: {participants: participantData}}
        )
        if (result.modifiedCount) {
            const responseData = {
                message: "Successfully created participant",
                data: [{}]
            }
            res.status(200).json(responseData)
        } else {
            res.status(400).json(failedData)
        }
    } else {
        res.status(400).json(failedData)
    }
}

const assignParticipants = async (req, res) => {
    const exchangeId = ObjectId(req.body.data._id)
    const isPairExchange = req.body.data.isPairExchange === 1
    let assignedParticipants
    const collection = await DbService.connectToDb()
    const exchange = await collection.findOne({_id: exchangeId})
    if (exchange !== undefined) {
        if (isPairExchange) {
            assignedParticipants = assignRecipientService.assignRecipientsToParticipantsPairs(exchange.participants)
        } else {
            assignedParticipants = assignRecipientService.assignRecipientsToParticipantsUnique(exchange.participants)
        }
        assignedParticipants.forEach((participant) => {
            EmailService.sendEmailToParticipant(participant, exchange)
        })
        const responseData = {
            message: "Successfully begun the exchange",
            data: ""
        }
        res.status(200).json(responseData)
    } else {
        const responseData = {
            message: "Failed to retrieve data - Incorrect exchange ID",
            data: ""
        }
        res.status(400).json(responseData)
    }
}

module.exports = {
    createParticipant: createParticipant,
    assignParticipants: assignParticipants
}