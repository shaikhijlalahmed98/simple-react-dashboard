
import './App.css';
import React from 'react';

function App() {

  const [search, setSearch] = React.useState(''); //state for search input
  const users = [
  { id: 1, name: "Ali", email: "ali@test.com" },
  { id: 2, name: "Sara", email: "sara@test.com" }  ]; //sample user data



  //JSX
  return (
    <div>
      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
      //map through users and display them
      <ul>
        {users.map(user => (
  <div key={user.id}>
    {user.name} - {user.email}
  </div>
))}

      </ul>
    </div>
  );
}

export default App;
