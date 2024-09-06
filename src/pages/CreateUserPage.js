import React, { useState } from "react";

export default function CreateUserPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setResponse(data);
      setError(null);
      setFormData({
        name: "",
        email: "",
        phone: "",
      }); // Clear form fields after successful submission
    } catch (err) {
      setError("Error submitting form");
      console.error("Error:", err);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-xl mt-20 md:mt-5">
      <h1 className="text-2xl font-bold mb-4">Create New User</h1>
      <div className="border-2 border-dotted p-5 border-black rounded-md ">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <button
            className="bg-black hover:bg-slate-950 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Display the response after form submission */}
      {response && (
        <div className="mt-4 bg-green-100 border-t border-b border-green-500 text-green-700 px-4 py-3">
          <p>User created successfully! Response: {JSON.stringify(response)}</p>
        </div>
      )}

      {/* Display error if any */}
      {error && (
        <div className="mt-4 bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
