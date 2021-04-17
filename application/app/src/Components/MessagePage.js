import React, {useState, useEffect, useRef } from 'react';
import Chat from './Chat'
import 'antd/dist/antd.css';
import '../index.css';
import { Menu, Layout} from 'antd';
import { MessageOutlined, PlusOutlined } from '@ant-design/icons';
import Message from './Message';
import CreateMessage from './CreateMessage';
import UserCircle from './UserCircle';
import {useLocation} from "react-router-dom";
import ProfileCard from './ProfileCard';

const { Content, Sider } = Layout;

function MessagePage(props){

    var location = useLocation();

    const [currentConversation, setCurrentConversation]  = useState(0);

    const handleClick = e => {
        setCurrentConversation(e.key)
    }

    const handleChangeTab = (args) => {
        setCurrentConversation("Messages")
    }

    const convos = [
        {
            username: "k",
            accountId: 2
        },
        {
            username: "KUrbanczyk",
            accountId: 1
        }
    ]

    return(

        <Layout>
            <Content style={{ padding: '0 20px' }}>
            <Layout className="site-layout-background" style={{ padding: '12px 0' }}>
               {/* List of conversations */}
                <Sider className="site-layout-background" width={300}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%' }}
                >
                <Menu.ItemGroup key="g1" title="Direct Messages">
                    <Menu.Item onClick={handleClick} key={0} icon={<PlusOutlined/>}>New Message</Menu.Item>
                    {convos.map(c => {return(
                        <Menu.Item onClick={handleClick} key={c.accountId}><ProfileCard accountId={c.accountId} username={c.username}></ProfileCard></Menu.Item>
                    )})}
                </Menu.ItemGroup>
                </Menu>
                </Sider>

                {/* Current Conversation chat window */}
                <Content style={{ padding: '0 24px', minHeight: 280 }}>
                    <Chat setCurrentConversation={setCurrentConversation} accountId={currentConversation}/>
                </Content>
            </Layout>
            </Content>
        </Layout>

      
    )
}
export default MessagePage;