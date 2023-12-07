import React from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Help from './components/Help';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GeneratePaper from './components/GeneratePaper';
import Navbar from './components/Navbar';
import PreviousPapers from './components/PreviousPapers';
import { Provider } from "react-redux";
import store from "./store";



function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<><Navbar /><Home /></>} />
          <Route path="/generate" element={<><Navbar /><GeneratePaper /></>} />
          <Route path="/previous_papers" element={<><Navbar /><PreviousPapers /></>} />
          <Route path="/help" element={<><Navbar /><Help /></>} />

        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
