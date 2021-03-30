import React, { useState, useRef } from 'react';
import {useLocation} from "react-router-dom";
import {throttle} from 'lodash';
import ProfileCard from './ProfileCard';
import {Button} from 'antd';
import {CheckOutlined, CloseOutlined } from '@ant-design/icons';


function Requests (props){
    var location = useLocation();

    const [requests, setRequests] = useState(null)

    const requestButton = (requestId) => {
        return <>
            <Button onClick={ (e) => requestResponse(requestId, 'Accepted')} icon={<CheckOutlined />}>Accept</Button>
            <Button onClick={ (e) => requestResponse(requestId, 'Denied')} danger={true} icon={<CloseOutlined />}></Button>
        </>
    } 

    const requestResponse = (requestId, response) => {
        console.log(`API call to update request ${requestId} as ${response}`)
        fetch(`${process.env.REACT_APP_API_URL}Request/respond?requestID=${requestId}&status=${response}`, {
            method: 'POST',
            headers: {'Authorization': `Bearer ${location.state.token}`}
        }).then( console.log("success")).catch( data => console.log(data.json()))
    }

    // ping the api every 15 seconds for more requests
    const getRequests = useRef(throttle ( async () =>{
        // Make API call to the /Request endpoint 
        console.log("api call");
        const response = await fetch(`${process.env.REACT_APP_API_URL}Request`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${location.state.token}`
            }
            }).then(response => response.json())
            // set The result set to be the new data 
            .then(data => {
                setRequests(data)
            }) 
            // Handles error 
            .catch(error => console.log(error))
    } , 15000)).current;

    const renderRequests = () =>
    {        
        getRequests()
        if(requests == null){
            return ( <div>None</div>)
        }
        else{
 
            return (
                <>
                <h2>Requests</h2>
                <div className="side-bar requests">
                {requests.map( (result, i) => 
                {
                    if(result.senderId == location.state.accountId) 
                        // Render user sent pending request
                        return ( <ProfileCard 
                                    accountId={result.recepientId} 
                                    username={result.recepientUsername}
                                    key={i}
                                    requestId={result.requestId}
                                    handleCardClick={props.handleShowUserProfile}>
                                        Pending
                                </ProfileCard>)
                    else{
                        // Render an incoming request 
                        return(<ProfileCard
                                    username={result.senderUsername}
                                    accountId={result.senderId}
                                    key={i}
                                    children={requestButton(result.requestId)}
                                    requestId={result.requestId}
                                    handleCardClick={props.handleShowUserProfile}>
                                </ProfileCard>)
                    }
                } )}
                </div>
                </>
                )
        }
    }
    return(renderRequests())
}
export default Requests;