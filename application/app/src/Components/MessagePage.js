import React, {useState, useEffect, useRef } from 'react';
import 'antd/dist/antd.css';
import { Menu, Layout} from 'antd';
import { MessageOutlined, PlusOutlined } from '@ant-design/icons';
import Message from './Message';
import CreateMessage from './CreateMessage';
import UserCircle from './UserCircle';
import {useLocation} from "react-router-dom";

const { Content, Sider } = Layout;

function MessagePage(props){

    var location = useLocation();

    const [currentTab, setCurrentTab]  = useState("Messages");

    

    const handleClick = e => {
        setCurrentTab(e.key)
    }

    const handleChangeTab = (args) => {
        setCurrentTab("Messages")
    }

    const renderCurrentTab = () =>{
        
        switch(currentTab){
            case "New Message":
                return( 
                    <div className="site-layout-content">
                        Your Circle
                        <UserCircle accountId={location.state.accountId} handleCardClick = {handleChangeTab}/>
                    </div>
                )
            case "Messages":
                return( 
                    <div className="site-layout-content">
                        <Message/>
                        <br/>
                        <CreateMessage/>
                    </div>
                )
        }
    }

    return(

        <Layout>
            <Content style={{ padding: '0 50px' }}>
            <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                <Sider className="site-layout-background" width={200}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%' }}
                >
                <Menu.ItemGroup key="g1" title="Direct Messages">
                    <Menu.Item onClick={handleClick} key="New Message" icon={<PlusOutlined/>}>New Message</Menu.Item>
                    <Menu.Item onClick={handleClick} key="Messages" icon={<MessageOutlined />}>Messages</Menu.Item>
                </Menu.ItemGroup>
                </Menu>
                </Sider>
                <Content style={{ padding: '0 24px', minHeight: 280 }}>
                    {renderCurrentTab()}
                </Content>
            </Layout>
            </Content>
        </Layout>

      
    )
}
export default MessagePage;