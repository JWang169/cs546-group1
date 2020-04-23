import React, {useState, useEffect} from 'react';
import axios from 'axios';

const PersonInfo = (props) => {
    const [student, setStudent] = useState(undefined);
    useEffect(() => {
        async function fetchData(){
            try{
                const {data} = await axios.get('http://localhost:3003/students/' + props.match.params.id);
                setStudent(data);
            }catch(e){
                console.log(e);
            }
        }
        fetchData();
    },
    [ props.match.params.id ]
   
    );

    return(
        <div>
            <p>This is personInfo page</p>
            <p>{student}</p>
            
        </div>
    )

};

export default PersonInfo
