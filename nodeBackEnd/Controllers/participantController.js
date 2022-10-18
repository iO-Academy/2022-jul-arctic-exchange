const DbService = require('../Services/DbService')
const ObjectId = require('mongodb').ObjectId
const validator = require('email-validator')

async function createParticipant(req, res) {
    const failedData = {
        message: "Failed to create participant due to incorrect input",
        data: [{}]
    }
    const collection = await DbService.connectToDb()
    const exchangeId = ObjectId(req.body.data._id)
    let result
    const newReminderData = {
        name: req.body.data.name,
        email: req.body.data.email,
        address: req.body.data.address,
        exclusions: []
    }
    const nameLength = newReminderData.name.length
    const addressLength = newReminderData.address.length
    console.log('you got this far')
    if(nameLength !== 0 && addressLength !== 0 && validator.validate(newReminderData.email)) {
        console.log('you are here')
        result = await collection.updateOne(
            {_id: exchangeId},
            {$push: {participants: newReminderData}}
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

// async function editParticipant(req, res) {
//     const collection = await DbService.connectToDb()
//     const oid = ObjectId(req.params.id)
//
//     const result = await collection.updateOne({_id: oid}, {$set: {done: req.body.data.done}})
//     if (result.modifiedCount) {
//         const responseData = {
//             message: "Successfully changed reminder status",
//             data: [{}]
//         }
//         res.status(200).json(responseData)
//     } else {
//         const responseData = {
//             message: "Failed to create reminder due to incorrect input",
//             data: [{}]
//         }
//         res.status(400).json(responseData)
//     }
// }
//
// async function deleteParticipant(req, res) {
//     const collection = await DbService.connectToDb()
//     const oid = ObjectId(req.params.id)
//
//     const result = await collection.deleteOne({_id: oid})
//     if (result.deletedCount) {
//         const responseData = {
//             message: "Successfully deleted reminder",
//             data: [{}]
//         }
//         res.status(200).json(responseData)
//     } else {
//         const responseData = {
//             message: "Failed to create reminder due to incorrect input",
//             data: [{}]
//         }
//         res.status(400).json(responseData)
//     }
// }

module.exports = {
    createParticipant: createParticipant
    // editParticipant: editParticipant,
    // deleteParticipant: deleteParticipant
}