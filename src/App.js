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
    return <div>Loading...</div>;
  }

  // Main JSX render
  return (
    // Outer container: center horizontally, top-aligned
    <div className="app-root" >
      {/* Card wrapper */}
      <div className="card">

        {/* Dashboard title */}
        <h2 className="card-title">
         USER DASHBOARD
        </h2>

        {/* Search input field */}
        <input
          type="text"
          placeholder="Search by name, email, or company"
          value={search} // Bind to search state
          onChange={(e) => setSearch(e.target.value)} // Update search state on input change
          className="search-input"
        />

        <div className="table-wrapper">

         
          <table class='users-table'>
            <colgroup>
              <col style={{ width: '20%' }} />
              <col style={{ width: '20%' }} />
              <col style={{ width: '20%' }} />
              <col style={{ width: '20%' }} />
              <col style={{ width: '20%' }} />
            </colgroup>

            {/* Table header */}
            <thead className='users-table thead'>
              <tr>
                {/* Map header names to table cells */}
                {['Name', 'Username', 'Email', 'Company', 'Phone No'].map(h => (
                  <th
                    key={h}
                    className='users-table th'>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table body */}
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan="5" 
                    className='no-results'>
                    No results found
                  </td>
                </tr>
              ) : (
                // Map filtered users to table rows
                filteredUsers.map(u => (
                  <tr
                    key={u.id} // Unique key for React list rendering
                    className="users-table tr"
                    onMouseEnter={e => (e.currentTarget.style.background = '#F3F4F6')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td className="users-table td">{u.name}</td>
                    <td className="users-table td">{u.username}</td>
                    <td className="users-table td">{u?.email || 'N/A'}</td>
                    <td className="users-table td">{u.company?.name || 'N/A'}</td>
                    <td className="users-table td">{u.phone || 'N/A'}</td>
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