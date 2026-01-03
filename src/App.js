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
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center', 
      alignItems: 'flex-start', 
      paddingTop: '40px', 
      background: '#F4F6F8', 
      boxSizing: 'border-box'
    }}>
      {/* Card wrapper */}
      <div style={{
        width: '1200px', 
        padding: '20px',
        backgroundColor: '#FFFFFF', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '12px', 
        minHeight: '360px', 
        boxSizing: 'border-box',
        border: '1px solid #E5E7EB', 
        borderRadius: '6px' 
      }}>

        {/* Dashboard title */}
        <h2 style={{ marginBottom: 0, color: '#111827' }}>
         USER DASHBOARD
        </h2>

        {/* Search input field */}
        <input
          type="text"
          placeholder="Search by name, email, or company"
          value={search} // Bind to search state
          onChange={(e) => setSearch(e.target.value)} // Update search state on input change
          style={{
            width: '100%',
            padding: '8px 10px', 
            boxSizing: 'border-box',
            backgroundColor: '#FFFFFF',
            color: '#111827', 
            border: '1px solid #D1D5DB', 
            borderRadius: '4px', 
            fontSize: '14px' 
          }}
        />

        <div style={{
          flex: 1, 
          overflow: 'auto', 
          display: 'flex',
          flexDirection: 'column'
        }}>

         
          <table style={{
            width: '100%', 
            tableLayout: 'fixed',
            borderCollapse: 'collapse', 
            fontSize: '14px',
            color: '#111827'
          }}>
            <colgroup>
              <col style={{ width: '20%' }} />
              <col style={{ width: '20%' }} />
              <col style={{ width: '20%' }} />
              <col style={{ width: '20%' }} />
              <col style={{ width: '20%' }} />
            </colgroup>

            {/* Table header */}
            <thead style={{
              backgroundColor: '#F9FAFB', 
              color: '#111827'
            }}>
              <tr>
                {/* Map header names to table cells */}
                {['Name', 'Username', 'Email', 'Company', 'Phone No'].map(h => (
                  <th
                    key={h}
                    style={{
                      textAlign: 'left', 
                      padding: '10px 8px', 
                      fontWeight: 600, 
                      borderBottom: '1px solid #E5E7EB' 
                    }}
                  >
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
                    style={{
                      textAlign: 'center', 
                      padding: '16px', 
                      color: '#6B7280' 
                    }}
                  >
                    No results found
                  </td>
                </tr>
              ) : (
                // Map filtered users to table rows
                filteredUsers.map(u => (
                  <tr
                    key={u.id} // Unique key for React list rendering
                    style={{
                      borderBottom: '1px solid #E5E7EB' 
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#F3F4F6')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td style={{ padding: '8px' }}>{u.name}</td>
                    <td style={{ padding: '8px' }}>{u.username}</td>
                    <td style={{ padding: '8px' }}>{u?.email || 'N/A'}</td>
                    <td style={{ padding: '8px' }}>{u.company?.name || 'N/A'}</td>
                    <td style={{ padding: '8px' }}>{u.phone || 'N/A'}</td>
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