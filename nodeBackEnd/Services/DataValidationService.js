const verifyDateIsFuture = (date) => {
    const today = new Date()
    return date > today
}

module.exports = {verifyDateIsFuture: verifyDateIsFuture}