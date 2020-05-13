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

    useEffect(() => {
        getAccount()
    }, []);

    return (
        <div className="container">
            <h1>Edit My Subjects.</h1>
            <br/>
            <hr/>
            
            <form className="ui form">
            <div className="field">
                <div className='field'>
                <label>Subjects</label>
                    {subjects && subjects.map((s, index) => (
                        <div key={Math.random() * 100000}>
                            <p>{s.subjectName } - {s.proficiency} / {s.price}
                            { !isTutor && <button color='red' onClick={(e) =>deleteSubject(e, index)}>Delete</button>}
                            </p>
                        </div>
                    ))}  
                </div>

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
            <button className="ui negative button" onClick={onClickNoChange} style={{position: 'absolute', right: 50}}>Discard Change</button>
            </form>
            <br/>


        </div>
    )
}

export default EditSub;
