import React, { useState } from 'react';
import logo from '../logo.png';
import '../App.css';

import {
  Form,
  Input,
  Tooltip,
  Select,
  Checkbox,
  Button
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
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
    const [form] = Form.useForm();

    const onFinish = (values) => {
    console.log('Received values of form: ', values);
    };

    const prefixSelector = (
    <Form.Item name="prefix" noStyle>
        <Select
        style={{
            width: 70,
        }}
        >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
        </Select>
    </Form.Item>
    );
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

    return (
        <>
        <img src={logo} className="App-logo" alt="logo" /> 
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
            <Form.Item
            name="email"
            label={
                <span>
                <Tooltip title="We use this for account security and contact.">
                    <QuestionCircleOutlined />
                </Tooltip>
                E-mail&nbsp;
                </span>
            }
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
            <Input />
            </Form.Item>

            <Form.Item
            name="firstname"
            label="First Name"
            rules={[
                {
                required: true,
                message: 'Please input your first name!',
                whitespace: true,
                },
            ]}
            >
            <Input />
            </Form.Item>

            <Form.Item
            name="lastname"
            label="Last Name"
            rules={[
                {
                required: true,
                message: 'Please input your Last Name!',
                whitespace: true,
                },
            ]}
            >
            <Input />
            </Form.Item>

            <Form.Item
            name="password"
            label="Password"
            rules={[
                {
                required: true,
                message: 'Please input your password!',
                },
            ]}
            hasFeedback
            >
            <Input.Password />
            </Form.Item>

            <Form.Item
            name="confirm"
            label="Confirm Password"
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
            <Input.Password />
            </Form.Item>
            
            <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
                {
                validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject('Should accept agreement'),
                },
            ]}
            {...tailFormItemLayout}
            >
            <Checkbox>
                I have read the <a href="">agreement</a>
            </Checkbox>
            </Form.Item>
            
            <Form.Item {...tailFormItemLayout}>
            
            <Button type="primary" htmlType="submit">
                Register
            </Button>
            &emsp; Already have an account? <a href="/Login">Sign in</a>
            </Form.Item>

            
        </Form>
        </>
    );
};

export default Register;