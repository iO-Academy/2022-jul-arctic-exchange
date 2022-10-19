import {useParams} from "react-router-dom"
import {useEffect, useState} from "react"

const CurrentParticipantPage = () => {
    const {participantUrl} = useParams()
    const [usersArray, setUsersArray] = useState('')

    useEffect(() => {
        fetch('https://localhost:3002/join' + participantUrl)
            .then((response ) => {
                return response.json()
            }).then((data) => {
                setUsersArray(data.data.participants)
            })
    }, [])
}

export default CurrentParticipantPage