import {useParams} from "react-router-dom"
import {useEffect, useState} from "react"

const CurrentParticipantPage = () => {
    const {participantUrl} = useParams()
    const [participantsOutput, setParticipantOutput] = useState('')
    const [exchangeName, setExchangeName] = useState('')
    const [date, setDate] = useState('')

    useEffect(() => {
        fetch('https://localhost:3002/join' + participantUrl)
            .then((response) => {
                return response.json()
            }).then((data) => {
            addHtmlToParticipants(data.data.participants)
            setExchangeName(data.data.exchangeName)
            setDate(data.data.exchangeDate)
        })
    }, [])

    const addHtmlToParticipants = (participants) => {
        let participantHtml = ''
        participants.forEach((participant) => {
            participantHtml += "<p className='participant'>" + participant + '</p>'
        })
        setParticipantOutput(participantHtml)
    }

    return (
        <div className={"currentPageComponents"}>
            <div className={"exchangeDetails"}>
                <h2>{exchangeName}</h2>
                <h3>{date}</h3>
            </div>
            <div className={"participantContainer"}>
                {participantsOutput}
            </div>
        </div>
    )
}

export default CurrentParticipantPage