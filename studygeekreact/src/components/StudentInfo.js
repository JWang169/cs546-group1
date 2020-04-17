import React, { Component } from 'react';
import axios from 'axios';

class StudentInfo extends Component{
    constructor(props){
        super(props);
        this.state = { studentData: undefined };
    }

    async getStudent(){
        try{
            const {data} = axios.get('http://localhost:3008/students/${this.props.match.params.id');
            this.setState({studentData: data});
        }catch(e){
            console.log(e);
        }
    }
    componentDidMount(){
        this.getStudent();
    }

    render(){
        return (
            <div className='student-body'>
                <h1 className='cap-first-latter'>{(this.state.studentData && this.state.studentData.name)}</h1>
            </div>
        )
    }

}

export default StudentInfo;