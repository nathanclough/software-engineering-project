import React, { useState, useRef } from 'react';
import {useLocation} from "react-router-dom";
import {throttle} from 'lodash';
import ProfileCard from './ProfileCard';
import {Button} from 'antd'


function Requests (props){
    var location = useLocation();

    const [requests, setRequests] = useState(null)

    const requestButton = <>
                            <Button>Accept</Button>
                            <Button>Decline</Button>
                        </>

    // ping the api every 30 seconds for more requests
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
                                    key={i}>
                                        Pending
                                </ProfileCard>)
                    else{
                        // Render an incoming request 
                        return(<ProfileCard
                                    username={result.senderUsername}
                                    accountId={result.senderId}
                                    key={i}
                                    children={requestButton}>
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