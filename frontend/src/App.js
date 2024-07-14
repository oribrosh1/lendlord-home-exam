import React, { useEffect, useState } from 'react'

import './App.css';
import Header from './components/header';
import AddUser from './components/addUser';
import FilterUsers from './components/filterUsers';
import UserTable from './components/userTable';
import UpdateUser from './components/updateUser';

function App() {

  return (
    <div className="App">
      <Header />
      <div id="content">
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
          <AddUser />
          <FilterUsers />
        </div>
        <UpdateUser />

        <UserTable />
      </div>
    </div>
  );
}

export default App;
