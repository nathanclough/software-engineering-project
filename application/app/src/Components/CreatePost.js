import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Drawer, Form, Button, Mentions, message, Upload} from 'antd';
import { PlusOutlined , LoadingOutlined} from '@ant-design/icons';

const { Option, getMentions } = Mentions;

// Renders create post drawer on homepage component
function CreatePost (props) { 

  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const showDrawer = () => {
    setVisible(true);
  };

  const onCancel = () => {
    form.resetFields();
    setVisible(false)
  }

  const onFinish = async () => {
    try {
      const values = await form.validateFields();

      // Call the service funciton with values as parameter
      console.log('Submit:', values);
      onCancel()
      
    } catch (errInfo) {
      console.log('Error:', errInfo);
    }
  };

  const checkMention = async (_, value) => {
      const mentions = getMentions(value);

      if (mentions.length < 2) {
        throw new Error('More than one must be selected!');
      }
    };

    const fileUpload = (e) => {
      console.log('Upload event:', e);
      if (Array.isArray(e)) {
        return e;
      }
      if (e.fileList.length > 1 ){
        e.fileList.shift();
      }
      return e && e.fileList;
    };
    const uploadButton = (
      <div>
         <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

  return (
    <div className="Post">
      <Button type="primary" onClick={showDrawer}>
        <PlusOutlined /> New Post
      </Button>
      <Drawer
          title="Create a New Post"
          width={720}
          onClose={onCancel}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={onCancel} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button onClick={onFinish} type="primary">
                {/*WHERE YOU SUBMIT*/}
                Post to Circle
              </Button>
            </div>
          }
        >
        <Form form={form}>
            <div className="Post">
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                  <p>Attach a picture or video</p>
                  <Form.Item 
                    name="upload"
                    label="Upload"
                    valuePropName="fileList"
                    getValueFromEvent={fileUpload}>
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    customRequest={({ file, onSuccess }) => {
                      setTimeout(() => {
                        onSuccess("ok");
                      }, 0);
                    }}
                    className="avatar-uploader"
                    showUploadList={true}
                    
                  >
                      {<PlusOutlined/>}
                  </Upload>
                  </Form.Item>
                  <Form.Item
                  name="description"
                  label="Post Description"
                >
                  <Mentions rows={3} placeholder="You can use @ to ref user here">
                    <Option value="friend">friend</Option>
                  </Mentions>
                </Form.Item>
              </div>
            </div>
        </Form>
        </Drawer>
    </div>
  )
};
export default CreatePost;