import React, { useState } from 'react';
import {Input,Icon} from 'antd'
import {SearchOutlined } from '@ant-design/icons'





// Dynamically shows first 10 users based on input 
function Search(){
    const [results,setResults] = useState(null)

    // On input change make api call and set the new results 
    const handleInputChange = (event) => {
        var results = getSearchResults()
        setResults(results)
    };

    // Makes api call for first 10 users that contain given string 
    const getSearchResults = () =>{

    }

    const renderSearchResults = () => {
        if(results.size > 0){
            return ( <>{ results.map( (result) => { return (<h4>{result.username}</h4>)} )}</>) };
    }

    return (
            <Input prefix={<SearchOutlined className="site-form-item-icon"/>} placeholder="Users" loading onChange={handleInputChange}>
            </Input>
    )
}
export default Search