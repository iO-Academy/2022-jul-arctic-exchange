const DbService = require('../Services/DbService')
const DataValidationService = require('../Services/DataValidationService')
const GenerateUrlService = require('../Services/GenerateUrlService')
const EmailService = require('../Services/EmailService')
const validator = require('email-validator')

const createExchange = async (req, res) => {
    const failureResponse = {
        message: "Failed to create reminder due to incorrect input",
        data: [{}]
    }
    const adminUrl = await GenerateUrlService.generateUrl()
    const participantUrl = await GenerateUrlService.generateUrl()
    const collection = await DbService.connectToDb()
    const isPostal = req.body.data.isPostal === 1
    const exchangeDate = req.body.data.exchangeDate.substring(0, 10)
    const exchangeDateObject = new Date(exchangeDate)
    const newExchangeData = {
        exchangeName: req.body.data.exchangeName,
        exchangeDate: exchangeDateObject.toLocaleDateString('en-GB'),
        exchangeEmail: req.body.data.exchangeEmail,
        isPostal: isPostal,
        adminUrl: adminUrl,
        participantUrl: participantUrl,
        participants: []
    }
    const nameLength = newExchangeData.exchangeName.length
    if (DataValidationService.verifyDateIsFuture(exchangeDateObject) && nameLength !== 0 && validator.validate(newExchangeData.exchangeEmail)) {
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
            EmailService.sendEmailToAdmin(newExchangeData)
        } else {
            res.status(400).json(failureResponse)
        }
    } else {
        res.status(400).json(failureResponse)
    }
}

const getExchangeFromParticipantUrl = async (req, res) => {
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

const getExchangeFromAdminUrl = async (req, res) => {
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
    getExchangeFromParticipantUrl: getExchangeFromParticipantUrl,
}