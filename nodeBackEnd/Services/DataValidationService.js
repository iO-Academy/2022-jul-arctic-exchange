const verifyDateIsFuture = (date) => {
    const today = new Date()
    const inputDate = new Date(date)
    return inputDate > today
}

const convertDate = (rawDate) => {
    const date = new Date(rawDate)
    return date.toDateString()
}

module.exports = {
    verifyDateIsFuture: verifyDateIsFuture,
    convertDate: convertDate
}