import React from 'react';
import { Link } from 'react-router-dom';
import './subjectsTbl.css';
// import RegisterSubject from '../RegisterSubject/RegisterSubject';
// import SubjectForm from '../SubjectForm/SubjectForm.js';

const SubjectsTbl = ({ isInstructor }) => {
    const subjects = [
        {
            id: 1,
            name: 'Mathematics',
            code: 'MAT101',
            lecturer: 'Dr. Smith',
            compulsory: true,
        },
        {
            id: 2,
            name: 'Computer Science',
            code: 'CSC202',
            lecturer: 'Prof. Johnson',
            compulsory: false,
        },
        {
            id: 3,
            name: 'Physics',
            code: 'PHY303',
            lecturer: 'Dr. Davis',
            compulsory: true,
        },
        {
            id: 4,
            name: 'History',
            code: 'HIS404',
            lecturer: 'Prof. Brown',
            compulsory: false,
        },
        {
            id: 5,
            name: 'Chemistry',
            code: 'CHE505',
            lecturer: 'Dr. White',
            compulsory: true,
        },
        {
            id: 6,
            name: 'Literature',
            code: 'LIT606',
            lecturer: 'Prof. Wilson',
            compulsory: false,
        },
        {
            id: 7,
            name: 'Economics',
            code: 'ECO707',
            lecturer: 'Dr. Miller',
            compulsory: true,
        },
        {
            id: 8,
            name: 'Psychology',
            code: 'PSY808',
            lecturer: 'Prof. Taylor',
            compulsory: false,
        },
    ];


   

    function handleDrop(id) {
        // Handle drop logic
        console.log(`Dropping subject with ID ${id}`);
    }
    function handleDelete(id) {
        // Handle drop logic
        console.log(`Deleting subject with ID ${id}`);
    }

    return (
        <div>
            <div className='content'>
                <div className='table-head'>
                    <p>Your Subjects</p>
                    <div className='table-buttons'>
                        <Link to='/DashBoard/register-subjects'>
                            <button>Register Subjects</button>
                        </Link>
                        <Link to='/DashBoard/add-subject'>
                            <button>Add Subject</button>
                        </Link>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Code</th>
                            <th>Lecturer</th>
                            <th>Compulsory</th>
                            <th>Action</th>
                            {isInstructor && <th>Edit</th>}
                            {isInstructor && <th>Delete</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {subjects.map((subject) => (
                            <tr key={subject.id}>
                                <td>{subject.id}</td>
                                <td>{subject.name}</td>
                                <td>{subject.code}</td>
                                <td>{subject.lecturer}</td>
                                <td>{subject.compulsory ? 'Yes' : 'No'}</td>
                                <td>
                                    <button onClick={() => handleDrop(subject.id)}>Drop</button>
                                </td>
                                {isInstructor && <td>

                                    <Link to={`/edit-subject/${subject.id}`}>
                                        <button>Edit</button>
                                    </Link>
                                </td>}
                                {isInstructor && <td><button onClick={() => handleDelete(subject.id)}>Delete</button></td>}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


export default SubjectsTbl;