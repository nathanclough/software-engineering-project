import 'antd/dist/antd.css';
import {Card} from 'antd';
import React, { useState, useEffect, useRef } from 'react';
import ApiService from '../Services/ApiService';


function Post(props){
    var postInfo = props.info

    return (
        <div style={{padding: 10}}>
            <Card size="small" title={postInfo.username} cover={<img src={postInfo.mediaUrl} />}  >          
                <p>{postInfo.description}</p>
            </Card>
        </div>
    )
}
export default Post;