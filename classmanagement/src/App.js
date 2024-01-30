import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Dashboard from './components/dashboard/dashboard';

import SubjectsTbl from './components/student-subjects/SubjectsTbl';
import Login from './login/Login';
import SignUp from './signup/SignUp'

import RegisterSubject from './components/RegisterSubject/RegisterSubject';
import SubjectForm from './components/subjectForm/SubjectForm';
import Schedule from './components/schedule/Schedule';


function App() {
  return (

    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/DashBoard" element={<Dashboard />}>
        <Route path="subjects" element={<SubjectsTbl />} />
        <Route path="grades" element={<SubjectsTbl />} />
        <Route path="messages" element={<SubjectsTbl />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="register-subjects" element={<RegisterSubject />} />
        <Route path="add-subject" element={<SubjectForm />} />
        <Route path="view-subject" element={<SubjectForm />} />
      </Route>
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
}












export default App;
