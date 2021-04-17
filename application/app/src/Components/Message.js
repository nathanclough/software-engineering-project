import React from 'react';
import 'antd/dist/antd.css';
import { Card, Tooltip} from 'antd';


function Message(props){

    var messageInfo = props.info

    return (
        <div style={{padding: 10}}>
            <Card size="small" title={messageInfo.username}>          
                <p>{messageInfo.description}</p>
            </Card>
        </div>
    )
}
export default Message;