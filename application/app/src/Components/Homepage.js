import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import Search from './UserSearch';
import UserProfile from './UserProfile';
import { Layout, Menu, Popover} from 'antd';
import logo from '../logo.png';
import ProfileCard from './ProfileCard';
import '../index.css';

const { Header, Footer, Sider, Content } = Layout;

function Homepage(props){
    var location = useLocation();
   
    const content = (
      <div>
        <Link to="/">Signout</Link>
      </div>
    );

    const [showUserProfile, setShowUserProfile] = useState({render: false,
    accountId :0});

    const handleShowUserProfile = (bool,accountId) => 
    {
      setShowUserProfile({render: bool, accountId: accountId})
    }

    const renderUserProfile = ()  =>
    {
      if( showUserProfile.render)
        return <UserProfile accountId={showUserProfile.accountId}/>
    }


    return(
        <>
    <Layout className="layout">
        {/* Navigation header  */}
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          
          {/* Hover to signout  */}
          <Popover content={content} placement="bottomLeft"
              title={location.state.username} trigger="hover">
                <img src={logo} className="logo" />
          </Popover>
          
          <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">Home</Menu.Item>
              <Menu.Item key="2">Circle</Menu.Item>
              <Menu.Item key="3">Messaging</Menu.Item>
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
              <Search handleShowUserProfile={handleShowUserProfile} className="side-bar search"/>
              <h2>Requests</h2>
            </div>
            </Sider>

            {/* Homepage content */}
            <Content style={{ padding: '2% 15%' }}>
            {renderUserProfile()}
            </Content>

        </Layout>
    <Footer className="site-layout-footer"style={{ textAlign: 'center' }}>Inner Circle ©2021 </Footer> 
    </Layout>

  </>
      );
}

export default Homepage