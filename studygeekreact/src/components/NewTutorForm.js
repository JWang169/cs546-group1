import React, {useState} from 'react';

const NewTutorForm = () => {
    const [tutor, setTutor] = useState('')
    const handleSubmit = (e) => {
        // the default event for submitting a form is refreshing the page. 
        e.preventDefault();
        console.log(tutor) 
    }
    return (
        <form onSubmit={handleSubmit}>
            <label>Tutor name: </label>
            <input type="text"  value={tutor} required onChange={(e) => setTutor(e.target.value)} />
            <input type="submit" value="add tutor" />
        </form>
    )
}

export default NewTutorForm;
