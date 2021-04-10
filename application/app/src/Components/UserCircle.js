import React, { useState, useEffect, useRef } from 'react';
import 'antd/dist/antd.css';
import { List } from 'antd';
import ProfileCard from './ProfileCard';
import {useLocation} from "react-router-dom";
import AccountService from '../Services/AccountService';

function UserCircle (props) {  
  const [circle,setCircle] = useState([])
  // Stores state of the application 
  // has accountId, username, and token properties
  var location = useLocation();
  
  const mounted = useRef(true)

  // Controls API call for posts 
  useEffect( () =>{
    mounted.current = true;
    AccountService.GetAccountCircle(props.accountId, location.state.token).then( data => {
        if(mounted.current){
            setCircle(data)
        }
    })
    return () => mounted.current = false;
    }, [props.accountId])

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