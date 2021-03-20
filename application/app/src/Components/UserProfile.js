import React, { useState } from 'react';
import { Layout, Menu, Button, notification} from 'antd';
import ProfileCard from './ProfileCard';
import {useLocation} from "react-router-dom";
import { getDefaultNormalizer } from '@testing-library/dom';

const { Header, Footer, Sider, Content } = Layout;

function UserProfile(props){
    var location = useLocation();
    const [currentTab, setCurrentTab]  = useState("About");
    
    const[account, setAccount] = useState(null);

    const RetrieveAccountInfo = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}Accounts/${props.accountId}`, {
            method: 'GET',
    
            headers: {
              'Content-Type': 'application/json',
              
            },
            })

            response.json().then(
                data =>{
                    setAccount(data)
                }
            ).catch( data => { 
              console.log(data);
          });
        
          // This can eventually be set based on an account field
          setShowRequest(true);

          // Make api call to get post information


    }

    const handleClick = e => {
        // TODO: add the user name to the notification
        setCurrentTab( account.username)
    }

    const handleRequestClick = () => {
        console.log(`SenderId:${location.state.accountId}\n 
                    RecipientId:${account.accountId}`)
        setShowRequest(false)
        notification.open({
            message:   `Request sent to ${account.username}`
        });
    }
    
    const [ showRequest, setShowRequest] = useState(true)

    const renderCurrentTab = () =>{
        switch(currentTab){
            case "About":
                return( <div className="site-layout-content">About</div>)
            case "Posts":
                return( <div className="site-layout-content">Posts</div>)
            case "Circle":
                return( <div className="site-layout-content">Circle</div>)
        }
    }

    const RequestButton = () => {
        if(showRequest)
        {
           return <Button className="request-btn" onClick={ handleRequestClick}>Join Circle</Button>
        }
    } 

    if(account != null && account.accountId == props.accountId){
        return (
            <Layout className="layout">
                <ProfileCard username={account.username} children={RequestButton()} showRequest={showRequest} handleRequestClick={handleRequestClick}/>
                <Header>
                    <Menu theme="light" mode="horizontal" defaultSelectedKeys={["About"]} >
                        <Menu.Item onClick={handleClick} key="Posts">Posts</Menu.Item>
                        <Menu.Item onClick={handleClick} key="Circle">Circle</Menu.Item>
                        <Menu.Item onClick={handleClick} key="About">About</Menu.Item>
                    </Menu>
                </Header>

                <Content>
                    {renderCurrentTab()}
                </Content>
            </Layout>
        );
    }
    else{
        RetrieveAccountInfo()
        return (<div></div>)
        
    } 
} 
export default UserProfile