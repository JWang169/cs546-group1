import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function Navigation() {
    // check pathname and set active in nav bar
    const pathname = window.location.pathname;
    const path = pathname ==='/' ? 'home': pathname.substr(1);
  
    const [activeItem, setActiveItem ] = useState(path); 
    const handleItemClick = (e, { name }) => setActiveItem(name);
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
      </div>
    )
    
  }
  

export default Navigation;
