import {useParams} from "react-router-dom"
import {useEffect, useState} from "react"
import './AdminPage.css'
import {useNavigate} from "react-router-dom"

const AdminPage = () => {
    const {adminUrl} = useParams()
    const [participants, setParticipants] = useState([])
    const [exchangeName, setExchangeName] = useState('')
    const [date, setDate] = useState('')
    const [name, setName] = useState('')
    const [exchangeId, setExchangeId] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [pairExchange, setPairExchange] = useState(false)
    const  navigate = useNavigate()

    const handleChangeName = (event) => {
        setName(event.target.value)
    }

    const handleChangeEmail = (event) => {
        setEmail(event.target.value)
    }

    const handleChangeAddress = (event) => {
        setAddress(event.target.value)
    }

    const handlePairExchange = () => {
        setPairExchange(pairExchange + 1)
    }

    useEffect(() => {
        fetch('http://localhost:3002/organise/' + adminUrl)
            .then((response) => {
                return response.json()
            }).then((data) => {
            setExchangeName(data.data.exchangeName)
            setDate(data.data.exchangeDate)
            setExchangeId(data.data._id)
            setParticipants(data.data.participants)
            console.log(participants)
        })
    }, [])

    const participantList = participants.map((participant) =>
        <h3 className='participants'>{participant.name}</h3>
    )


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
                    return alert('YAY! you are in the exchange as well!')
                }
            })
        })
    }

    const handleStartExchange = (event) => {
        event.preventDefault()
        const requestBody = JSON.stringify({
            message: "",
            data: {
                _id: exchangeId,
                isPairExchange: pairExchange
            }
        })
        fetch('http://localhost:3002' + '/assign', {
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
                    return navigate('/organise/success')
                }
            })
        })
    }

    return (
        <div>
            <div className={"adminPageComponents"}>
                <div className={"exchangeDetails"}>
                    <h2 className={"exchangeTitle"}>{exchangeName}</h2>
                    <h3 className={"date"}>{date}</h3>
                </div>
                <p></p>
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
                <div className={"participantContainer"}>
                    <h2 className={"participantList"}>participant list:</h2>
                    {participantList}
                </div>
                <div className={"pair-check"}>
                    <input className={"checkbox"} type={"checkbox"} onChange={handlePairExchange}/> allow allocation of two people as each other's gift giver
                </div>
                <button name={"this"} className={"start"} onClick={handleStartExchange}>start exchange!</button>
            </div>
        </div>
    )
}

export default AdminPage