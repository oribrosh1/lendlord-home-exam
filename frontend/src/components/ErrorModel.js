import { useContext } from 'react'
import GenericModal from './modal'
import { UserContext } from '../shared/userContext'
import { FaPlusCircle } from 'react-icons/fa';
import './addUser.css'

export default function AddUser() {
    const { shown, closeModal, openModel, typeOfModel, err } = useContext(UserContext)
    return (
        <div>


            {
                typeOfModel.includes("error") &&
                <GenericModal displayModal={shown} closeModal={closeModal}>
                    <h1>Error</h1>
                    <h3>
                        {err}
                    </h3>
                </GenericModal>
            }
        </div >
    )
}

