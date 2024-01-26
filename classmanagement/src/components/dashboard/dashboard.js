import React from 'react';
import SchoolLogo from '../../images/SchoolLogo.png'
import profile from '../../images/profile.svg'
import './dashboard.css'

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
                    <aside></aside>
                    <div className='content'>
                    </div>


                </div>
            </div>

        </div>
    );
}

export default Dashboard;
