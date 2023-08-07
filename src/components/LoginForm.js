
import React from 'react'
import{Input,Button,Form,Checkbox} from 'antd'
import './LoginForm.css'
import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { loginUser } from '../modules/axiosutil';
import { useNavigate } from 'react-router-dom';

export const LoginFrom = () => {

    const [login, setLogin] = useState({
        Userid: '',
        Userpw: '',
    });

    const dispatch = useDispatch();
    const loginStatus = useSelector((state)=> state.auth.status);
    const navigate = useNavigate();
    const loginError = useSelector((state)=> state.auth.error);


    const LoginFunc = () => {
        dispatch(loginUser(login))
        change()
    }
    
    const change = () => {
      if(loginStatus === 'succeeded') navigate('/chat')
    }

return (
  
    <div className="Logincontainer">
      
        <h2>Login</h2>
  <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
     onFinish={LoginFunc}
    // onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
       value={login.Userid}
       onChange={(e) => {setLogin({...login,Userid : e.target.value})}}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
       value={login.Userpw}
       onChange={(e) => {setLogin({...login,Userpw : e.target.value})}}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      name="remember"
      valuePropName="checked"
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
  </div>

)
}