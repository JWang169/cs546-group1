import axios from 'axios';
import React, { useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom';


// users can edit their personal information on this page 
// it works for both students and tutors 

const EditSub =() => {
    const [subjects, setSubjects] = useState([]);
    const [newSubjectName, setNewSubjectName] = useState("");
    const [proficiency, setProficiency] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [pair, setPair] = useState(null);
    const [isTutor, setIsTutor] = useState(false);
    const history = useHistory();


    const getAccount = async() =>{
        const tokenInfo = jwt_decode(localStorage.getItem("token"));
        // console.log(tokenInfo)
        const urlString = `http://localhost:3003/${tokenInfo.status}/${tokenInfo.statusId}`;
        try{
            const { data } = await axios.get(urlString);

            if(tokenInfo.status === 'students'){
                setSubjects(data.studentSubjects)
            }else{
                setSubjects(data.tutorSubjects);
                setIsTutor(true);
            }
        }catch(e){
            console.log(e)
        }
    };



    const addSubject = async(event) => {
        event.preventDefault();
        const tokenInfo = jwt_decode(localStorage.getItem("token"));
        const urlString = `http://localhost:3003/${tokenInfo.status}/createSubject`;
        const newInfo = {
            _id:tokenInfo.statusId,
            subjectName: newSubjectName,
            proficiency: proficiency,
            price: newPrice
        }
        console.log(newInfo)
        console.log(urlString);
        try{
            const {data} = await axios.post(urlString, newInfo)
            history.push('/myaccount');
        }catch(e){
            console.log(e);
        }
    }


    const onClickNoChange = (event) => {
        event.preventDefault();
        history.push('/myaccount');
    }

// delete subject connections from stud/tutor
    const deleteSubject = async(event, index) => {
        event.preventDefault();
        const pairId = subjects[index].tutoredBy;
        console.log(pairId)
        const delUrl = `http://localhost:3003/students/tutorPair/${pairId}`;
        try{
            const {data} = await axios.delete(delUrl)
            history.push('/myaccount');
        }catch(e){
            console.log(e);
        }
    }

    // rate tutor 
    const rateTutor = async(event, index) => {
        event.preventDefault();
        // const pairId = subjects[index].tutoredBy;
        // const rateData = {
        //     tutorId: ,
        //     studentId: ,
        //     content: ,
        //     rating: 
        // }
        // const rateUrl = `http://localhost:3003/tutors/review}`;
        // try{
        //     const {data} = await axios.post(rateUrl, rateData)
        //     history.push('/myaccount');
        // }catch(e){
        //     console.log(e);
        // }
    }

    // start a chat
    const chatSub = async(event, index) => {
        event.preventDefault();
        const pairId = subjects[index].tutoredBy;
        try{
            const {data} = await axios.get('http://localhost:3003/students/findPair/' + pairId);
            setPair(data);
            console.log(data)
            const tId = data.tutorId;
            const sId = data.studentId;
            const {chatRes} = await axios.get('http://localhost:3003/students/chat', {
                tutorId: tId,
                studentId: sId
            })

        }catch(e){
            console.log(e);
        }


    }


    useEffect(() => {
        getAccount()
    }, []);

    return (
        <div className="container">
            <h1>Edit My Subjects.</h1>
            <br/>
            <hr/>
            <div className='field'>
                <h3>My Subjects</h3>
                    {subjects && subjects.map((s, index) => (
                        <div key={Math.random() * 100000}>
                            <h2>{s.subjectName } - {s.proficiency} {isTutor && s.price} 
                            { !isTutor && <button className="ui primary button"onClick={(e) =>chatSub(e, index)}>Start a Chat</button>}{ !isTutor && <button className="ui negative button"onClick={(e) =>deleteSubject(e, index)}>Delete Subject</button>}</h2>
                            
                            { !isTutor && 
                            <form className="ui form">
                                <div className="default text" role="alert" aria-live="polite" aria-atomic="true">Leave a comment</div>
                                <textarea placeholder="How was your class?" rows="3"></textarea>
                                <div className="default text" role="alert" aria-live="polite" aria-atomic="true">Rate Your Tutor</div>
                                <div className="ui input"><input type="number" placeholder="5" /></div>
                                <button className="ui positive button" onClick={(e) =>rateTutor(e, index)}>Submit Rating</button>  
                            </form>
                            }
                 
                        </div>
                    ))}  
            </div>
            <hr/>
            <div className='field'>
            <form className="ui form">
            <div className="field">
                <div className='field'>
                <label>Add a subject</label>
                    <input
                    type="text"
                    name="subject"
                    value={newSubjectName}
                    onChange={(e) => setNewSubjectName(e.target.value)}
                    />
                </div>
                {isTutor &&<div className='field'>
                <label>Add Price</label>
                    <input
                    type="text"
                    name="price"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    />
                </div>}

                <div className="field">
                    <label>Your Proficiency</label>
                    <div className="form-check">
                        <label className="form-check-label">
                        <input 
                        type="radio" 
                        className="form-check-input" 
                        name="prof" 
                        onChange={(e) => setProficiency("Beginner")}
                        /> Beginner
                        </label>
                    </div> 
                    <div className="form-check">
                        <label className="form-check-label">
                        <input type="radio" 
                        className="form-check-input" 
                        name="prof"
                        onChange={(e) => setProficiency("Intermediate")}
                        /> Intermediate
                        </label>
                    </div> 
                    <div className="form-check">
                        <label className="form-check-label">
                        <input type="radio" 
                        className="form-check-input" 
                        name="prof"
                        onChange={(e) => setProficiency("Advanced")}
                        /> Advanced
                        </label>
                    </div>  
                </div>
            </div>    
            <button className="ui positive button" onClick={addSubject}>Add Subject</button>   
            <button className="ui button" onClick={onClickNoChange} style={{position: 'absolute', right: 50}}>Discard Change</button>
            </form>
            <br/>
            </div>

        </div>
    )
}

export default EditSub;
