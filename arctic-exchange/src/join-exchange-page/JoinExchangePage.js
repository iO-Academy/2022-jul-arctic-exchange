import {useEffect, useState} from "react"
import "./JoinExchangePage.css"
import { useParams } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'

const JoinExchangePage = () => {
    const navigate = useNavigate()
    const [exchangeName, setExchangeName] = useState('')
    const [date, setDate] = useState('')
    const [url, setUrl] = useState('')
    const [exchangeId, setExchangeId] = useState('')
    const {participantUrl} = useParams()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')

    const handleChangeName = (event) => {
        setName(event.target.value)
    }

    const handleChangeEmail = (event) => {
        setEmail(event.target.value)
    }

    const handleChangeAddress = (event) => {
        setAddress(event.target.value)
    }

    useEffect(() => {
        fetch('http://localhost:3002/join/' + participantUrl)
            .then((response) => {
            return response.json()
        }).then((data) => {
            setExchangeName(data.data.exchangeName)
            setDate(data.data.exchangeDate)
            setUrl(data.data.participantUrl)
            setExchangeId(data.data._id)
            })
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()
        const requestBody = JSON.stringify({
            message: "",
            data: {
                name: name,
                email: email,
                address: address,
                _id: exchangeId
            }
        })
        fetch('http://localhost:3002' + '/join', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: requestBody
        }).then(response => {
            const statusCode = response.status,
                success = response.ok

            response.json().then(response => {
                if(statusCode === 400) {
                    return alert('FAIL!')
                } else {
                    return navigate('/participants')
                }
            })
        })
    }

    return (
        <div className={"joinPageComponents"}>
            <div className={"exchangeDetails"}>
                <h2>{exchangeName}</h2>
                <h3>{date}</h3>
            </div>
            <div className={"addParticipant"}>
                <h2>Add New Participant</h2>
                <form className={"addParticipantForm"} onSubmit={handleSubmit}>
                    <input type={"name"} className={"name"} value={name} onChange={handleChangeName} placeholder={"name"} required />
                    <input type={"email"} className={"email"} value={email} onChange={handleChangeEmail} placeholder={"email"}required />
                    <input type={"address"} className={"address"} value={address} onChange={handleChangeAddress} placeholder={"address"}required />
                    <p></p>
                    <input type={"submit"} name={"submit"} className={"submit"} />
                </form>
            </div>
            {/*<div className={"currentlyRegistered"}>*/}
            {/*    <h2>Currently registered</h2>*/}
            {/*    /!*<p>blah</p>*!/*/}
            {/*    /!*<p>blah</p>*!/*/}
            {/*    /!*<p>blah</p>*!/*/}
            {/*    /!*<p>blah</p>*!/*/}
            {/*    /!*<p>blah</p>*!/*/}
            {/*</div>*/}
        </div>

    )
}

export default JoinExchangePage