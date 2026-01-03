import logo from './logo.svg';
import './App.css';
import React from 'react';

function App() {

  const [search, setSearch] = React.useState(''); //state for search input


  //JSX
  return (
    <div>
      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
      <h1>{search}</h1>
    </div>
  );
}

export default App;
