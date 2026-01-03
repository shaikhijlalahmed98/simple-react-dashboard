
import './App.css';
import React, { useEffect,useState } from 'react';

function App() {

  const [search, setSearch] = useState(''); //state for search input
  // const users = [
  // { id: 1, name: "Ali", email: "ali@test.com" },
  // { id: 2, name: "Sara", email: "sara@test.com" }  ]; //sample user data
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);


useEffect(() => {
  fetch('https://jsonplaceholder.typicode.com/users') //Public API for sample user data
    .then(response => response.json())
    .then(data => {
      setUsers(data);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching users:', error);
      setLoading(false);
    })},[]); // Empty dependency array means this effect runs once when the component builds.

if (loading) {
  return <div>Loading...</div>;
}


  //JSX
  return (
    <div >
      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.company?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    
    </div>
  );
}

export default App;
