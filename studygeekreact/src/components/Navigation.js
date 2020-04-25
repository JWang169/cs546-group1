import React, { useState, useEffect } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";

function Navigation(props) {
    // check pathname and set active in nav bar
    const pathname = window.location.pathname;
    const path = pathname ==='/' ? 'home': pathname.substr(1);
    const [activeItem, setActiveItem ] = useState(path); 
    const [visitor, setVisitor] = useState(true)
    const [token, setToken] = useState(props.token);
    const [userUrl, setUserUrl] = useState("");
    const handleItemClick = (e, { name }) => setActiveItem(name);

    useEffect(() => {
      if (token){
        setVisitor(false);
        const tokenInfo = jwt_decode(localStorage.getItem("token"));
        if(tokenInfo){
          setVisitor(false);
          const statusId = tokenInfo.statusId;
          const status = tokenInfo.status;
          const url = `/${status}/${statusId}`
          setUserUrl(url); 
          console.log(userUrl);
          // console.log(`im in nav, and user email is ${userEmail}`);
        }
      }
    },[token, userUrl]);

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
                name='My Page'
                active={activeItem === 'My Page'}
                onClick={handleItemClick}
                as={Link}
                to='/myaccount'
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
