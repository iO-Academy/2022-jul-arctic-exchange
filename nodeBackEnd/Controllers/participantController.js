const DbService = require('../Services/DbService')
const ObjectId = require('mongodb').ObjectId
const validator = require('email-validator')

async function createParticipant(req, res) {
    const collection = await DbService.connectToDb()
    let result
    const newReminderData = {
        name: req.body.data.name,
        email: req.body.data.email,
        address: req.body.data.address
    }
    const nameLength = newReminderData.name.length
    const addressLength = newReminderData.address.length

    if(nameLength !== 0 && addressLength !== 0 && validator.validate(newReminderData.email)) {
        result = await collection.insertOne(newReminderData)
    }
    if (result.acknowledged) {
        const responseData = {
            message: "Successfully created participant",
            data: [{}]
        }
        res.status(200).json(responseData)
    } else {
        const responseData = {
            message: "Failed to create participant due to incorrect input",
            data: [{}]
        }
        res.status(400).json(responseData)
    }
}

async function editParticipant(req, res) {
    const collection = await connectToDb()
    const oid = ObjectId(req.params.id)

    const result = await collection.updateOne({_id: oid}, {$set: {done: req.body.data.done}})
    if (result.modifiedCount) {
        const responseData = {
            message: "Successfully changed reminder status",
            data: [{}]
        }
        res.status(200).json(responseData)
    } else {
        const responseData = {
            message: "Failed to create reminder due to incorrect input",
            data: [{}]
        }
        res.status(400).json(responseData)
    }
}

async function deleteParticipant(req, res) {
    const collection = await connectToDb()
    const oid = ObjectId(req.params.id)

    const result = await collection.deleteOne({_id: oid})
    if (result.deletedCount) {
        const responseData = {
            message: "Successfully deleted reminder",
            data: [{}]
        }
        res.status(200).json(responseData)
    } else {
        const responseData = {
            message: "Failed to create reminder due to incorrect input",
            data: [{}]
        }
        res.status(400).json(responseData)
    }
}

module.exports = {
    getParticipantsWithExchangeId: getParticipantsWithExchangeId,
    createParticipant: createParticipant,
    editParticipant: editParticipant,
    deleteParticipant: deleteParticipant
}