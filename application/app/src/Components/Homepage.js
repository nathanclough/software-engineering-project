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
    <img src={logo} className="logo" />
    <Menu style={{backgroundcolor: 'red'}} theme="light" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
    </Header>
    <Layout style={{padding: '5px 0px'}}>
    <Sider theme="light" >
        side bar 
    </Sider>
    <Content style={{ padding: '25px 25px' }}>
      <div className="site-layout-content">Content</div>
    </Content>
    </Layout>
    <Footer className="site-layout-footer"style={{ textAlign: 'center' }}>Inner Circle ©2021 </Footer>
  </Layout>
        </>
    );
}

export default Homepage