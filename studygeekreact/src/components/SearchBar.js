import React, { useState } from "react";
import axios from "axios";

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [proficiency, setProficiency] = useState('');
    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };
    const submitInfo = async(event) =>{
        event.preventDefault();
        try{
            const urlString = `http://localhost:3003/students/searchTutor`;
            const tutorlList = await axios.get(urlString, {
                'startTime': startTime,
                'endTime': endTime,
                'subject': searchTerm,
                'proficiency': proficiency
            })
            
        }catch(e){
            console.log(e);
        }
    }

    return (
        <form className="ui form" onSubmit={submitInfo}>
            <div className="field">
            <label>Search by Subject</label>
            <input
            type='text'
            placeholder='search for subject'
            value={searchTerm}
            onChange={handleChange}
            required
            />
            </div>
            <div className="field">
            <label>Start time</label>
            <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => {
                setStartTime(e.target.value);
              }
            }
            />
            </div>
            <div className="field">
            <label>End time</label>
            <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => {setEndTime(e.target.value);}}
            />
            </div>

            <div className="field">
            <label>Your Proficiency</label>
            <div className="form-check">
                    <label className="form-check-label">
                    <input 
                    type="radio" 
                    className="form-check-input" 
                    name="optradio" 
                    onChange={(e) => setProficiency("Beginner")}
                    /> Beginner
                    </label>
            </div> 
            <div className="form-check">
                <label className="form-check-label">
                <input type="radio" 
                className="form-check-input" 
                name="optradio"
                onChange={(e) => setProficiency("Intermediate")}
                /> Intermediate
                </label>
            </div> 
            <div className="form-check">
                <label className="form-check-label">
                <input type="radio" 
                className="form-check-input" 
                name="optradio"
                onChange={(e) => setProficiency("Advanced")}
                /> Advanced
                </label>
            </div>   
            </div>      
            {/* <div className="form-check">
                <label>Sort By</label>
                <div className="form-check">
                <label className="form-check-label">
                <input type="radio" 
                className="form-check-input" 
                name="optradio"
                onChange={(e) => setProficiency("price")}
                /> Price
                </label>
                </div> 
                <div className="form-check">
                <label className="form-check-label">
                <input type="radio" 
                className="form-check-input" 
                name="optradio"
                onChange={(e) => setProficiency("rate")}
                /> Rating
                </label>
                </div> 
                </div> */}
            <br/>
            <button className='ui button' type='submit'>Search</button>
        </form>
    )

}

export default SearchBar;