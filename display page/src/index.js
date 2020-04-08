import React from 'react';
import ReactDOM from 'react-dom';
import CommentDetail from './CommentDetail';
import ApprovalCard from './ApprovalCard';


const App = () =>{
    return (
        <div className="ui container comments">
            <ApprovalCard><CommentDetail author="Claire" timeAgo="Everyday at 2:00 PM" content="Web Programming" /></ApprovalCard >
            <ApprovalCard><CommentDetail author="Joey" timeAgo="Tuesday at 3:00 PM" content="Chinese"/></ApprovalCard >
            <ApprovalCard><CommentDetail author="Mac" timeAgo="Wednesday at 12:00 PM" content="Database"/></ApprovalCard >
            <ApprovalCard><CommentDetail author="Kyle" timeAgo="Wednesday at 12:00 PM" content="Machine Learning"/></ApprovalCard >
            <ApprovalCard><CommentDetail author="Vic" timeAgo="Friday at 10:00 AM" content="Biology"/></ApprovalCard >
           
        </div>
    )
}

ReactDOM.render(<App/>, document.querySelector('#root'));
