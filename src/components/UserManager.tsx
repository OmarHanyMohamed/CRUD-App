// src/components/UserManager.tsx
import React, { useState } from 'react';
import { deleteUser, updateUser, User } from '../api/users';
import UserForm from './UserForm';

const UserManager: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleUserAdded = (newUser: User) => {
    setUsers([...users, newUser]);
  };

  const handleUpdateUser = async () => {
    if (selectedUser && selectedUser.id !== undefined) {
      const updatedUser = await updateUser(selectedUser.id, {
        firstName: selectedUser.firstName,
        lastName: selectedUser.lastName,
        age: selectedUser.age,
      });
      setUsers(users.map((user) => (user.id === selectedUser.id ? updatedUser : user)));
      setSelectedUser(null);
    }
  };

  const handleDeleteUser = async (id: number) => {
    const deletedUser = await deleteUser(id);
    setUsers(users.filter((user) => user.id !== id));
    console.log('User deleted:', deletedUser);
  };

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedUser((prevUser) => prevUser ? ({ ...prevUser, [name]: value }) : null);
  };

  return (
    <div>
      <UserForm onUserAdded={handleUserAdded} />
      {selectedUser && (
        <div>
          <h3>Update User</h3>
          <input
            type="text"
            name="firstName"
            value={selectedUser.firstName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="lastName"
            value={selectedUser.lastName}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="age"
            value={selectedUser.age}
            onChange={handleInputChange}
          />
          <button onClick={handleUpdateUser}>Update User</button>
        </div>
      )}
      <div>
        <h3>Users List</h3>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{`${user.firstName} ${user.lastName}, Age: ${user.age}`}
              <button onClick={() => handleEditClick(user)}>Edit</button>
              <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserManager;
