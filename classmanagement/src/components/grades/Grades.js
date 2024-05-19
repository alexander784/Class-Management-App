import React, { useEffect, useState } from 'react';

const Grades = () => {
    const [grades, setGrades] = useState([]);


    useEffect(() => {
        fetch('http://127.0.0.1:5000/grades')
        .then(response => response.json())
        .then(data => setGrades(data))
        .catch(error => console.error('Error fetching grades:',error));
    }, []);
    
  return (
    <div className='grades'>
        <h1>Grades</h1>
        <ul>
            {
                grades.map(grade => (
                    <li key={grade.id}>
                        Subject: 
                            {grade.usersubject},
                            Grade: 
                                {grade.grade}
                                Created At: {new Date(grade.created_at).toLocaleString()}
                    </li>
                ) )
            }
        </ul>
    </div>
  )
}

export default Grades;