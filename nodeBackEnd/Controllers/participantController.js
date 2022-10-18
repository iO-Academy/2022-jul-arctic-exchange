const DbService = require('../Services/DbService')
const ObjectId = require('mongodb').ObjectId

async function getParticipants(req, res) {
    const oid = ObjectId(req.params.id)
    const collection = await DbService.connectToDb()
    const exchange = await collection.findOne({_id: oid})
    const participants = exchange.participants
    const responseData = {
        message: "Successfully retrieved all the participants",
        data: exchange.participants
    }
    res.status(200).json(responseData)
}

async function createParticipant(req, res) {
    const collection = await connectToDb()
    const newReminderData = {
        title: req.body.data.name,
        done: req.body.data.done
    }
    const titleLength = newReminderData.title.length
    console.log(titleLength)
    const result = await collection.insertOne(newReminderData)
    console.log(result.acknowledged)
    if (result.acknowledged && titleLength <= 500 && titleLength !== 0) {
        const responseData = {
            message: "Successfully created reminder",
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
    getParticipants: getParticipants,
    createParticipant: createParticipant,
    editParticipant: editParticipant,
    deleteParticipant: deleteParticipant
}