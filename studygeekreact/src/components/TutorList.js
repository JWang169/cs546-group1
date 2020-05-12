import axios from 'axios';
import React, { useState, useEffect } from 'react';
import TutorCard from './TutorCard';
import { Card } from 'semantic-ui-react';

const TutorList =() => {
    const [tutors, setTutors] = useState(undefined);
    const getTutors = async() => {
        try {
            const { data } = await axios.get('http://localhost:3003/tutors');
            setTutors(data);
            console.log(tutors)
        }catch(e){
            console.log(e);
        }
    };

    useEffect(() => {
        getTutors();
    }, []);

    return (
        <div className='App-body'>
        <Card.Group>
            {tutors && tutors.map((tutor) => (
                <TutorCard tutor={tutor} key={tutor._id}  />
                ))}
        </Card.Group>
        </div>
    )
}

export default TutorList;

