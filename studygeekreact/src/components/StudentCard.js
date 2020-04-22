import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import faker from 'faker';

const StudentCard = ({student}) => (
    <Card>
        <Card.Content>
            <Image 
            floated='left'
            size='mini'
            src={student.img || faker.image.cats()}
            />
            <Card.Header>{student.name}</Card.Header>
            <Card.Meta>{student.education}</Card.Meta>
            <Card.Description>{student.info}</Card.Description>
        </Card.Content>   
        <Card.Content>
            <div className='ui two buttons'>
            <Button basic color='green' >Contact</Button>
            <Button basic color='blue' href = {`/students/${student._id}`} >Details</Button>                    
            </div>
        </Card.Content>
    </Card>
)

export default StudentCard
