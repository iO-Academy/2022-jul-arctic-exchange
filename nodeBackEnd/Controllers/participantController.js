import {connectToDb} from '../Services/DbService'
import {ObjectId} from 'mongodb'

async function getReminders(req, res) {
    console.log(req.query.done)
    let doneLowerCase
    if (req.query.done !== undefined) {
        doneLowerCase = req.query.done.toLowerCase()
    }
    const collection = await connectToDb()
    if(doneLowerCase === 'true' || doneLowerCase === 'false')
    {
        const isDone = (doneLowerCase === 'true');
        const remindersDone = await collection.find({done: isDone}).toArray()
        const responseData = {
            message: "Successfully retrieved all the " + isDone + " reminders",
            data: remindersDone
        }
        res.status(200).json(responseData)
    } else if (req.query.done === undefined) {
        const reminders = await collection.find({}).toArray()
        const responseData = {
            message: "Successfully retrieved all the reminders",
            data: reminders
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

async function createReminder(req, res) {
    const collection = await connectToDb()
    const newReminderData = {
        title: req.body.data.title,
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

async function changeReminder(req, res) {
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

async function deleteReminder(req, res) {
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