import React from 'react';

import './App.css';

import Dashboard from './components/dashboard/dashboard';
import SubjectsTbl from './components/student-subjects/SubjectsTbl';
  
import Login from './login/Login';
import SignUp from './signup/SignUp'

function App() {
  return (
    
     

      <div className="App">
        <header className="App-header">
          <Login />
          {/* <SignUp /> */}
          
          {/* <Dashboard /> */}
          
        </header>
      </div>

   



  );
}
export default App;
