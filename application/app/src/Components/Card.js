import React from 'react';
import 'antd/dist/antd.css';
import { Card, Avatar, Button } from 'antd';
import { render } from '@testing-library/react';

const { Meta } = Card;

function ProfileCard (props) {  

    const handleClick = e => {
      if(props.handleCardClick != null)
      props.handleCardClick(props.accountId)
    }

    const renderButton = () =>{
      if(props.showRequest!= null && props.showRequest)
        return (<Button className="request-btn" onClick={props.handleRequestClick}>Join Circle</Button>)
    }
    return (
      <div className="Card">
      <Card onClick={handleClick}>
        <Meta
            style={{
            fontSize: 12
            }}

          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title={props.username}
          
        />
        {renderButton()}
      </Card>
      </div>
    )
  };
export default ProfileCard;



