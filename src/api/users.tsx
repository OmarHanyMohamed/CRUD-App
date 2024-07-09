// src/api/users.ts
const API_URL = "https://dummyjson.com/users";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  // Add other user fields as needed
}

export const addUser = async (user: User): Promise<User> => {
  const response = await fetch(`${API_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return response.json();
};

export const updateUser = async (id: number, user: Partial<User>): Promise<User> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT", // or "PATCH"
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return response.json();
};

export const deleteUser = async (id: number): Promise<User> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return response.json();
};
