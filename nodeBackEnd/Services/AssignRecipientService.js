const shuffleList = require("shuffle-list");

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

module.exports = {assignRecipientsToParticipants: assignRecipientsToParticipants}