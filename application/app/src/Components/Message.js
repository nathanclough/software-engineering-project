import React from 'react';
import 'antd/dist/antd.css';
import { Comment, Avatar, List, Input, Tooltip} from 'antd';
import moment from 'moment';


function Message(props){

    const data = [
        {
            author: 'Circle Member Name',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: (
            <p>
                Message content 1
            </p>
            ),
            datetime: (
            <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                <span>{moment().fromNow()}</span>
            </Tooltip>
            ),
        },
    ];


    return (
         <List
                className="comment-list"
                header={`Circle Member Name`}
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                <li>
                    <Comment
                        author={item.author}
                        avatar={item.avatar}
                        content={item.content}
                        datetime={item.datetime}
                    />
                </li>
                )}
            />
    )
}
export default Message;