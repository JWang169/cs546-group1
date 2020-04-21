import React, {useState} from 'react';

const Demo = () => {
    const [subjects, setSubjects] = useState([
        {
            name: 'Flying'  
        }, 
        {
            name: 'Potion' 
        }
    ])


    const [subject, setSubject] = useState({});
    const onChange = (event) => {
        setSubject({[event.target.name]: event.target.value});
    }

    const onSubmit = (event) =>{
        event.preventDefault();
        if(subject.name.trim() ==='') return;

        const newSubject = {
            name: subject.name.trim(),
        }

        setSubjects([...subjects, newSubject]);
    }

    // intro 这个是input的内容，就是用户在界面上的输入的内容
    const [intro, setIntro] = useState(""); 
    // 这个是onsubmit处理过的，要post到p tag里面的内容
    const [postVal, setPostVal] = useState("Your introduction");
    // onchange之后，setIntro(e.target.value)这步把intro变成了form里面输入的内容，所以onsubmit的时候就是为了把intro的值post到它该有的位置。
    const submitIntro = async(event) =>{
        event.preventDefault();
        setPostVal(intro);        
    }


    return (
        <div className="container">
            <h1>Junzhe's page.</h1>
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
                            placeholder="subject..."
                            value={subject.name}
                            onChange={onChange}
                            />
                        </div>
                        {/* <div className="form-group">
                            <input
                            type="text"
                            className="form-control"
                            name="lastName" 
                            placeholder="last name..."
                            value={subject.lastName}
                            onChange={onChange}
                            />
                        </div> */}
                        <button className="btn btn-success" type="submit">Add Subject</button>
                    </form>
                </div>
                <div className="col">
                    <h2>Subjects: </h2>
                    <hr/>
                    {subjects.map(s => (
                        <div key={Math.random() * 100000}>
                            <p>{s.name}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <h2>Add About me: </h2>
                    <hr/>
                    <form onSubmit={submitIntro}>
                        <div className="form-group">
                            <input
                            type="text"
                            className="form-control"
                            name="Introduction" 
                            placeholder="About you..."
                            value={intro}
                            onChange={(e) => setIntro(e.target.value)}
                            />
                        </div>
                
                        <button className="btn btn-success" type="submit">Update About me</button>
                    </form>
                    
                </div>
                <div className="col">
                    <h2>About Me: </h2>
                    <hr/>
                    <p>I am a muggle.</p>
                    <p>{postVal}</p>
                    
                </div>
            </div>
        </div>
    )
}

export default Demo;

