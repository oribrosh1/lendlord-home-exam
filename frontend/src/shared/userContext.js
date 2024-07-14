import React, { createContext, useEffect, useState } from 'react';
import axiosInstance from './axiosInstance';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [shown, setShown] = useState(false)
    const [selectedUserToUpdate, setSelectedUserToUpdate] = useState(null)
    const [typeOfModel, setTypeOfModel] = useState("")
    const [managers, setManagers] = useState([]);
    const [users, setUsers] = useState([]);
    const [filterQuery, setFilterQuery] = useState('');
    const [sortConfig, setSortConfig] = useState(null);

    const [err, setErr] = useState("")

    const closeModal = () => {
        setShown(false)
        if (typeOfModel === "error") {
            setErr("")
        }
    }
    const openModel = (type) => {
        setShown(true)
        setTypeOfModel(type)
    }
    const getManagers = async () => {
        try {
            const res = await axiosInstance.get(`/managers`);
            setManagers(res.data);
        } catch (error) {
            console.error('Failed to get managers:', error.message);
            setErr(error.message)
            openModel(`error`)
        }
    }

    const handleAddSubmit = async (data) => {
        try {
            const res = await axiosInstance.post(`/user`, data);
            console.log(res.status);
            if (res.status !== 201) {
                console.error('Failed to update user:', res.data);
                setErr(res.data)
                openModel(`error`)
            }
            const newUsers = [...users, { ...(res.data), manager: data.manager }]
            setUsers(newUsers);
            closeModal();
        } catch (error) {
            console.error('Failed to update user:', error.message);
            setErr(error.message)
            openModel(`error`)
        }
    }

    const handleDelete = async (_id) => {
        try {
            await axiosInstance.delete(`/user/${_id}`)
            const filteredUsers = users.filter(user => user._id !== _id)
            setUsers(filteredUsers)
            closeModal()
        } catch (error) {
            console.error('Failed to delete user:', error.message);
            setErr(error.message)
            openModel(`error`)
        }
    }

    const handleUpdate = async (user) => {
        const { _id, firstName, lastName, email, salary } = user
        openModel("updateuser")
        setSelectedUserToUpdate({ _id, firstName, lastName, email, salary })
    }


    const handleUpdateSubmit = async ({ _id, firstName, lastName, email, salary }) => {
        try {
            await axiosInstance.put(`/user/${_id}`, { firstName, lastName, email, salary });
            const mappedUsers = users.map(user => {
                if (user._id === _id) {
                    return { ...user, firstName, lastName, email, salary };
                }
                return user;
            });
            setUsers(mappedUsers);
            closeModal();
        } catch (error) {
            console.error('Failed to update user:', error.message);
            setErr(error.message)
            openModel(`error`)
        }
    }


    const handleSort = fieldName => {
        const direction = sortConfig?.field === fieldName && sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
        setSortConfig({ field: fieldName, direction });
    };

    const sortedFilteredUsers = users
        ?.filter(user =>
            user.firstName.toLowerCase().includes(filterQuery.toLowerCase()) ||
            user.lastName.toLowerCase().includes(filterQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(filterQuery.toLowerCase())
        )
        ?.sort((a, b) => {
            if (!sortConfig) return 0;
            const isAscending = sortConfig.direction === 'ascending' ? 1 : -1;
            if (sortConfig.field === 'salary') {
                const salaryA = Number(String(a.salary).replace(/[^0-9.-]+/g, ""));
                const salaryB = Number(String(b.salary).replace(/[^0-9.-]+/g, ""));
                return (salaryA - salaryB) * isAscending;
            }
            return a[sortConfig.field].localeCompare(b[sortConfig.field], undefined, { numeric: true }) * isAscending;
        });

    useEffect(() => {
        const fetchData = async () => {
            const res = await axiosInstance.get("/users")
            setUsers(res.data)
        }
        fetchData()
    }, [])

    return (
        <UserContext.Provider value={{ setUsers, sortConfig, sortedFilteredUsers, handleAddSubmit, handleSort, setFilterQuery, shown, typeOfModel, closeModal, openModel, handleDelete, handleUpdateSubmit, handleUpdate, selectedUserToUpdate, managers, getManagers, err }}>
            {children}
        </UserContext.Provider>
    );
};

