import React from 'react';
import CommentDetail from './CommentDetail';
import NameCard from './NameCard';
import faker from 'faker';


function Landing() {
  return (
    <div className="ui container comments">
        <h2>This is the landing page. All available tutors.</h2>      
      
          <NameCard><CommentDetail author="Sybill Trelawney" timeAgo="Tuesday at 3:00 PM" content="Divination" avatar={faker.image.avatar()} /></NameCard >
          <NameCard><CommentDetail author="Alastor Moody" timeAgo="Wednesday at 12:00 PM" content="Defence Against the Dark Arts" avatar={faker.image.avatar()} /></NameCard >
          <NameCard><CommentDetail author="Minerva McGonagall" timeAgo="Everyday at 2:00 PM" content="Transfiguration" avatar={faker.image.avatar()} /></NameCard >
          <NameCard><CommentDetail author="Severus Snape" timeAgo="Wednesday at 12:00 PM" content="Potions" avatar={faker.image.avatar()} /></NameCard >
          <NameCard><CommentDetail author="Rolanda Hooch" timeAgo="Friday at 10:00 AM" content="Flying" avatar={faker.image.avatar()} /></NameCard >
            

    </div>
  );
}

export default Landing;
