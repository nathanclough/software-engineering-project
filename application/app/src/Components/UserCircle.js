import React from 'react';
import 'antd/dist/antd.css';
import { List } from 'antd';
import ProfileCard from './ProfileCard';

const data = [
  {
    title: 'Member 1',
  },
  {
    title: 'Member 2',
  },
];

function UserCircle (props) {  

  return (
    <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item, i) => (
      <List.Item>
        <ProfileCard key = {i}/>
      </List.Item>
    )}
  />
  )
};
export default UserCircle;