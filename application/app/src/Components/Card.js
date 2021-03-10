import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Card, Avatar, Button } from 'antd';

const { Meta } = Card;

function ProfileCard (props) {  
return (
  <Card 
  >
    <Meta
        style={{
         fontSize: 12
        }}

      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
      title="First Name Last Name"
      description="This is the description"
    />
  </Card>
)
  };
export default ProfileCard;



