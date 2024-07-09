// src/components/UserForm.tsx
import React, { useState } from 'react';
import { addUser } from '../api/users';
import { User } from '../api/users';

interface UserFormProps {
  onUserAdded: (user: User) => void;
}

const UserForm: React.FC<UserFormProps> = ({ onUserAdded }) => {
  const [id, setId] = useState<number>(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = await addUser({ id, firstName, lastName, age });
    setId(id + 1);
    onUserAdded(newUser);
    setFirstName('');
    setLastName('');
    setAge(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <label>Age:</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
        />
      </div>
      <button type="submit">Add User</button>
    </form>
  );
};

export default UserForm;
