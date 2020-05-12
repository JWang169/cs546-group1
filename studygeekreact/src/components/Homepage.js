import React, { useState } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const  Homepage = () => {

  const [activeItem2, setActiveItem2] = useState('')
  const handleItemClick2 = (e, { name }) => setActiveItem2(name);
  return (
    <div>
        <Menu compact icon='labeled'>
          <Menu.Item 
            name='student'
            active={activeItem2 === 'student'}
            onClick={handleItemClick2}
            as={Link}
            to='/searchtutors'
          >
            <Icon name='pencil' />
            Search Tutors.
          </Menu.Item>
          <Menu.Item 
            name='tutor'
            active={activeItem2 === 'tutor'}
            onClick={handleItemClick2}
            as={Link}
            to='/searchstudents'
          >
            <Icon name='bullhorn' />
            See all Students.
          </Menu.Item>
      </Menu>
    </div>
  );
}

export default Homepage;
