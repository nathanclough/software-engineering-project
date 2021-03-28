import React from 'react';
import 'antd/dist/antd.css';
import {Card} from 'antd';


function Post(props){
    return (
        <Card size="small" title={props.username}>
            <image src={props.MediaUrl}/>
            <p>{props.Description}</p>
        </Card>
    )
}
export default Post;