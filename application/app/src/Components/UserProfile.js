import React, { useState, useEffect, useRef } from 'react';
import { Layout, Menu, Button, notification} from 'antd';
import ProfileCard from './ProfileCard';
import UserCircle from './UserCircle';
import Post from './Post';
import {useLocation} from "react-router-dom";
import AccountService from '../Services/AccountService'
import RequestService from '../Services/RequestService'
import PostService from '../Services/PostService'
import { getDefaultNormalizer } from '@testing-library/dom';

const { Header, Footer, Sider, Content } = Layout;

function UserProfile(props){
    // Stores state of the application 
    // has accountId, username, and token properties
    var location = useLocation();
    
    const mounted = useRef(true)

    const [currentTab, setCurrentTab]  = useState("About");
    
    const[account, setAccount] = useState({});

    const[posts, setPosts] = useState([]);
    
    // Controls API call for account info 
    useEffect( () =>{
        mounted.current = true;
        AccountService.GetAccount(props.accountId, location.state.token)
        //RetrieveAccountInfo()
        .then( data => {
            if(mounted.current){
                console.log("call get account api")
                setAccount(data)
            }
        })
        return () => mounted.current = false;
    }, [props.accountId])

    // Controls API call for posts 
    useEffect( () =>{
        mounted.current = true;
        PostService.getPosts(props.accountId,location.state.token).then( data => {
            if(mounted.current){
                setPosts(data)
            }
        })
        return () => mounted.current = false;
    }, [props.accountId])

    // Handles change of UserProfileTab
    const handleClick = e => {
        setCurrentTab(e.key)
    }


    // Sends the API Request and removes the button on success
    const handleRequestClick = async () => {

        // Create the request body to a requestDTO   
        const request = { RecepientId:account.accountId,
                            SenderId: location.state.accountId }
        // Send the request 
        RequestService.SendRequest(request,location.state.token)
        .then( () => {
                var act = account
                act.requestable = false
                setAccount(act)
                
                // Create notification confirming request was sent 
                notification.open({
                    message:   `Request sent to ${account.username}`
                });
            }
        )
    }

    // Returns correct tab to render 
    // TODO: make corrisponding elements rather than empty divs
    const renderCurrentTab = () =>{
        const post = { username: "nathanc", Description: "This is a description of the post", MediaUrl: "../logo.png"}
        
        switch(currentTab){
            case "About":
                return( <div className="site-layout-content">About</div>)
            case "Posts":
                return( posts.map( (post, i) => {return <Post key={i} info={post}></Post>} )) 
            case "Circle":
                return( 
                    <div className="site-layout-content">
                        Circle
                        <UserCircle accountId={props.accountId}/>
                    </div>
                )
        }
    }

    // Creates a button to pass into the ProfileCard
    const RequestButton = () => {
        if(account.requestable)
        {
           return <Button className="request-btn" onClick={ handleRequestClick}>Join Circle</Button>
        }
    } 
    // Render the Page 
    return (
        <Layout className="layout">
            <ProfileCard username={account.username} children={RequestButton()} handleRequestClick={handleRequestClick}/>
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
export default UserProfile