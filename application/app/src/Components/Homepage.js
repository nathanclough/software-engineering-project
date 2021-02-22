import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { Layout, Menu, Space} from 'antd';
import logo from '../logo.png';
import '../index.css';

// To do : remove token on signout 

const { Header, Footer, Sider, Content } = Layout;

function Homepage(props){
    var location = useLocation();
    return(
        <>
    <Layout className="layout">
    <Header>
    <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']}>
        <img src={logo} className="logo" />
        <Menu.Item key="1">Home</Menu.Item>
        <Menu.Item key="2">Circle</Menu.Item>
        <Menu.Item key="3">Messaging</Menu.Item>
      </Menu>
    </Header>
    <Layout style={{padding: '5px 0px'}}>
    <Sider theme="light"
      breakpoint="lg"
      collapsedWidth="0"
    >
        side bar 
    </Sider>
    <Content style={{ padding: '25px 40px' }}>
      <div className="site-layout-content">Content</div>
    </Content>
    </Layout>
    <Footer className="site-layout-footer"style={{ textAlign: 'center' }}>Inner Circle ©2021 </Footer>
  </Layout>
        </>
    );
}

export default Homepage