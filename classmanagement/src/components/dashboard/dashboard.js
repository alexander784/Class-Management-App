import React from 'react';
import SchoolLogo from '../../images/SchoolLogo.png';
// import profile from '../../images/profile.svg';
import './dashboard.css';
import { Route, Routes, Link, Outlet } from 'react-router-dom';
import { useUser } from '../../UserContext';



const Dashboard = () => {
    const { currentUser } = useUser();
    return (
        <>
            <div>
                <div className='dashboard'>
                    <header>
                        <div className='logo'>
                            <img src={SchoolLogo} alt='school-logo' />
                        </div>
                        <div className='nav-content'>
                            <p>Cool School</p>
                            <div className='user-prof-log'>
                                <p>Hi, <span>{currentUser.username}</span></p>
                                <div className='logout'>
                                    {/* <img src={profile} alt='profile' /> */}
                                    <Link to='/' ><button>Log Out</button></Link>
                                </div>
                            </div>
                        </div>
                    </header>
                    <div className='dash-content'>
                        <aside>
                            <div className='button-list'>
                                {/* <Link to='/DashBoard'><button>DASHBOARD</button></Link> */}
                                <Link to='/DashBoard/subjects'><button>Courses</button></Link>
                                <Link to='/DashBoard/grades'><button>Grades</button></Link>
                                <Link to='/DashBoard/messages'><button>Messages</button></Link>
                                <Link to='/DashBoard/schedule'><button>Schedule</button></Link>


                            </div>

                        </aside>
                        
                            <Outlet />

                            {/* <div className='content'>
                            <div className='content-container'>
                            <p>Welcome Back! <br></br>
                            We are Deligthed to have you.</p>

                            </div>
                            </div> */}

                    </div>
                </div>

            </div>
        </>

    );
}

export default Dashboard;
