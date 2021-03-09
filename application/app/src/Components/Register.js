import React, { useState } from 'react';
import logo from '../logo.png';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
import '../App.css';

import {
  Form,
  Input,
  Select,
  Button
} from 'antd';

import { Link, Redirect } from 'react-router-dom';

const { Option } = Select;

const logoFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
      offset: 8
    },
  },
};

const formItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
      offset: 4
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function Register(props) {
    const [redirect,setRedirect] = useState(null)
    const [form] = Form.useForm();
    async function onFinish  (values)  {

      const response = await fetch(process.env.REACT_APP_API_URL +"Accounts?", {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          
        },
        body:JSON.stringify(values)
        })
        response.json().then( data => {
          setRedirect(
            {
              pathname: "/homepage",
              state : {
                from: props.location, 
                token: data.token,
                accountID: data.account.accountId
              }        
            });
        }).catch( data => { console.log(data.json())});
        
      // To do handle response
      // if( true){
        
      // }
  };

    const [autoCompleteResult, setAutoCompleteResult] = useState([]);

    const onWebsiteChange = (value) => {
    if (!value) {
        setAutoCompleteResult([]);
    } else {
        setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
    }
    };

    const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
    }));

    // If the form is complete and redirect is set route to homepage 
    if (redirect != null) {
      return( <Redirect to={redirect} />)
    }
    return (
        <>
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
            residence: ['zhejiang', 'hangzhou', 'xihu'],
            prefix: '86',
            }}
            scrollToFirstError
        >
            <Form.Item {...logoFormItemLayout}>
              <img src={logo} className="App-logo" alt="logo" /> 
            </Form.Item>

            <Form.Item
            name="email"
            rules={[
                {
                type: 'email',
                message: 'The input is not valid E-mail!',
                },
                {
                required: true,
                message: 'Please input your E-mail!',
                },
            ]}
            >
              <Input 
              prefix={<MailOutlined className="site-form-item-icon" />} 
              placeholder="example@mail.com"/>
            </Form.Item>

            <Form.Item
            name="username"
            rules={[
                {
                required: true,
                message: 'Please input your username!',
                whitespace: true,
                },
            ]}
            >
              <Input 
              prefix={<UserOutlined className="site-form-item-icon"/>}
              placeholder="Username"
              />

            </Form.Item>

            <Form.Item
            name="firstname"
            rules={[
                {
                required: true,
                message: 'Please input your First Name!',
                whitespace: true,
                },
            ]}
            >
              <Input 
              placeholder="First Name"/>
            </Form.Item>

            <Form.Item
            name="lastname"
            rules={[
                {
                required: true,
                message: 'Please input your Last Name!',
                whitespace: true,
                },
            ]}
            >
              <Input 
              placeholder="Last Name"/>
            </Form.Item>

            <Form.Item
            name="password"
            rules={[
                {
                required: true,
                message: 'Please input your password!',
                },
            ]}
            hasFeedback
            >
              <Input.Password prefix={<LockOutlined className="site-form-item-icon"/>}
              placeholder="Password"/>
            </Form.Item>

            <Form.Item
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
                {
                required: true,
                message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                    }

                    return Promise.reject('The two passwords that you entered do not match!');
                },
                }),
            ]}
            >
              <Input.Password placeholder="Confirm Password"/>
            </Form.Item>
            
            <Form.Item {...tailFormItemLayout}>
      
              <Button type="primary" htmlType="submit">
                  Register
              </Button>
              &emsp; Already have an account? <Link to="/">Sign in</Link>
      
            </Form.Item>

            
        </Form>
        </>
    );
};

export default Register;