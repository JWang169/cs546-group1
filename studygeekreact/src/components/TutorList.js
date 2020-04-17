import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class ShowList extends Component {
    constructor(props){
        super(props);
        this.state = { showsData: undefined};
    }

    async getTutors(){
        try{
            const {data} = await axios.get('http://localhost:3008/tutors');
            this.setState({tutorData : data});
        }catch(e){
            console.log(e);
        }
    }

    componentDidMount(){
        this.getTutors();
    }

    render(){
        return (
            <div className='App-body'>
                <ul>
                    {this.state.tutorData && this.state.tutorData.map((tutor) => (
                        <li key={tutor.id}>
                            <Link to={`/tutors/${tutor.id}`}>{tutor.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default ShowList;
