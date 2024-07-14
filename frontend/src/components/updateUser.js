import { useContext, useEffect, useState } from 'react'
import GenericModal from './modal'
import { UserContext } from '../shared/userContext'
import { FaPlusCircle } from 'react-icons/fa';
import './addUser.css'

export default function UpdateUser() {
    const { shown, closeModal, typeOfModel, selectedUserToUpdate, handleUpdateSubmit } = useContext(UserContext)
    // Initialize formData state
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        salary: 0
    });

    // Effect to update formData when selectedUserToUpdate changes
    useEffect(() => {
        if (selectedUserToUpdate) {
            setFormData({
                firstName: selectedUserToUpdate.firstName || "",
                lastName: selectedUserToUpdate.lastName || "",
                email: selectedUserToUpdate.email || "",
                salary: selectedUserToUpdate.salary || 0
            });
        }
    }, [selectedUserToUpdate]); // Dependencies array includes selectedUserToUpdate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        handleUpdateSubmit({ _id: selectedUserToUpdate._id, firstName: formData.firstName, lastName: formData.lastName, email: formData.email, salary: formData.salary })
        e.preventDefault()
    };

    return (
        <div>
            {
                typeOfModel === "updateuser" &&
                <GenericModal displayModal={shown} closeModal={closeModal}>
                    <h1>{`update User: ${selectedUserToUpdate.firstName} ${selectedUserToUpdate.lastName}`}</h1>
                    <div className="container">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    name="firstName"
                                    placeholder="Enter first name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Enter last name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    placeholder="Enter email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="salary">Salary</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="salary"
                                    name="salary"
                                    placeholder="Enter salary"
                                    value={formData.salary}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="dateStarted">Date Started</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="dateStarted"
                                    name="dateStarted"
                                    value={formData.dateStarted}
                                    onChange={handleChange}
                                />
                            </div>
                            <button className='save-button' type="submit">Save</button>
                        </form>
                    </div>
                </GenericModal>
            }
        </div >
    )
}

