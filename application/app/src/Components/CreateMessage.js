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
      <Content >
      <Layout className="site-layout-background" >
        <br/>
        <TextArea rows={2} />
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