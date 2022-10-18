import {useState} from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import "./NewExchangeForm.css"

const NewExchangeForm = () => {
    const [name, setName] = useState('')
    const [date, setDate] = useState(new Date())

    const handleChangeName = (event) => {
        setName(event.target.value)
    }

    const handleChangeDate = (event) => {
        setDate(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        fetch(document.url + '/exchange' , {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: {
                message: "",
                data: {
                    exchangeName: name,
                    exchangeDate: date
                }
            }
        })
    }


    return (
        <card className={"formCard"}>
            <h2>Create Your Gift Exchange</h2>
            <form className={"exchangeForm"} onSubmit={handleSubmit} >
                <input type={"name"} value={name} onChange={handleChangeName} required/>
                <DatePicker className="date-picker" selected={date} onChange={date => setDate(date)} required/>
                <input type={"submit"} name={"submit"} className={"submit"} />
            </form>
        </card>
    )
}

export default NewExchangeForm