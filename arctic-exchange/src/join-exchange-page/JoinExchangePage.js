import {useEffect, useState} from "react"
import "./JoinExchangePage.css"
import { useParams } from 'react-router-dom'

const JoinExchangePage = () => {
    const [exchangeName, setExchangeName] = useState('')
    const [date, setDate] = useState('')
    const [url, setUrl] = useState('')
    const {participantUrl} = useParams()

    useEffect(() => {
        fetch('http://localhost:3002/join/' + participantUrl)
            .then((response) => {
            return response.json()
        }).then((data) => {
            setExchangeName(data.data.exchangeName)
            setDate(data.data.exchangeDate)
            setUrl(data.data.participantUrl)
            })
    }, [])

    return (
        <div className={"joinPageComponents"}>
            <div className={"exchangeDetails"}>
                <h2>{exchangeName}</h2>
                <h3>{date}</h3>
                <p>Your URL is</p>
                <p>http://arcticexchange.com/{url}</p>
            </div>
            <div className={"addParticipant"}>
                <h2>Add New Participant</h2>
                <form className={"addParticipantForm"}>
                    {/*<input type={"name"} value={name} onChange={handleChangeName} required/>*/}
                    <input type={"type"} className={"input"}/>
                    <input type={"type"} className={"input"}/>
                    <input type={"type"} className={"input"}/>
                    <p></p>
                    <input type={"submit"} name={"submit"} className={"submit"} />
                </form>
            </div>
            <div className={"currentlyRegistered"}>
                <h2>Currently registered</h2>
                {/*<p>blah</p>*/}
                {/*<p>blah</p>*/}
                {/*<p>blah</p>*/}
                {/*<p>blah</p>*/}
                {/*<p>blah</p>*/}
            </div>
        </div>

    )
}

export default JoinExchangePage