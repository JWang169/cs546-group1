import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class StudentList extends Component {
    constructor(props){
        super(props);
        this.state = { showsData: undefined};
    }

    async getStudents(){
        try{
            const {data} = await axios.get('http://localhost:3008/students');
            this.setState({studentData : data});
        }catch(e){
            console.log(e);
        }
    }

    componentDidMount(){
        this.getStudents();
    }

    render(){
        return (
            <div className='App-body'>
                <ul>
                    {this.state.studentData && this.state.studentData.map((student) => (
                        <li key={student.id}>
                            <Link to={`/students/${student.id}`}>{student.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default StudentList;
