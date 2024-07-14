import { useContext } from 'react'
import GenericModal from './modal'
import { UserContext } from '../shared/userContext'
import './addUser.css'

export default function ErrorModel() {
    const { shown, closeModal, typeOfModel, err } = useContext(UserContext)
    return (
        <div>
            {
                typeOfModel === "error" &&
                <GenericModal style={{ zIndex: 10 }} displayModal={shown} closeModal={closeModal}>
                    <h1>Error</h1>
                    <h3>
                        {err}
                    </h3>
                </GenericModal>
            }
        </div >
    )
}

