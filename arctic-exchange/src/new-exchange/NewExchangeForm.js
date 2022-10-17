import {useState} from 'react'

const NewExchangeForm = () => {
    const [name, setName] = useState('')
    const [date, setDate] = useState('')

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
                    
            </form>
        </card>
    )
}