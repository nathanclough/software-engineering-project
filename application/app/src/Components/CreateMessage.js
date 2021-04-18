import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Input, Button, Layout} from 'antd';

const { Content } = Layout;

const { TextArea } = Input;

function CreateMessage(props){

  const [text,setText] = useState()
  const handleClick = e => {
    props.handleSubmit(text)
  }
  const onChangeText = e => {
    setText(e.target.value)
  }

  return(
    <Layout>
      <Content >
      <Layout className="site-layout-background" >
        <br/>
        <TextArea onChange={onChangeText} rows={2} />
        <br/>
        <Button onClick={handleClick} type="primary">
          Send Message
        </Button>
      </Layout>
      </Content>
    </Layout>
  )
}
export default CreateMessage;