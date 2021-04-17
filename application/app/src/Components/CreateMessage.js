import React from 'react';
import 'antd/dist/antd.css';
import { Input, Button, Layout} from 'antd';

const { Content } = Layout;

const { TextArea } = Input;

function CreateMessage(props){

  /*const handleClick = e => {
    (e.key)
  }*/


  return(
    <Layout>
      <Content style={{ padding: '0 50px' }}>
      <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
        <TextArea rows={4} />
        <br/>
        <Button type="primary">
          Send Message
        </Button>
      </Layout>
      </Content>
    </Layout>
  )
}
export default CreateMessage;