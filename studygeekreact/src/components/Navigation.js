import React, { useState } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function Navigation() {
    
    
    // check pathname and set active in nav bar
    const pathname = window.location.pathname;
    const path = pathname ==='/' ? 'home': pathname.substr(1);
  
    const [activeItem, setActiveItem ] = useState(path); 
    const handleItemClick = (e, { name }) => setActiveItem(name);
    const [activeItem2, setActiveItem2] = useState('')
    const handleItemClick2 = (e, { name }) => setActiveItem2(name);
    return (
      <div>
        <Menu pointing secondary size='massive' color='teal'>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as={Link}
            to='/'
          />
          <Menu.Menu position='right'>
            <Menu.Item
              name='signup'
              active={activeItem === 'signup'}
              onClick={handleItemClick}
              as={Link}
              to='/signup'
            />
            <Menu.Item
            name='login'
            active={activeItem === 'login'}
            onClick={handleItemClick}
            as={Link}
            to='/login'
          />
          </Menu.Menu>
        </Menu>
        <Menu compact icon='labeled'>
        <Menu.Item 
          name='student'
          active={activeItem2 === 'student'}
          onClick={handleItemClick2}
          as={Link}
          to='/searchtutors'
        >
          <Icon name='pencil' />
          I am a Student.
        </Menu.Item>
        <Menu.Item 
          name='tutor'
          active={activeItem2 === 'tutor'}
          onClick={handleItemClick2}
          as={Link}
          to='/searchstudents'
        >
          <Icon name='bullhorn' />
          I am a Tutor.
        </Menu.Item>
      </Menu>
      </div>
    )
    
  }
  

export default Navigation;
