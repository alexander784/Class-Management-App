import React from 'react';
import SchoolLogo from '../../images/SchoolLogo.png'
import profile from '../../images/profile.svg'
import './dashboard.css'
import SubjectsTbl from '../student-subjects/subjectsTbl';

const Dashboard = () => {
    return (
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
                            <button>SUBJECTS</button>
                            <button>GRADES</button>
                            <button>MESSAGES</button>
                            <button>SCHEDULE</button>
                        </div>

                    </aside>
                    <div className='content'>
                        <SubjectsTbl />
                    </div>


                </div>
            </div>

        </div>
    );
}

export default Dashboard;
