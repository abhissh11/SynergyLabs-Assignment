import React, { useEffect, useState } from "react";

export default function HomePage() {
  const [users, setUsers] = useState([]);

  // Fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Handle Edit button click (for demonstration, can add logic)
  const handleEdit = (id) => {
    console.log("Edit user with id:", id);
    // You can navigate to an edit form or show a modal
  };

  // Handle Delete button click (for demonstration, can add logic)
  const handleDelete = (id) => {
    console.log("Delete user with id:", id);
    // You can remove the user from the state or call an API to delete it
  };

  return (
    <div className="container mx-auto p-4 overflow-auto ">
      <h1 className="text-2xl font-bold mb-4">Users List</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Phone</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border">{user.name}</td>
              <td className="py-2 px-4 border">{user.email}</td>
              <td className="py-2 px-4 border">{user.phone}</td>
              <td className="py-2 px-4 border flex justify-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-1 px-3 mr-2 rounded"
                  onClick={() => handleEdit(user.id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-medium py-1 px-2 rounded"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
