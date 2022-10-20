const { unsort } = require("array-unsort");

function assignRecipientsToParticipantsUnique(participants) {
    const shuffledParticipants = unsort(participants)
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

function assignRecipientsToParticipantsPairs(participants) {
    const shuffledParticipants = unsort(participants, 'unique-idx')
    for (let i = 0; i<=participants.length-1; i++) {
       participants[i].recipient = shuffledParticipants[i]
    }
    return participants
}

module.exports = {
    assignRecipientsToParticipantsUnique: assignRecipientsToParticipantsUnique,
    assignRecipientsToParticipantsPairs: assignRecipientsToParticipantsPairs
}