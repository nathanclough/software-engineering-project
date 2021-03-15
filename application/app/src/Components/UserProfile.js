import React, { useState } from 'react';
import { Layout, Menu, Button, notification} from 'antd';
import ProfileCard from './Card';

const { Header, Footer, Sider, Content } = Layout;

function UserProfile(props){
    
    const [currentTab, setCurrentTab]  = useState("About");
    
    const handleClick = e => {
        // TODO: add the user name to the notification
        setCurrentTab( e.key)
    }

    const handleRequestClick = () => {
        console.log("sent request to api")
        setShowRequest(false)
        notification.open({
            message: 'Request sent to (username goes here)'
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
    const renderRequestButton = () =>{
        // TODO check if the viewer has the profile in the circle already and reder based on this 
        if( showRequest)
            return <Button className="request-btn" onClick={handleRequestClick}>Join Circle</Button>
    }

    return (
        <Layout className="layout">
            <ProfileCard username={props.accountId}/>
                {renderRequestButton()}
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