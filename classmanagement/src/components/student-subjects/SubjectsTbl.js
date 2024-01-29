import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './subjectsTbl.css';
import { useUser } from '../../UserContext';
// import RegisterSubject from '../RegisterSubject/RegisterSubject';
// import SubjectForm from '../SubjectForm/SubjectForm.js';

const SubjectsTbl = () => {
    // const subjects = [
    //     {
    //         id: 1,
    //         name: 'Mathematics',
    //         code: 'MAT101',
    //         lecturer: 'Dr. Smith',
    //         compulsory: true,
    //     },
    //     {
    //         id: 2,
    //         name: 'Computer Science',
    //         code: 'CSC202',
    //         lecturer: 'Prof. Johnson',
    //         compulsory: false,
    //     },
    //     {
    //         id: 3,
    //         name: 'Physics',
    //         code: 'PHY303',
    //         lecturer: 'Dr. Davis',
    //         compulsory: true,
    //     },
    //     {
    //         id: 4,
    //         name: 'History',
    //         code: 'HIS404',
    //         lecturer: 'Prof. Brown',
    //         compulsory: false,
    //     },
    //     {
    //         id: 5,
    //         name: 'Chemistry',
    //         code: 'CHE505',
    //         lecturer: 'Dr. White',
    //         compulsory: true,
    //     },
    //     {
    //         id: 6,
    //         name: 'Literature',
    //         code: 'LIT606',
    //         lecturer: 'Prof. Wilson',
    //         compulsory: false,
    //     },
    //     {
    //         id: 7,
    //         name: 'Economics',
    //         code: 'ECO707',
    //         lecturer: 'Dr. Miller',
    //         compulsory: true,
    //     },
    //     {
    //         id: 8,
    //         name: 'Psychology',
    //         code: 'PSY808',
    //         lecturer: 'Prof. Taylor',
    //         compulsory: false,
    //     },
    // ];
    const { currentUser } = useUser();

    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5555/subjects');
                if (!response.ok) {
                    throw new Error(`Failed to fetch subjects: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                setSubjects(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching subjects:', error);
                setLoading(false);
            }
        };

        fetchSubjects();
    }, []);

    if (loading) {
        return <p>Loading subjects...</p>;
    }




    function handleDrop(id) {
        // Handle drop logic
        console.log(`Dropping subject with ID ${id}`);
    }
    async function handleDelete(id) {
        // Handle delete logic
        if (window.confirm('Are you sure you want to delete this subject?')) {
            try {
                await fetch(`http://127.0.0.1:5555/subjects/${id}`, {
                    method: 'DELETE',
                });

                setSubjects((prevSubjects) => prevSubjects.filter((subject) => subject.id !== id));
            } catch (error) {
                console.error('Error deleting subject:', error);
            }
        }
    }

    return (
        <div>
            <div className='content'>
                <div className='table-head'>
                    <p>Your Subjects</p>
                    <div className='table-buttons'>
                        {!currentUser.is_instructor && <Link to='/DashBoard/register-subjects'>
                            <button>Register Subjects</button>
                        </Link>}
                        {currentUser.is_instructor && <Link to='/DashBoard/add-subject'>
                            <button>Add Subject</button>
                        </Link>}
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
                            {!currentUser.is_instructor && <th>Action</th>}
                            {currentUser.is_instructor && <th>Edit</th>}
                            {currentUser.is_instructor && <th>Delete</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {subjects.map((subject) => (
                            <tr key={subject.id}>
                                <td>{subject.id}</td>
                                <td>{subject.name}</td>
                                <td>{subject.code}</td>
                                <td>{subject.addedby}</td>
                                <td>{subject.compulsory ? 'Yes' : 'No'}</td>
                                {!currentUser.is_instructor && <td>
                                    <button onClick={() => handleDrop(subject.id)}>Drop</button>
                                </td>}
                                {currentUser.is_instructor && <td>

                                    <Link to={`/edit-subject/${subject.id}`}>
                                        <button>Edit</button>
                                    </Link>
                                </td>}
                                {currentUser.is_instructor && <td><button className='danger' onClick={() => handleDelete(subject.id)}>Delete</button></td>}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


export default SubjectsTbl;