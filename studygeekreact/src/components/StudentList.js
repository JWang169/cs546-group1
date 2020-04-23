import axios from 'axios';
import React, { useState, useEffect } from 'react';
import StudentCard from './StudentCard';
import { Card } from 'semantic-ui-react';

const StudentList =() => {
    const [students, setStudents] = useState(undefined);
    const getStudents = async() => {
        try {
            const { data } = await axios.get('http://localhost:3003/students');
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
                <StudentCard student={student} key={student._id} /> 
                )) }
        </Card.Group>
        </div>
    )
}

export default StudentList;
