import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './components/dashboard/dashboard';
import SubjectsTbl from './components/student-subjects/SubjectsTbl';
import Login from './login/Login';
import SignUp from './signup/SignUp'

function App() {
  return (

      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/DashBoard" element={<Dashboard />} />
      </Routes>
  );
}

    
    
     

     

   




export default App;
