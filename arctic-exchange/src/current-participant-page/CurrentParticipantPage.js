import {useParams} from "react-router-dom"
import {useEffect, useState} from "react"
import './CurrentParticipantPage.css'

const CurrentParticipantPage = () => {
    const {participantUrl} = useParams()
    const [participants, setParticipants] = useState([])
    const [exchangeName, setExchangeName] = useState('')
    const [date, setDate] = useState('')

    useEffect(() => {
        fetch('http://localhost:3002/join/' + participantUrl)
            .then((response) => {
                return response.json()
            }).then((data) => {
            setParticipants(data.data.participants)
            setExchangeName(data.data.exchangeName)
            setDate(data.data.exchangeDate)
        })
    }, [])

    const participantList = participants.map((participant) =>
        <h3 className='participants'>{participant.name}</h3>
    )

    return (
        <div className={"currentPageComponents"}>
            <div className={"exchangeDetails"}>
                <h2 className={"exchangeTitle"}>{exchangeName}</h2>
                <h3 className={"date"}>{date}</h3>
            </div>
            <p></p>
            <div className={"participantContainer"}>
                <h2 className={"participantList"}>participant list:</h2>
                {participantList}
            </div>
        </div>
    )
}

export default CurrentParticipantPage