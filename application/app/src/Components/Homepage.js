import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import Search from './UserSearch'
import { Layout, Menu, Popover} from 'antd';
import logo from '../logo.png';
import ProfileCard from './Card';
import '../index.css';

// To do : remove token on signout 

const { Header, Footer, Sider, Content } = Layout;


function Homepage(props){
    var location = useLocation();
    const content = (
      <div>
        <Link to="/">Signout</Link>
      </div>
    );
    return(
        <>
    <Layout className="layout">
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <Popover content={content} placement="bottomLeft"
              title={location.state.token} trigger="hover">
                <img src={logo} className="logo" />
              </Popover>
          <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">Home</Menu.Item>
              <Menu.Item key="2">Circle</Menu.Item>
              <Menu.Item key="3">Messaging</Menu.Item>
            </Menu>
      </Header>
        <Layout style={{padding: '75px 0px'}}>
          <Sider theme="light"
            breakpoint="lg"
            collapsedWidth="0"
            style={{ position: 'fixed', zIndex: 1, height: '100%',width: '100%' }}
          >
          <div className="side-bar">
            <Search className="side-bar search"/>
            <h2>Requests</h2>
          </div>
          </Sider>
          <Content style={{ padding: '2% 15%' }}>
            <div className="site-layout-content">Content</div>
          </Content>

        </Layout>
    <Footer className="site-layout-footer"style={{ textAlign: 'center' }}>Inner Circle ©2021 </Footer> 
    </Layout>

  </>
      );
}

export default Homepage