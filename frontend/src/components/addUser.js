import { useContext, useEffect, useState } from 'react'
import GenericModal from './modal'
import { UserContext } from '../shared/userContext'
import { FaPlusCircle } from 'react-icons/fa';
import './addUser.css'

export default function AddUser() {
    const { shown, closeModal, openModel, typeOfModel, handleAddSubmit, getManagers, managers } = useContext(UserContext)
    const [seeManagers, setSeeManagers] = useState(false)
    const [manager, setManager] = useState()

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dateStarted: '',
        email: '',
        role: 'manager',
        salary: '',
        managerId: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'role') {
            if (value !== 'manager') {
                setSeeManagers(true)
                getManagers()
            } else {
                setSeeManagers(false)
            }
        }
        if (name === "managerId") {
            console.log(managers);
            console.log(managers?.find(x => x?._id === value));
            setManager(managers?.find(x => x?._id === value))
        }
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddSubmit({ ...formData, manager })
    };



    return (
        <div>
            <button className="add-button" style={{ margin: 10 }} onClick={() => {
                if (shown) {
                    closeModal()
                } else {
                    openModel("addnewuser")
                }
            }}>
                <FaPlusCircle /> {" Add"}
            </button>
            {
                typeOfModel === "addnewuser" &&
                <GenericModal displayModal={shown} closeModal={closeModal}>
                    <h1>Add New User</h1>
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
                                <label htmlFor="email">Role</label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    placeholder="Filter by Role"
                                >
                                    <option value="manager">manager</option>
                                    <option value="worker">worker</option>
                                    <option value="driver">driver</option>
                                </select>
                            </div>

                            {seeManagers && managers?.length > 0 &&
                                <div className="form-group">
                                    <label htmlFor="email">Manager</label>
                                    <select
                                        name="managerId"
                                        value={formData.manager?._id}
                                        onChange={handleChange}
                                        placeholder="managed by"
                                    >
                                        {managers.map((m) => <option value={m._id}>{`${m.firstName} ${m.lastName}`}</option>)}
                                    </select>
                                </div>}

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

