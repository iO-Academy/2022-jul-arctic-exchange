import {useState} from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import "./NewExchangeForm.css"
import {useNavigate} from 'react-router-dom'


const NewExchangeForm = () => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [date, setDate] = useState(new Date())
    const [postalExchange, setPostalExchange] = useState(false)
    const navigate = useNavigate()

    const handleChangeEmail = (event) => {
        setEmail(event.target.value)
    }

    const handleChangeName = (event) => {
        setName(event.target.value)
    }

    const handleChangeDate = (event) => {
        setDate(event.target.value)
    }

    const handlePostalExchangeSelection = () => {
        setPostalExchange(postalExchange + 1)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const  requestBody = JSON.stringify({
            message: "",
            data: {
                exchangeName: name,
                exchangeDate: date,
                isPostal: postalExchange
            }
        })
        fetch('http://localhost:3002' + '/exchange' , {
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
                    return navigate('/join')
                }
            })
        })
    }


    return (
        <div className={"formCard"}>
            <h2>Create Your Gift Exchange</h2>
            <form className={"exchangeForm"} onSubmit={handleSubmit} >
                <div className="input-wrapper">
                    <input type={"email"} className={"email"} value={email} onChange={handleChangeEmail} placeholder={"email"}required/>
                </div>
                <div className="input-wrapper">
                    <input type={"name"} value={name} onChange={handleChangeName} placeholder={"group name"}required/>
                </div>
                <div className="input-wrapper">
                    <DatePicker selected={date} onChange={date => setDate(date)} required/>
                </div>
                <div className={"postal-check"}>
                    <input className={"checkbox"} type={"checkbox"} onChange={handlePostalExchangeSelection}/> postal exchange?
                </div>
                <input type={"submit"} name={"submit"} className={"submit"} />
            </form>
        </div>
    )
}

export default NewExchangeForm