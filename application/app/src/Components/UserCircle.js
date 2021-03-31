import React, { useState, useEffect, useRef } from 'react';
import 'antd/dist/antd.css';
import { List } from 'antd';
import ProfileCard from './ProfileCard';
import {useLocation} from "react-router-dom";

function UserCircle (props) {  
  const [circle,setCircle] = useState([])
  // Stores state of the application 
  // has accountId, username, and token properties
  var location = useLocation();
  
  const mounted = useRef(true)

  // Controls API call for posts 
  useEffect( () =>{
    mounted.current = true;
    GetCircle().then( data => {
        if(mounted.current){
            setCircle(data)
        }
    })
    return () => mounted.current = false;
    }, [props.accountId])

  // Makes API call to get information for the account in view
  const GetCircle = async () => {
    // Calls /Accounts/{id}
    return fetch(`${process.env.REACT_APP_API_URL}Accounts/Circle?id=${props.accountId}`, {
        method: 'GET',
        
        // Specify body content as json
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${location.state.token}`
        },
        }).then(data => data.json()).catch( data => data.json());
  }

  return (
    <List
    itemLayout="horizontal"
    dataSource={circle}
    renderItem={(item, i) => (
      <List.Item>
        <ProfileCard username={item.username}key = {i}/>
      </List.Item>
    )}
  />
  )
};
export default UserCircle;