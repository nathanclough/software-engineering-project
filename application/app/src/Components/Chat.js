import CreateMessage from './CreateMessage'
import React, {useState, useEffect, useRef } from 'react';
import {useLocation} from "react-router-dom";
import ProfileCard from './ProfileCard';
import AccountService from '../Services/AccountService'
import {throttle} from 'lodash';
import Message from './Message'
import 'antd/dist/antd.css';
import '../index.css';
import CircleSearch from './CircleSearch';
import { Menu } from 'antd';
import MessageService from '../Services/MessageService';
import { OmitProps } from 'antd/lib/transfer/ListBody';


function Chat(props){
    const[account, setAccount] = useState({});
    const[messages, setMessages] = useState(null);
    var location = useLocation();
    const mounted = useRef(true);

    const messages1 = 
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
    
    // ping the api every 1 second for more messages
    const getMessages = useRef(throttle ( async (id) =>{
        // Make API call to the /Request endpoint 
        MessageService.getMessages(id, location.state.token)
            // set The result set to be the new data 
            .then(data => {
                setMessages(data)
            }) 
            // Handles error 
            .catch(error => console.log(error))
    } , 1500)).current;

    useEffect( () =>{
        mounted.current = true;
        if(props.accountId != 0)
        {
        getMessages(props.accountId)
        AccountService.GetAccount(props.accountId, location.state.token)
        .then( data => {
            if(mounted.current){
                setAccount(data)
            }
        })
        return () => mounted.current = false;}
    }, [props.accountId])

    const sendMessage = (message) =>{
        var m = {
            RecepientId: props.accountId,
            SenderId: location.state.accountId,
            Message: message
        }
        MessageService.createMessage(m,location.state.token)
    }

    const handleSearchClick = (bool, id) => {
        props.setCurrentConversation(id)
    }

    const renderBody = () =>{
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
                    {renderMessages(props.accountId)}
                </div>
            )
        }
    }
    const renderMessages = () =>{
        if (messages !=null)
            return(<div> { messages.map( (message,i ) => {
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
                info.description = message.message
                return(<Message key={i} info={info}></Message>)
            })}</div>)
    }
    
    return(    
        <div>
            {renderBody()}
            <br/>
            <CreateMessage handleSubmit={sendMessage} accountId={props.accountId}/>
        </div>
    )

        
}

export default Chat