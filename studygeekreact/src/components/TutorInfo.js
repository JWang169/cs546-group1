import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom';
import UserContext from './context/UserContext';

const TutorInfo = (props) => {
    console.log("this is from tutorinfo" + props.match.params.id)
    const {token, setToken} = useContext(UserContext);
    const [tokenInfo, setTokenInfo] = useState("");
    const history = useHistory();
    
    useEffect(() => {
        !token && history.push('/login') 
        token && getTutor();
        
    }, []);
    
    const decodeToken = () => {
        try{
            setTokenInfo(jwt_decode(localStorage.getItem("token")));
        }catch(e){
            setToken("");
        }      
    }
    
    // if (!token){
    //     console.log("no tokens");
    //     history.push('/login')
    // }
    
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [subjects, setSubjects] = useState("");
    const [availability, setAvailability] = useState("");
    const [state, setState] = useState("");
    const [town, setTown] = useState("");
    const [reviews, setReviews] = useState([]);
    const [score, setScore] = useState("");
    const [reviewContent, setReviewContent] = useState("");
    const [newScore, setNewScore] = useState(null);

    const requestTutor = async(e, index)=>{
        e.preventDefault();
        try{
            const reqInfo = {
                tutorId: props.match.params.id,
                studentId : tokenInfo.statusId,
                subject: subjects[index].subjectName,
                proficiency: subjects[index].proficiency
            }
            const { data } = await axios.post('http://localhost:3003/students/tutorPair/', reqInfo)
        }catch(e){
            console.log(e);
        }
    }

    const getTutor = async() => {
        console.log("GET TUTOR FUNC NOT WORKING")
        decodeToken();
        try{
            const { data } = await axios.get('http://localhost:3003/tutors/' + props.match.params.id);
            setLastName(data.lastName);
            setFirstName(data.firstName);
            setEmail(data.email);
            setState(data.state);
            setTown(data.town);
            setSubjects(data.tutorSubjects)
            setAvailability(data.availability)
            setScore(data.avgRating);
            const {r}  = await axios.get('http://localhost:3003/tutors/review/' + props.match.params.id); 
            setReviews(r);
            // console.log(data);

        }catch(e){
            console.log(e);
        }
    }
    // rate tutor 
    const rateTutor = async(event, index) => {
        event.preventDefault();
        try{
            const pairId = subjects[index].tutoredBy;
            console.log(pairId)
            const {data} = await axios.get('http://localhost:3003/students/findPair/' + pairId);
            const rateData = {
                tutorId: data.tutorId,
                studentId: data.studentSubjects,
                content: reviewContent,
                rating: score 
            }
            const rateUrl = `http://localhost:3003/tutors/review`;
            await axios.post(rateUrl, rateData)
            history.push('/myaccount');
        }catch(e){
            console.log(e)
        }
    }

    return (
        <div className="container">
            <h1>{firstName}'s Page.</h1>
            <br/>
            <hr/>
            <div className="row">
                <div className="col">
                    <h2>Subjects: </h2>
                    {subjects && subjects.map((s, index) => (
                        <div key={Math.random() * 100000}>
                                <h4>Subject: {s.subjectName}</h4>
                                <h4>Proficiency: {s.proficiency}</h4>
                                <h4>Price: {s.price}</h4>
                                <div>{ tokenInfo.status === 'students' && <button className='ui positive button' onClick={(e) =>requestTutor(e, index)}>Request Tutor</button>}</div>                        
                        </div>
                    ))}   
                { tokenInfo.status === 'students' && <form className="ui form">
                    <div className="default text" role="alert" aria-live="polite" aria-atomic="true">Leave a comment</div>
                    <textarea 
                    placeholder="How was your class?" 
                    rows="3"         
                    name={'review'}                            
                    value={reviewContent}
                    onChange={(e) => setReviewContent(e.target.value)}
                    required/>
                    <div className="default text">Rate Your Tutor</div>
                    <div className="ui input">
                        <input type="number" 
                        placeholder="5"
                        name={'score'}     
                        value={newScore}
                        onChange={(e) => setNewScore(e.target.value)}
                        required
                        />
                    </div>
                    <button className="ui positive button" onClick={(e) =>rateTutor(e)}>Submit Rating</button>  
                    </form> }           
                </div>

   
                

                <div className="col">
                    <h2>Reviews: </h2>
                    <h4>Average Rating: {score}</h4>
                    {reviews && reviews.map(s => (
                        <div key={Math.random() * 100000}>
                            <p>{s.content}</p>
                        </div>
                    ))}               
                </div>
                <div className="col">
                    <h2>Availability: </h2>
                    {availability && availability.map(s => (
                        <div key={Math.random() * 100000}>
                            <p>{s.day}, {s.startH}:{s.startM} - {s.endH}:{s.endM}</p>
                        </div>
                    ))}
                </div>

                <div className="col">
                    <h2>Contact Info: </h2>
                    <div className="form-group">First name: {firstName}</div>
                    <div className="form-group">Last name: {lastName}</div>
                    <div className="form-group">Email: {email}</div>
                    <div className="form-group">State: {state}</div>
                    <div className="form-group">Town: {town}</div>
                </div>
                
            </div>    
            <br/>
        </div>
    )

};

export default TutorInfo
