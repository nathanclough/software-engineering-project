import React from 'react';
import 'antd/dist/antd.css';
import { Card, Avatar, Button } from 'antd';

const { Meta } = Card;

function ProfileCard (props) {  

 const handleClick = e => {
   if(props.handleCardClick != null)
   props.handleCardClick(props.accountId)
}
return (
  <Card onClick={handleClick}>
    <Meta
        style={{
         fontSize: 12
        }}

      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
      title={props.username}
    />
  </Card>
)
  };
export default ProfileCard;



