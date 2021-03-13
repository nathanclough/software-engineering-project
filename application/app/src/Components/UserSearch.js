import React, { useState } from 'react';
import {Input} from 'antd'
import {SearchOutlined } from '@ant-design/icons'
import ProfileCard from './Card';
import {debounce} from 'lodash';

function Search(){
    // On input change make api call and set the new results 
    const handleInputChange = (event) => {
        if( event.target.value != "")
            getSearchResults(event.target.value)
        setSearchArg(event.target.value)

    };

  
    // Makes api call for first 10 users that contain given string 
    const getSearchResults = (username) =>{
        fetch(`${process.env.REACT_APP_API_URL}Accounts?username=${username}`)
            .then(response => response.json())
            .then(data => {
                setResults(data)
            }) 
            .catch(error => console.log(error))
    }
    const [results,setResults] = useState( null)

    const [ searchArg, setSearchArg] = useState("")
    
    const renderSearchResults = () => {
        if (results != null && searchArg != "")    
            {
                const filteredResults = results.filter(result => 
                            result.username.toLowerCase().includes(searchArg.toLowerCase()))
                if( filteredResults.length < 0)
                    getSearchResults()
                else
                    return ( 
                    <>{ 
                                results.map( (result) => 
                                { 
                                    return (
                                        <ProfileCard  value={result} username={result.username}></ProfileCard>)
                                } )
                    }
                    </> );
            }
        }

    return (
        <div className="side-bar search">
            <Input className="side-bar search input" prefix={<SearchOutlined className="site-form-item-icon"/>} placeholder="Users" loading="true" onChange={debounce(handleInputChange, 250)}>
            </Input>
            <div className="side-bar search results">
            {renderSearchResults()}
            </div>
        
        </div>
    )
}
export default Search