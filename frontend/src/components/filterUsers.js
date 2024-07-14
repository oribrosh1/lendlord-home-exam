import { useContext, useState } from 'react'
import GenericModal from './modal'
import { UserContext } from '../shared/userContext'
import { FaFilter } from 'react-icons/fa';
import './addUser.css'

export default function FilterUsers() {
    const { shown, closeModal, openModel, typeOfModel } = useContext(UserContext)
    const [filters, setFilters] = useState({
        firstName: '',
        lastName: '',
        email: '',
        role: '',
    });

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };
    // const filteredUsers = users?.filter(user => {
    //     return Object.keys(filters).every(key =>
    //         user[key].toLowerCase().includes(filters[key].toLowerCase())
    //     );
    // });

    return (
        <div>

            <button className="add-button" style={{ margin: 10 }} onClick={() => {
                if (shown) {
                    closeModal()
                } else {
                    openModel("filterusers")
                }
            }}>
                <FaFilter /> {" Filter"}
            </button>
            {
                typeOfModel === "filterusers" &&
                <GenericModal displayModal={shown} closeModal={closeModal}>
                    <h1>Filter Users</h1>
                    <div>
                        <input
                            type="text"
                            name="firstName"
                            value={filters.firstName}
                            onChange={handleFilterChange}
                            placeholder="Filter by First Name"
                        />
                        <input
                            type="text"
                            name="lastName"
                            value={filters.lastName}
                            onChange={handleFilterChange}
                            placeholder="Filter by Last Name"
                        />
                        <input
                            type="text"
                            name="email"
                            value={filters.email}
                            onChange={handleFilterChange}
                            placeholder="Filter by Email"
                        />
                        <select
                            name="role"
                            value={filters.role}
                            onChange={handleFilterChange}
                            placeholder="Filter by Role"
                        >
                            <option value="">Select Role</option>
                            <option value="manager">manager</option>
                            <option value="worker">worker</option>
                            <option value="driver">driver</option>
                        </select>
                        <input
                            type="text"
                            name="manager"
                            value={filters.manager}
                            onChange={handleFilterChange}
                            placeholder="Filter by Manager"
                        />
                    </div>
                </GenericModal>
            }
        </div >
    )
}

