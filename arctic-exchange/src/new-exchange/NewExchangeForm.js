import {useState} from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

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
    }


    return (
        <card className={"formCard"}>
            <h2>Create Your Gift Exchange</h2>
            <form className={"exchangeForm"} onSubmit={handleSubmit}>
                <input type={"name"} value={name} onChange={handleChangeName} />
                <DatePicker selected={date} onChange={date => setDate(date)} />
                <input type={"submit"} name={"submit"} />
            </form>
        </card>
    )
}

export default NewExchangeForm