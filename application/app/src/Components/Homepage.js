import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import Search from './UserSearch';
import UserProfile from './UserProfile';
import UserCircle from './UserCircle';
import CreatePost from './CreatePost';
import Post from './Post';
import { Layout, Menu, Popover} from 'antd';
import logo from '../logo.png';
import Requests from './Requests';
import MessagePage from './MessagePage';
import '../index.css';
import Item from 'antd/lib/list/Item';

const { Header, Footer, Sider, Content } = Layout;

function Homepage(props){
    // Holds state variables: accountId, username, token
    var location = useLocation();
    const [showUserProfile, setShowUserProfile] = useState({render: false, accountId :0});
    const [currentTab, setCurrentTab]  = useState("Home");

    // Defines hover content for the top left logo
    const signoutHoverContent = (
      <div>
        <Link to="/">Signout</Link>
      </div>
    );
    
    const handleShowUserProfile = (bool,accountId) => 
    {
      setShowUserProfile({render: bool, accountId: accountId})
      console.log(showUserProfile)
    }

    // Handles change of UserProfileTab
    const handleTabChange = e => {
        setCurrentTab(e.key)
        setShowUserProfile(false,0)
    }

    // Returns correct tab to render 
    // TODO: make corrisponding elements rather than empty divs
    const renderCurrentTab = () =>{
      const post = { username: "nathanc", Description: "This is a description of the post", MediaUrl: "../logo.png"}
      
      if(showUserProfile.render){
        return( renderUserProfile())
      }

      switch(currentTab){
          case "Home":
              return( <div className="site-layout-content">Posts</div> )
          case "Account":
              return( <UserProfile accountId={location.state.accountId}/>) 
          case "Messaging":
              return( <MessagePage/>)
      }
  }

    // Renders a userprofile page based on the showUserProfileState
    const renderUserProfile = ()  =>
    {
      if( showUserProfile.render)
        return <UserProfile accountId={showUserProfile.accountId}/>
    }

    return(
        <>
    <Layout className="layout">
        {/* Navigation header  */}
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%'}}>
          
          {/* Hover to signout  */}
          <Popover content={signoutHoverContent} placement="bottomLeft"
              title={location.state.username} trigger="hover">
                <img src={logo} className="logo" />
          </Popover>
          
          {/* Main menu navigation  */}
          <Menu theme="light" mode="horizontal" defaultSelectedKeys={['Home']} >
              <Menu.Item onClick={handleTabChange} key="Home">Home</Menu.Item>
              <Menu.Item onClick={handleTabChange} key="Account">Account</Menu.Item>
              <Menu.Item onClick={handleTabChange} key="Messaging">Messaging</Menu.Item>
              <Menu.Item><CreatePost/></Menu.Item>
          </Menu>
          

        </Header>
        
        <Layout style={{padding: '75px 0px'}}>
            {/* SideBar */}
            <Sider theme="light"
              breakpoint="lg"
              collapsedWidth="0"
              style={{ position: 'fixed', zIndex: 1, height: '100%',width: '100%' }}
            >
            <div className="side-bar">
              {/* Create a search with specifying a handler for when results are clicked */}
              <Search handleShowUserProfile={handleShowUserProfile} className="side-bar search"/>
              <Requests handleShowUserProfile={handleShowUserProfile}/>
            </div>
            </Sider>

            {/* Homepage content */}
            <Content style={{ padding: '2% 15%' }}>
            {renderCurrentTab()}
            
            </Content>

        </Layout>
    <Footer className="site-layout-footer"style={{ textAlign: 'center' }}>Inner Circle ©2021 </Footer> 
    </Layout>

  </>
      );
}

export default Homepage