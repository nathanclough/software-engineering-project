import React from 'react';
import 'antd/dist/antd.css';
import { Card, Avatar, Button } from 'antd';
import { render } from '@testing-library/react';

const { Meta } = Card;

function ProfileCard (props) {  

    // if a click handler was given call it
    const handleClick = e => {
      if(props.handleCardClick != null)
        props.handleCardClick(true,props.accountId)
    }

    // Returns the children elements to extend the card such as buttons, links, descriptions,  ect.
    const renderElements = () =>{
      if(props.children != null){
        return props.children 
      }
    }

    return (
      <div className="Card">
      <Card onClick={handleClick}>
        <Meta
            style={{
            fontSize: 12
            }}
            // TODO: Replace the generic avatar with actual links to cloud storage 
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title={props.username}
          
        />
        {renderElements()}
      </Card>
      </div>
    )
  };
export default ProfileCard;



