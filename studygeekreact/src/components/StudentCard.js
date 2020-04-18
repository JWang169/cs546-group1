import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';

const StudentCard = (student) => (
    <Card.Group>
        <Card>
            <Card.Content>
                <Card.Header>{student.name}</Card.Header>
                <Card.Description>{student.subjects}</Card.Description>
            </Card.Content>   
            <Card.Content>
                <div className='ui two buttons'>
                <Button basic color='green'>Contact</Button>
                <Button basic color='blue'>Details</Button>                    
                </div>
            </Card.Content>
        </Card>
    </Card.Group>
)


export default StudentCard