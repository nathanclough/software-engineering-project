import React, { useState } from 'react';
import { Layout, Menu, Button, notification} from 'antd';
import ProfileCard from './ProfileCard';
import {useLocation} from "react-router-dom";
import { getDefaultNormalizer } from '@testing-library/dom';

const { Header, Footer, Sider, Content } = Layout;

function UserProfile(props){
    // Stores state of the application 
    // has accountId, username, and token properties
    var location = useLocation();
    
    const [currentTab, setCurrentTab]  = useState("About");
    
    const[account, setAccount] = useState(null);

    const [ showRequest, setShowRequest] = useState(true)

    // Makes API call to get information for the account in view
    const RetrieveAccountInfo = async () => {
        // Calls /Accounts/{id}
        const response = await fetch(`${process.env.REACT_APP_API_URL}Accounts/${props.accountId}`, {
            method: 'GET',
            
            // Specify body content as json
            headers: {
              'Content-Type': 'application/json',
              
            },
            })

        response.json()
            // On success
            .then( data =>{
                // Update account state 
                setAccount(data)
                })
            // On Failure 
            .catch( data => { 
                // Log the error
                console.log(data);
        });
        
        // This can eventually be set based on an account field
        setShowRequest(true);

        // Make api call to get post information


    }

    // Handles change of UserProfileTab
    const handleClick = e => {
        setCurrentTab(e.key)
    }


    // Sends the API Request and removes the button on success
    const handleRequestClick = async () => {

        // Create the request body to a requestDTO   
        const request = { RecepientId:account.accountId,
                            SenderId: location.state.accountId }

        // Make API call to the /Request endpoint 
        // TODO: Add Auth headers 
        const response = await fetch(`${process.env.REACT_APP_API_URL}Requests`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              
            },
            // Set the Body as string of request 
            body: JSON.stringify(request)
            })

        response.json()
            // If request is fulfilled
            .then( () => {
                    // Make the button go away
                    setShowRequest(false)
                    
                    // Create notification confirming request was sent 
                    notification.open({
                        message:   `Request sent to ${account.username}`
                    });
                }
            )
            // If request throws error log error to the console
            .catch( data => { 
                console.log(data);
            });
    }
    // Returns correct tab to render 
    // TODO: make corrisponding elements rather than empty divs
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

    // Creates a button to pass into the ProfileCard
    const RequestButton = () => {
        if(showRequest)
        {
           return <Button className="request-btn" onClick={ handleRequestClick}>Join Circle</Button>
        }
    } 

    // If the account is loaded and the Id matches requested id 
    if(account != null && account.accountId == props.accountId){
        // Render the Page 
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
        // Make API call 
        RetrieveAccountInfo()
        // TODO: Return loading symbol rather than empty div
        return (<div></div>)
        
    } 
} 
export default UserProfile