const DbService = require('../Services/DbService')

const verifyDateIsFuture = (date) => {
    const today = new Date()
    const inputDate = new Date(date)
    return inputDate > today;
}

async function createExchange(req, res) {
    const failureResponse = {
        message: "Failed to create reminder due to incorrect input",
        data: [{}]
    }
    const collection = await DbService.connectToDb()
    const newExchangeData = {
        exchangeName: req.body.data.exchangeName,
        exchangeDate: req.body.data.exchangeDate,
        isPostal: req.body.data.isPostal,
    }
    const isFuture = verifyDateIsFuture(newExchangeData.exchangeDate)
    const nameLength = newExchangeData.exchangeName.length
    if (isFuture && nameLength !== 0) {
        const result = await collection.insertOne(newExchangeData)
        if (result.acknowledged && nameLength !== 0) {
            const responseData = {
                message: "Successfully created exchange",
                data: [{}]
            }
            res.status(200).json(responseData)
        } else {
            res.status(400).json(failureResponse)
        }
    } else {
        res.status(400).json(failureResponse)
    }
}


module.exports = {createExchange}
