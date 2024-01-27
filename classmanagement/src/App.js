import React from 'react';

import './App.css';

import Dashboard from './components/dashboard/dashboard';
import SubjectsTbl from './components/student-subjects/SubjectsTbl';
  
import Login from './login/Login';

function App() {
  return (
    
     

      <div className="App">
        <header className="App-header">
          <Login />
          
          <Dashboard />
          
        </header>
      </div>

   



  );
}
export default App;
