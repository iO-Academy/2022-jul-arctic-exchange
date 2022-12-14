const verifyDateIsFuture = (date) => {
    const today = new Date()
    return date > today
}

const convertDate = (rawDate) => {
    const date = new Date(rawDate)
    return date.toDateString()
}

module.exports = {
    verifyDateIsFuture: verifyDateIsFuture,
    convertDate: convertDate
}