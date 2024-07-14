import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../shared/userContext';
import './userTable.css'
import { FaEdit, FaTrash, FaArrowDown, FaArrowUp } from 'react-icons/fa';

function UserTable() {

    const { sortConfig, sortedFilteredUsers, handleSort, handleDelete, handleUpdate } = useContext(UserContext)

    const renderSortArrow = (fieldName) => {
        if (sortConfig?.field === fieldName) {
            return sortConfig.direction === 'ascending' ? <FaArrowUp /> : <FaArrowDown />;
        }
        return '';
    };
    return (
        <div className="table-container">
            <table style={{ width: '100%', textAlign: 'left', margin: 10 }}>
                <thead>
                    <tr>
                        <th onClick={() => handleSort('firstName')}>
                            First Name {renderSortArrow('firstName')}
                        </th>
                        <th onClick={() => handleSort('lastName')}>
                            Last Name {renderSortArrow('lastName')}
                        </th>
                        <th onClick={() => handleSort('email')}>
                            Email {renderSortArrow('email')}
                        </th>
                        <th onClick={() => handleSort('dateStarted')}>
                            Date Started {renderSortArrow('dateStarted')}
                        </th>
                        <th onClick={() => handleSort('role')}>
                            Role {renderSortArrow('role')}
                        </th>
                        <th onClick={() => handleSort('salary')}>
                            Salary {renderSortArrow('salary')}
                        </th>
                        <th>Manager</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedFilteredUsers ? sortedFilteredUsers.map((user, index) => (
                        <tr key={index}>
                            <td style={{ fontWeight: 'bold' }}>{user.firstName}</td>
                            <td style={{ fontWeight: 'bold' }}>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td style={{ fontWeight: 'bold' }}>{user.dateStarted.replace(/-/g, "/").split("T")[0]}</td>
                            <td style={{ fontWeight: 'bold' }}>{user.role}</td>
                            <td style={{ fontWeight: 'bold' }}>{user.salary}</td>
                            {user.manager?.firstName ? <td>{`${user.manager?.firstName} ${user.manager?.lastName}`}</td> : <td>No Manager</td>}

                            <td>

                                <button onClick={() => handleUpdate(user)} className='add-button' style={{ marginRight: '10px', backgroundColor: 'lightgray' }}><FaEdit /></button>
                                <button onClick={handleDelete} className='add-button' style={{ marginRight: '10px', backgroundColor: 'lightgray' }}><FaTrash /></button>
                            </td>
                        </tr>
                    )) : <div>Loading...</div>}
                </tbody>
            </table>
        </div>
    );
}

export default UserTable;
