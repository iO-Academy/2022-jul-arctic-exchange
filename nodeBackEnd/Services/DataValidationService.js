const verifyDateIsFuture = (date) => {
    const today = new Date()
    const inputDate = new Date(date)
    return inputDate > today
}

module.exports = {verifyDateIsFuture: verifyDateIsFuture}