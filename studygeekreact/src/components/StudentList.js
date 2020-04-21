import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import StudentCard from './StudentCard';
import { Card } from 'semantic-ui-react';

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
        <Card.Group>
                {students && students.map((student) => (
                <StudentCard student />
                ))}
        </Card.Group>
        </div>
    )
}

export default StudentList;
