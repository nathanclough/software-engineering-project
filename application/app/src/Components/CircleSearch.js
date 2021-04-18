import CreateMessage from './CreateMessage'
import React, {useState, useEffect, useRef } from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import {Input} from 'antd';
import {debounce} from 'lodash';
import { SearchOutlined } from '@ant-design/icons';
import {useLocation} from "react-router-dom";
import ProfileCard from './ProfileCard';
import AccountService from '../Services/AccountService'

function CircleSearch(props) {
    var location = useLocation();

    const [results, setResults] = useState( null)
    const [searchArg, setSearchArg] = useState("")

    // On input change make api call and set the new results 
    const handleInputChange = (event) => {
        // If the search bar is not empty 
        if( event.target.value != "")
            getSearchResults(event.target.value)

        setSearchArg(event.target.value)
    };

    // Makes api call for first 10 users that contain given string 
    const getSearchResults = (username) =>{
        AccountService.GetAccounts(username,location.state.token)
            .then(data => {
                setResults(data)
            }) 
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
                        filteredResults.map( (result, s) => 
                        { 
                            // Create a ProfileCard for each result passing the result Click handler
                            return (
                                <ProfileCard key={s} handleCardClick={props.handleSearchClick} accountId={result.accountId} value={result} username={result.username}></ProfileCard>)
                        } )
                    } </> );
            }
        }

    return (
        <div className="circle search">
            <Input className="circle search input" 
                prefix={<SearchOutlined className="site-form-item-icon"/>} 
                placeholder="Recepient" 
                loading="true" 
                onChange={debounce(handleInputChange, 250)}
            >
            </Input>
            <br/>
            <div className="circle search results">
                {renderSearchResults()}
            </div>
        </div>
    )
}
export default CircleSearch