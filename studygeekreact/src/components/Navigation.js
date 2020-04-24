import React, { useState, useEffect } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";

function Navigation() {
    // check pathname and set active in nav bar
    const pathname = window.location.pathname;
    const path = pathname ==='/' ? 'home': pathname.substr(1);
    const [activeItem, setActiveItem ] = useState(path); 
    const [visitor, setVisitor] = useState(true)
    const handleItemClick = (e, { name }) => setActiveItem(name);

    useEffect(() => {
      const token = localStorage.getItem("token");
      console.log(token)
      if (token){
        const tokenInfo = jwt_decode(localStorage.getItem("token"));
        console.log('token not working')
        console.log(tokenInfo.expiresIn);
        if(tokenInfo.expiresIn > Date.now() / 1000){
          setVisitor(false);
          console.log('im in nav, and visitor is false now ');

        }
      }
    },[]);

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
          { 
            !visitor && <Menu.Menu position='right'>
              <Menu.Item
                name='mypage'
                active={activeItem === 'mypage'}
                onClick={handleItemClick}
                as={Link} 
                to='/demo'
              />
              <Menu.Item
              name='logout'
              active={activeItem === 'logout'}
              onClick={handleItemClick}
              as={Link}
              to='/logout'
            />
          </Menu.Menu>
          } 
          {
            visitor && <Menu.Menu position='right'>
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
          }
          
        </Menu>
      </div>
    )
    
  }
  

export default Navigation;
