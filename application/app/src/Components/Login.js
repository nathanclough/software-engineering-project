import React, { useState } from 'react';
import { Alert, Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Link, useLocation, Redirect } from "react-router-dom";
import logo from '../logo.png';


function Login (props) {  
    const [redirect,setRedirect] = useState(null);
    const [alert,setAlert] = useState(false);

    // Handles form completion 
    async function onFinish  (values)  {
      // Make API call to login 
      const response = await fetch(process.env.REACT_APP_API_URL +"login?", {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          
        },
        body:JSON.stringify(values)
        }).catch( data => { 
          
      });
      
      // Once the call back is complete 
      response.json().then( data => {
        // If we recieve an AUTH token 
        if (data.token != null)
          // Go to the homepage
          setRedirect(
            {
              pathname: "/homepage",
              state : {
                from: props.location, 
                token: data.token,
                username: data.account.username,
                accountId: data.account.accountId
              }        
            })
        else 
           {
             // Alert user that the login failed 
             setAlert(true)
           }

      })
    };
    
    // Layout styles for the form 
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
    
    // Redirect if needed 
    if (redirect != null) {
      return( <Redirect to={redirect} />)
    }
    // Otherwise render the form 
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
        {/* Logo */}
        <Form.Item {...logoFormItemLayout}>
          <img src={logo} className="App-logo" alt="logo" />
        </Form.Item>
        
        {/* / Renders the allert if alert is set to true / */}
        {
          alert && (<Alert
          style={{ marginBottom: 24 }}
          message="Incorrect Username or password"
          type="error"
          showIcon
          closable
        />)}

        {/* // Username Item */}
        <Form.Item
          name="Username"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            }
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>

        {/* // Password Item  */}
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

        {/* // Login button */}
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