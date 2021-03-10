import React, { useState } from 'react';
import {Input,Icon} from 'antd'
import {SearchOutlined } from '@ant-design/icons'
import ProfileCard from './Card';
import { fixControlledValue } from 'antd/lib/input/Input';

// Dynamically shows first 10 users based on input 
function Search(){
    

    // On input change make api call and set the new results 
    const handleInputChange = (event) => {
        setSearchArg(event.target.value)
    };

    // Makes api call for first 10 users that contain given string 
    const getSearchResults = () =>{

    }
    const [results,setResults] = useState( [
        { username: "James", accountId : "12" },
        { username : "Bryce", accountId : "11" },
        { username  :"Walter", accountId : "10" },
        { username :"Michael", accountId : "9" },
        { username : "Journe", accountId : "8" },
        { username : "Nathan", accountId : "7" },
        { username : "Justin", accountId : "6" },
        { username : "Nick", accountId : "5" },
        { username : "Avery", accountId : "4" },
        { username : "Jordan", accountId : "3" },
        { username : "Alex", accountId : "2" }
    ])

    const [ searchArg, setSearchArg] = useState("")
    
    const renderSearchResults = () => {
        if (results != null && searchArg != "")    
            return ( 
                <>{ results.filter(result => 
                            result.username.toLowerCase().includes(searchArg.toLowerCase()))
                                .map( (result) => 
                                { 
                                    return (<ProfileCard username={result.username}></ProfileCard>)
                                } )
                    }
                </> );
        }

    return (
        <div className="side-bar search">
            <Input className="side-bar search input" prefix={<SearchOutlined className="site-form-item-icon"/>} placeholder="Users" loading onChange={handleInputChange}>
            </Input>
            <div className="side-bar search results">
            {renderSearchResults()}
            </div>
        
        </div>
    )
}
export default Search