import logo from './logo.svg';
import './App.css';
import SearchPage from './Components/SearchPage';
import DetailPage from './Components/DetailPage';
import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import axios from "axios";
function App() {
const [detailId, setDetailId] = useState();

  return (
    
    <Router>
    <div className="App">
      <div className='header'>
        <h1>ANIME SEARCH APP</h1>
        </div>
    </div>
    <Routes>
      <Route path = "/" element = {<SearchPage/>}/>
      <Route path = "/details/:id" element = {<DetailPage/>}/>
    </Routes>
    </Router>
  );
}

export default App;
