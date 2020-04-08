import React from 'react';
import ReactDOM from 'react-dom';
import CommentDetail from './CommentDetail';
import ApprovalCard from './ApprovalCard';
import faker from 'faker';

const App = () =>{
    return (
        <div className="ui container comments">
            <ApprovalCard><CommentDetail author="Sybill Trelawney" timeAgo="Tuesday at 3:00 PM" content="Divination" avatar={faker.image.avatar()} /></ApprovalCard >
            <ApprovalCard><CommentDetail author="Alastor Moody" timeAgo="Wednesday at 12:00 PM" content="Defence Against the Dark Arts" avatar={faker.image.avatar()} /></ApprovalCard >
            <ApprovalCard><CommentDetail author="Minerva McGonagall" timeAgo="Everyday at 2:00 PM" content="Transfiguration" avatar={faker.image.avatar()} /></ApprovalCard >
            <ApprovalCard><CommentDetail author="Severus Snape" timeAgo="Wednesday at 12:00 PM" content="Potions" avatar={faker.image.avatar()} /></ApprovalCard >
            <ApprovalCard><CommentDetail author="Rolanda Hooch" timeAgo="Friday at 10:00 AM" content="Flying" avatar={faker.image.avatar()} /></ApprovalCard >
            
           
        </div>
    )
}

ReactDOM.render(<App/>, document.querySelector('#root'));
