import React from 'react';
import SchoolLogo from '../../images/SchoolLogo.png';
import profile from '../../images/profile.svg';
import './dashboard.css';
import { Route, Routes } from 'react-router-dom';
import SubjectsTbl from '../student-subjects/SubjectsTbl';
import { Link } from 'react-router-dom';
import RegisterSubject from '../RegisterSubject/RegisterSubject';

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
                                <button>DASHBOARD</button>
                                <Link to='/subjects'><button>SUBJECTS</button></Link>
                                <Link to='/grades'><button>GRADES</button></Link>
                                <Link to='/messages'><button>MESSAGES</button></Link>
                                <Link to='/schedule'><button>SCHEDULE</button></Link>

                            </div>

                        </aside>
                        <div className='content'>
                            <Routes>                                
                                <Route path='/subjects' element={<SubjectsTbl />} />
                                <Route path='/register-subjects' element={<RegisterSubject />} />
                            </Routes>
                        </div>


                    </div>
                </div>

            </div>
        </>

    );
}

export default Dashboard;
