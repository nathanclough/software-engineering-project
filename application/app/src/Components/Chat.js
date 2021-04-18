import CreateMessage from './CreateMessage'
import React, {useState, useEffect, useRef } from 'react';
import {useLocation} from "react-router-dom";
import ProfileCard from './ProfileCard';
import AccountService from '../Services/AccountService'
import Message from './Message'
import 'antd/dist/antd.css';
import '../index.css';
import CircleSearch from './CircleSearch';
import { Menu } from 'antd';


function Chat(props){
    const[account, setAccount] = useState({});
    var location = useLocation();
    const mounted = useRef(true)

    const [newConversation, setNewConversation]  = useState(0);

    const messages = 
        [
            {
                SenderId: 2,
                RecepientId: 1,
                Content: "Hey there I am seeing if this will wrap the text or just ... it for messages",
                Time: "1:00am"
            },
            {
                SenderId:1,
                RecepientId: 2,
                Content: "Hi, how are you?",
                Time: "1:01am"
            }
        ]


    useEffect( () =>{
        mounted.current = true;
        if(props.accountId != 0)
        AccountService.GetAccount(props.accountId, location.state.token)
        .then( data => {
            if(mounted.current){
                setAccount(data)
            }
        })
        return () => mounted.current = false;
    }, [props.accountId])

    const handleSearchClick = (bool, id) => {
        props.setCurrentConversation(id)
    }

    const renderHeader = () =>{
        if(props.accountId == 0)
        {
            return (<div><CircleSearch handleSearchClick={handleSearchClick} className="circle search"/></div>)
        }
        else{
            return (
                <div>
                    <ProfileCard 
                        accountId={props.accountId} 
                        username ={account.username}
                    />
                    {messages.map( (message,i ) => {
                        var info = {}
                        // If the sender is not current user
                        if(message.SenderId == account.accountId){
                            info.username = account.username    
                        }
                        // sender is current user 
                        else{
                            info.username = location.state.username
                        }
                        info.time = message.Time
                        info.description = message.Content
                        return(<Message key={i} info={info}></Message>)
                    })}
                </div>
            )
        }
    }
    
    return(    
        <div>
            {renderHeader()}
            <br/>
            <CreateMessage/>
        </div>
    )

        
}

export default Chat