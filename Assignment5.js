// src/App.js
import React, { useState } from 'react';
import { UserProvider } from './UserContext';
import UserForm from './UserForm';
import UserList from './UserList';
import './App.css';

function App() {
  const [editingUser, setEditingUser] = useState(null);

  return (
    <UserProvider>
      <div className="App">
        <header className="App-header">
          <h1>User Registration</h1>
          <UserForm editingUser={editingUser} setEditingUser={setEditingUser} />
          <h2>Registered Users</h2>
          <UserList setEditingUser={setEditingUser} />
        </header>
      </div>
    </UserProvider>
  );
}

export default App;

