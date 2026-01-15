import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  // State management
  const [search, setSearch] = useState(''); // Track search input value
  const [users, setUsers] = useState([]); // Store fetched user data
  const [loading, setLoading] = useState(true); // Track loading state

  // Fetch users from public API on component mount
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users') //Promise to fetch user data
      .then(response => response.json()) // Parse JSON response
      .then(data => {
        setUsers(data); // Store fetched users
        setLoading(false); // Set loading to false
      })
      .catch(error => {
        console.error('Error fetching users:', error); // Log errors
        setLoading(false); // Set loading to false 
      })
  }, []); // Empty dependency array ensures this runs once on mount

  // Filter users by name, email, or company (case-insensitive) 
  // Normalize data to lowercase
  const filteredUsers = users.filter(user => {
    const name = (user.name || '').toLowerCase(); 
    const email = (user.email || '').toLowerCase(); 
    const company = (user.company?.name || '').toLowerCase(); 
    const searchLower = search.toLowerCase(); 
    
    // Return true if any field matches search query
    return name.includes(searchLower) || email.includes(searchLower) || company.includes(searchLower);
  });

  // Show loading state while fetching data
  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  // Main JSX render
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center pt-10">
      <div className="bg-white w-full max-w-6xl p-5 rounded border">

        <h2 className="text-lg font-semibold mb-3">
          User Dashboard
        </h2>

        <input
          type="text"
          placeholder="Search by name, email, or company"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full border rounded px-3 py-2 text-sm mb-4"
        />

        <div className="overflow-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                {["Name", "Username", "Email", "Company", "Phone"].map(h => (
                  <th
                    key={h}
                    className="text-left border-b py-2 font-medium"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-4 text-center text-gray-500">
                    No results found
                  </td>
                </tr>
              ) : (
                filteredUsers.map(u => (
                  <tr key={u.id} className="border-b hover:bg-gray-50">
                    <td className="py-2">{u.name}</td>
                    <td className="py-2">{u.username}</td>
                    <td className="py-2">{u.email}</td>
                    <td className="py-2">{u.company?.name || "N/A"}</td>
                    <td className="py-2">{u.phone}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}


export default App;