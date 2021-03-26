import React, { useState } from 'react';
import {Input} from 'antd'
import {SearchOutlined } from '@ant-design/icons'
import ProfileCard from './ProfileCard';
import {debounce} from 'lodash';
import {useLocation} from "react-router-dom";


function Search(props){
    var location = useLocation();

    const [results,setResults] = useState( null)
    const [ searchArg, setSearchArg] = useState("")

    // On input change make api call and set the new results 
    const handleInputChange = (event) => {
        // If the search bar is not empty 
        if( event.target.value != "")
            getSearchResults(event.target.value)

        setSearchArg(event.target.value)
    };

    // Makes api call for first 10 users that contain given string 
    const getSearchResults = (username) =>{
        // Call Accounts controller with username parameter 
        fetch(`${process.env.REACT_APP_API_URL}Accounts?username=${username}` , {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${location.state.token}`
            } })
            // Convert response to json
            .then(response => response.json())
            // set The result set to be the new data 
            .then(data => {
                setResults(data)
            }) 
            // Handles error 
            .catch(error => console.log(error))
    }
    // Handles logic of what results to render and when to make Calls
    const renderSearchResults = () => {
        // If we have some results and search bar is not empty
        if (results != null && searchArg != "")    
            {
                // Filter results by the search parameters
                const filteredResults = results.filter(result => 
                            result.username.toLowerCase().includes(searchArg.toLowerCase()))
                
                // If after the filter the result set is empty 
                if( filteredResults.length < 0)
                    // Get more results
                    getSearchResults()
                else
                    // Map the results
                    return ( 
                    <>{ 
                        filteredResults.map( (result) => 
                        { 
                            // Create a ProfileCard for each result passing the result Click handler
                            return (
                                <ProfileCard handleCardClick={props.handleShowUserProfile} accountId={result.accountId} value={result} username={result.username}></ProfileCard>)
                        } )
                    } </> );
            }
        }
    
    // Returns the page with input and any results 
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