import React from 'react';
import 'antd/dist/antd.css';
import {Card} from 'antd';


function Post(props){
    var postInfo = props.info
    return (
        <div style={{padding: 10}}>
            <Card size="small" title={postInfo.username} cover={<img src={postInfo.MediaUrl}/>}>            
                <p>{postInfo.description}</p>
            </Card>
        </div>
    )
}
export default Post;
