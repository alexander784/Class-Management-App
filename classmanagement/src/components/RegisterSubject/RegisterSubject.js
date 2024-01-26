import React from 'react';
import { Link } from 'react-router-dom';
import './RegisterSubject.css'

const RegisterSubject = () => {

    const subjects = [
        { id: 1, name: 'Mathematics', code: 'MAT101', lecturer: 'Dr. Smith', year: 2022 },
        { id: 2, name: 'Computer Science', code: 'CSC202', lecturer: 'Prof. Johnson', year: 2022 },
        { id: 3, name: 'Physics', code: 'PHY303', lecturer: 'Dr. Davis', year: 2022 },

    ];

    function handleRegister(id) {

    }
    return (
        <>
            <div>
                <div className='searchBar'>
                    <label>Search: <input></input></label>
                    <Link to='/subjects'>Back to Subject</Link>
                </div>
                <div>
                    <div>
                        <h2>Subjects</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Code</th>
                                    <th>Lecturer</th>
                                    <th>Year</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {subjects.map(subject => (
                                    <tr key={subject.id}>
                                        <td>{subject.id}</td>
                                        <td>{subject.name}</td>
                                        <td>{subject.code}</td>
                                        <td>{subject.lecturer}</td>
                                        <td>{subject.year}</td>
                                        <td>
                                            <button onClick={() => handleRegister(subject.id)}>Register</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>

            </div>
        </>

    );
}

export default RegisterSubject;
