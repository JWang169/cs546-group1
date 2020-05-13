import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import faker from 'faker';

const StudentCard = ({student}) => (
    <Card>
        <Card.Content>
            <Image 
            floated='left'
            size='mini'
            src={student.img || faker.image.avatar()}
            />
            <Card.Header>{student.firstName}</Card.Header>
            <Card.Meta>{student.town}</Card.Meta>
            <Card.Description>
                {student.studentSubjects && student.studentSubjects.map(sub => (
                    <li key={Math.random() * 100000}>{sub.subjectName}</li>
                ))}
            </Card.Description>
        </Card.Content>   
        <Card.Content>
            <div className='ui two buttons'>
            {/* <Button basic color='green' >Contact</Button> */}
            <Button basic color='blue' href = {`/students/${student._id}`} >Details</Button>                    
            </div>
        </Card.Content>
    </Card>
)

export default StudentCard
