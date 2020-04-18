import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import StudentCard from './StudentCard';
import noImage from '../img/header.jpeg';
import SearchBar from './SearchBar';

const StudentList =() => {
    const [searchData, setSearchData] = useState(undefined);
    const [showsData, setShowsData] = useState(undefined);
    const [searchTerm, setSearchTerm] = useState("");
    let li = null;
    let img = null;

    useEffect(() => {
        console.log('render');
        async function fetchData(){
            if (searchTerm) {
                const { data } = await axios.get('http://localhost:3008/students');
                setSearchData(data);
            }else{
                try{
                    const { data } = await axios.get('http://localhost:3008/students');
                    setShowsData(data);
                }catch(e){
                    console.log(e);
                }
            }
        }
        fetchData();
    },[searchTerm]);

    const searchValue = (value) => {
        setSearchTerm(value)
    };

    // const buildListItem = (student) =>{
    //     if (student.image & student.image.medium){
    //         img = <img alt='student' src={student.image.medium} />
    //     }else{
    //         img = <img alt='student' src={noImage} />;
    //     }
    //     return (
    //         <li key={student.id}>
    //             <Link to={'/students/${student.id'}>
    //                 {img} <br/>
    //                 {student.name}
    //             </Link>
    //         </li>);
    // }
    
    if (searchTerm){
        li = searchData && searchData.map((students) => {
            let { student } = students;
            return (<li key={student.id}>
            <Link to={'/students/${student.id'}>
                {img} <br/>
                {student.name}
            </Link>
        </li>);
        })
    }else{
        li = showsData && showsData.map((student) => {
            return   (<li key={student.id}>
                <Link to={'/students/${student.id'}>
                    {img} <br/>
                    {student.name}
                </Link>
            </li>);
        });
    }
    return (
        <div >
            <SearchBar searchValue={searchValue} />
        </div>
    )

}

export default StudentList;
