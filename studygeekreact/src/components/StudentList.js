import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import StudentCard from './StudentCard';


const StudentList =() => {
    const [students, setStudents] = useState("");
    const getStudents = async() => {
        try {
            const { data } = await axios.get('http://localhost:3008/students');
            setStudents(data);
        }catch(e){
            console.log(e);
        }
    };

    useEffect(() => {
        getStudents();
    }, []);

    return (
        <div className='App-body'>
            <ul>
                {students && students.map((student) => (
                    <li key={student.id}>
                        <StudentCard />
                        <Link to={`/students/${student.id}`}>{student.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default StudentList;
