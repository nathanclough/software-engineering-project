import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Drawer, Form, Button, Mentions, message, Upload, loading} from 'antd';
import { PlusOutlined , LoadingOutlined} from '@ant-design/icons';
import Media from './Media';

const { Option, getMentions } = Mentions;

// Renders create post drawer on homepage component
function CreatePost (props) { 

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bytes, setBytes] = useState(null);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = async () => {
    try {
      const values = await form.validateFields();
      console.log('Submit:', values);
      console.log(bytes);

      
    } catch (errInfo) {
      console.log('Error:', errInfo);
    }
  };

  const  beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  const checkMention = async (_, value) => {
    const mentions = getMentions(value);

    if (mentions.length < 2) {
      throw new Error('More than one must be selected!');
    }
  };

  const getBase64 = (file, callback) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
    };
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }

  const handleChange = info => {
      if (info.file.status === 'uploading') {
        setLoading(true);
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file, (imageUrl) =>{
          setBytes(imageUrl)
          setLoading(false)},
        );
      }
    };



    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
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
          onClose={onClose}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={onReset} style={{ marginRight: 8 }}>
                Reset
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
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                  >
                      {bytes ? <img src={bytes} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                  </Upload>
                  <Form.Item
                  name="description"
                  label="Post Description"
                >
                  <Mentions rows={3} placeholder="You can use @ to ref user here">
                    <Option value="friend">friend</Option>
                  </Mentions>
                  {/*<Input.TextArea rows={4} placeholder="please enter post description"/>*/}
                </Form.Item>
              </div>
            </div>
        </Form>
        </Drawer>
    </div>
  )
};
export default CreatePost;