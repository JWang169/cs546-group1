import React, {useState} from 'react';

const PersonalPage = () => {
    // this is to creact the subject list 
    const [subjects, setSubjects] = useState([
        {
            name: 'Flying',
            level: 'Advanced'
        }
    ])
    const [subject, setSubject] = useState({name: '', level: ''});
    const onChange = (event) => {
        setSubject({...subjects, [event.target.name]: event.target.value});
    }
    const onSubmit = (event) => {
        event.preventDefault();
        if (subject.name.trim() === ''|| subject.level.trim() === '') return;
    }

    const newSubject = {
        name: subject.name.trim(),
        level: subject.level.trim(),
    }

    setSubjects([...subjects, newSubject]);

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h2>Add a subject: </h2>
                    <hr/>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <input
                            type="text"
                            className="form-control"
                            name="subject"
                            placeholder="Subject"
                            value={subject.name}
                            onChange={onChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                            type="text"
                            className="form-control"
                            name="level"
                            placeholder="level"
                            value={subject.level}
                            onChange={onChange}
                            />
                        </div>    
                        <button className="btn btn-success" type="submit">Add Subject</button>                   
                    </form>
                </div>
                <div className="col">
                    <h2>Subjects:  </h2>
                    <hr/>
                    {subjects.map(s => (
                        <div key={Math.random() * 100000}>
                            <p>{s.name} {s.level}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PersonalPage;