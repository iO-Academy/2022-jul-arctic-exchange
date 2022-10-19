const DbService = require('../Services/DbService')
const ObjectId = require('mongodb').ObjectId
const validator = require('email-validator')
const nodemailer = require("nodemailer")
const shuffleList = require('shuffle-list')

function assignRecipientsToParticipants(participants) {
    const shuffledParticipants = shuffleList(participants)
    for (let i = 0; i<=participants.length-1; i++) {
        if (i === participants.length-1) {
            shuffledParticipants[i].recipient = shuffledParticipants[0]
            console.log(shuffledParticipants[i])
        } else {
            shuffledParticipants[i].recipient = shuffledParticipants[i+1]
            console.log(shuffledParticipants[i])
        }
    }
    return shuffledParticipants
}

const sendEmailToParticipant = (participant, exchangeDate, exchangeName) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'arcticexpressemails@gmail.com',
            pass: 'jijgdwhhdlliuasz'
        }
    })

    const mailOptions = {
        from: 'arcticexpressemails@gmail.com',
        to: participant.email,
        subject: 'Your gift exchange!',
        text: 'Hi ' + participant.name + '!' + '\n\n' + 'Here are the details of the "' + exchangeName + '" gift exchange! \n'
            + 'You are sending to - '+ participant.recipient.name + ', make it a great gift!\n'
            + 'Make sure you send your gift so that it reaches ' + participant.recipient.name + ' by ' + exchangeDate + '!\n'
            + 'Their address is - ' + participant.recipient.address + '\n\n'
            + 'Thanks for using our service! <3\n'
    }

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
}

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
    if(nameLength !== 0 && addressLength !== 0 && validator.validate(newReminderData.email)) {
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

async function assignParticipants(req, res) {
    const exchangeId = ObjectId(req.body.data._id)
    const collection = await DbService.connectToDb()
    const exchange = await collection.findOne({_id: exchangeId})
    if (exchange !== undefined) {
        const assignedParticipants = assignRecipientsToParticipants(exchange.participants)
        assignedParticipants.forEach((participant) => {
            sendEmailToParticipant(participant, exchange.exchangeDate, exchange.exchangeName)
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
    createParticipant: createParticipant,
    assignParticipants: assignParticipants
    // editParticipant: editParticipant,
    // deleteParticipant: deleteParticipant
}