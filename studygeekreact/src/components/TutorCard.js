import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';

const TutorCard = (tutor) => (
    <Card.Group>
        <Card>
            <Card.Content>
                <Card.Header>tutor.name</Card.Header>
                <Card.Description>tutor.subjects</Card.Description>
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


export default TutorCard