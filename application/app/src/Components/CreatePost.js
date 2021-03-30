import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Drawer, Form, Button, Upload, Modal, Mentions} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Mentions;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

// Class and functions to upload image or video
class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
    ],
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }
}

// Function to write post description with or without tagging a user from account circle
const App = () => {
  const [form] = Form.useForm();

  const onFinish = async () => {
    try {
      const values = await form.validateFields();
      console.log('Submit:', values);
    } catch (errInfo) {
      console.log('Error:', errInfo);
    }
  };

  return (
    <Form form={form} layout="horizontal" onFinish={onFinish}>
      <Form.Item
        name="TextPost"
        label=""
        labelCol={{
          span: 2,
        }}
        wrapperCol={{
          span: 30,
        }}
        rules={[
          {
            required: false,
          },
        ]}
      >
        {/*Placeholder for mock data usernames, need to connect to database here and return list of user circle*/}
        <Mentions rows={4} placeholder="Use @ here to tag another user in the post from your circle">
          <Option value="afc163">afc163</Option>
          <Option value="zombieJ">zombieJ</Option>
          <Option value="yesmeck">yesmeck</Option>
        </Mentions>
      </Form.Item>
      <Form.Item
        wrapperCol={{
          span: 12,
          offset: 6,
        }}
      >
        &nbsp;&nbsp;&nbsp;
      </Form.Item>
    </Form>
  );
};

// Renders create post drawer on homepage component
class DrawerForm extends React.Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <>
        <Button type="primary" onClick={this.showDrawer}>
          <PlusOutlined /> New Post
        </Button>
        <Drawer
          title="Create a New Post"
          width={720}
          onClose={this.onClose}
          visible={this.state.visible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button onClick={this.onClose} type="primary">
                Post to Circle
              </Button>
            </div>
          }
        >
            <div className="Post">
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                  <p>Attach a picture or video</p>
                  <p><PicturesWall /></p>
                  <p>Post Description</p>
                  <p><App /></p>
              </div>
            </div>
        </Drawer>
      </>
    );
  }
}

function CreatePost (props) { 

  return (
    <div className="Post">
        <p><DrawerForm /></p>
    </div>
  )
};
export default CreatePost;