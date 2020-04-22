import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import faker from 'faker';

const TutorCard = ({tutor}) => (
    <Card>
        <Card.Content>
            <Image 
            floated='left'
            size='mini'
            src={tutor.img || faker.image.cats()}
            />
            <Card.Header>{tutor.name}</Card.Header>
            <Card.Meta>{tutor.info}</Card.Meta>
            <Card.Description>{tutor.subjects}</Card.Description>
        </Card.Content>   
        <Card.Content>
            <div className='ui two buttons'>
            <Button basic color='green'>Contact</Button>
            <Button basic color='blue'>Details</Button>                    
            </div>
        </Card.Content>
    </Card>
)


export default TutorCard


