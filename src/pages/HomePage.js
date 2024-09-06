import { FilePenLine, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditUserModal from "../components/EditUserModal";

export default function HomePage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle Edit button click
  const handleEdit = (user) => {
    setEditingUser(user);
  };

  // Handle Update User
  const handleUpdate = (updatedUser) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  // Handle Delete button click
  const handleDeleteClick = (user) => {
    setDeletingUser(user); // Set the user to be deleted
    setShowDeleteConfirm(true);
  };

  // Confirm delete user
  const confirmDelete = async () => {
    try {
      await fetch(
        `https://jsonplaceholder.typicode.com/users/${deletingUser.id}`,
        {
          method: "DELETE",
        }
      );
      setUsers(users.filter((user) => user.id !== deletingUser.id));
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Cancel delete
  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setDeletingUser(null);
  };

  return (
    <div className="mx-2">
      <div className="mx-5 mt-10">
        <Link to="/create-user">
          <button className="px-3 py-1 bg-black rounded text-white font-semibold">
            Create a new User
          </button>
        </Link>
      </div>

      <div className="container mx-auto p-4 overflow-auto">
        <h1 className="text-center text-2xl font-bold mb-4">Users List</h1>

        {loading ? (
          <div className="flex justify-center items-center h-32">
            <p className="text-xl font-semibold">Loading...</p>
          </div>
        ) : (
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
                      className="text-black hover:bg-gray-300 font-medium p-1 mr-2 rounded"
                      onClick={() => handleEdit(user)}
                    >
                      <FilePenLine />
                    </button>
                    <button
                      className="text-red-600 hover:bg-red-200 font-medium py-1 px-2 rounded"
                      onClick={() => handleDeleteClick(user)}
                    >
                      <Trash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Show modal when editingUser is not null */}
      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onUpdate={handleUpdate}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && deletingUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Are you sure?</h2>
            <p className="mb-4">
              Do you really want to delete the user{" "}
              <strong>{deletingUser.name}</strong>? This process cannot be
              undone.
            </p>
            <div className="flex justify-end">
              <button
                className="mr-4 px-4 py-2 bg-gray-500 text-white rounded"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
