import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import faker from 'faker';

const TutorCard = ({tutor}) => (
    <Card>
        <Card.Content>
            <Image 
            floated='left'
            size='mini'
            src={tutor.img || faker.image.avatar()}
            />
            <Card.Header>{tutor.firstName}</Card.Header>
            <Card.Meta>{tutor.town}</Card.Meta>
            <Card.Description>
                {tutor.tutorSubjects && tutor.tutorSubjects.map(sub => (
                    <li key={Math.random() * 100000}>{sub.subjectName}</li>
                ))}
            </Card.Description>
        </Card.Content>   
        <Card.Content>
            <div className='ui two buttons'>
            <Button basic color='green'>Request</Button>
            <Button basic color='blue' href = {`/tutors/${tutor._id}`} >Details</Button>                   
            </div>
        </Card.Content>
    </Card>
)


export default TutorCard


