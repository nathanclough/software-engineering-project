import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Link, useLocation, Redirect } from "react-router-dom";
import logo from '../logo.png';


function Login (props) {  
    const [redirect,setRedirect] = useState(null);
    
    async function onFinish  (values)  {
      const response = await fetch("https://localhost:44326/api/login?", {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          
        },
        body:JSON.stringify(values)
        })
        response.json().then( data => {
          console.log(data)
          setRedirect(
            {
              pathname: "/homepage",
              state : {
                from: props.location, 
                token: data.token,
              }        
            });
        }).catch( data => { console.log(data)});
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

    if (redirect != null) {
      return( <Redirect to={redirect} />)
    }
    return (
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        {...formItemLayout}
      >
        <Form.Item{...logoFormItemLayout}>
          <img src={logo} className="App-logo" alt="logo" />
        </Form.Item>
        
        <Form.Item
          name="Username"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="Password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
  
        <Form.Item             {...tailFormItemLayout}>
          
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          &emsp; Or <Link to="/register">register now!</Link>
        </Form.Item>
      </Form>
    );
  };
export default Login;