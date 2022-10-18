const DbService = require('../Services/DbService')
const {ObjectId} = require("mongodb");

const verifyDateIsFuture = (date) => {
    const today = new Date()
    const inputDate = new Date(date)
    return inputDate > today
}

async function generateUrl() {
    const {randomBytes} = await import('node:crypto')
    return randomBytes(8).toString('hex')
}

async function createExchange(req, res) {
    const failureResponse = {
        message: "Failed to create reminder due to incorrect input",
        data: [{}]
    }
    const adminUrl = await generateUrl()
    const participantUrl = await generateUrl()
    const collection = await DbService.connectToDb()
    const newExchangeData = {
        exchangeName: req.body.data.exchangeName,
        exchangeDate: req.body.data.exchangeDate,
        isPostal: req.body.data.isPostal,
        adminUrl: adminUrl,
        participantUrl: participantUrl,
        participants: []
    }
    const isFuture = verifyDateIsFuture(newExchangeData.exchangeDate)
    const nameLength = newExchangeData.exchangeName.length
    if (isFuture && nameLength !== 0) {
        const result = await collection.insertOne(newExchangeData)
        if (result.acknowledged) {
            const responseData = {
                message: "Successfully created exchange",
                data: {
                    participantUrl: participantUrl,
                    adminUrl: adminUrl
                }
            }
            res.status(200).json(responseData)
        } else {
            res.status(400).json(failureResponse)
        }
    } else {
        res.status(400).json(failureResponse)
    }
}

async function getExchangeFromParticipantUrl(req, res) {
    const participantUrl = req.params.participantUrl
    const collection = await DbService.connectToDb()
    const exchange = await collection.findOne({participantUrl: participantUrl})
    if (exchange !== undefined) {
        const responseData = {
            message: "Successfully retrieved the exchange",
            data: exchange
        }
        res.status(200).json(responseData)
    } else {
        const responseData = {
            message: "Failed to retrieve data - Incorrect URL",
            data: ""
        }
        res.status(400).json(responseData)
    }
}

async function getExchangeFromAdminUrl(req, res) {
    const adminUrl = req.params.adminUrl
    const collection = await DbService.connectToDb()
    const exchange = await collection.findOne({adminUrl: adminUrl})
    if (exchange !== undefined) {
        const responseData = {
            message: "Successfully retrieved the exchange",
            data: exchange
        }
        res.status(200).json(responseData)
    } else {
        const responseData = {
            message: "Failed to retrieve data - Incorrect URL",
            data: ""
        }
        res.status(400).json(responseData)
    }
}

module.exports = {
    createExchange: createExchange,
    getExchangeFromAdminUrl: getExchangeFromAdminUrl,
    getExchangeFromParticipantUrl: getExchangeFromParticipantUrl

}