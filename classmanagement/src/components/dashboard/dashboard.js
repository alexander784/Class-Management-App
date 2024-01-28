import React from 'react';
import SchoolLogo from '../../images/SchoolLogo.png';
import profile from '../../images/profile.svg';
import './dashboard.css';
import { Route, Routes } from 'react-router-dom';
import SubjectsTbl from '../student-subjects/SubjectsTbl';
import { Link } from 'react-router-dom';
import RegisterSubject from '../RegisterSubject/RegisterSubject';

import SubjectForm from '../subjectForm/SubjectForm';
import Schedule from '../schedule/Schedule';


const Dashboard = () => {
    return (
        <>


            <div>
                <div className='dashboard'>
                    <header>
                        <div className='logo'>
                            <img src={SchoolLogo} alt='school-logo' />
                        </div>
                        <div className='nav-content'>

                            <p>Moringa School</p>

                            <div className='user-prof-log'>
                                <p>Hi, <span>current_user</span></p>
                                <div className='logout'>
                                    <img src={profile} alt='profile' />
                                    <button>Log Out</button>
                                </div>

                            </div>

                        </div>
                    </header>
                    <div className='dash-content'>
                        <aside>
                            <div className='button-list'>

                                <Link to='/'><button>DASHBOARD</button></Link>
                                <Link to='/subjects'><button>SUBJECTS</button></Link>
                                <Link to='/grades'><button>GRADES</button></Link>
                                <Link to='/messages'><button>MESSAGES</button></Link>
                                <Link to='/schedule'><button>SCHEDULE</button></Link>
                                

                            </div>

                        </aside>
                        <div className='content'>
                            <Routes>
                            <Route path='/login' element={<Login/>} />
                                <Route path='/subjects' element={<SubjectsTbl />} />
                                <Route path='/register-subjects' element={<RegisterSubject />} />
                                <Route path='/add-subject' element={<SubjectForm />} />
                                <Route path='/view-subject' element={<SubjectForm />} />
                                <Route path='/schedule' element={<Schedule />} />
                            </Routes>
                        </div>


                    </div>
                </div>

            </div>
        </>

    );
}

export default Dashboard;
