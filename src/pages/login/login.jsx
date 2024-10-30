import React, { useState } from "react";
import { Row, Col, Form, Input, Button, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginAction } from '../../redux/actionCreator/actionCreator';

const Login = () => {
  
  const dispatch = useDispatch();
  const dashNavigate = useNavigate();
  const [form] = Form.useForm();
  
  const show = (values) => {
    (async () => {
      const rawResponse = await fetch('https://admin-app-bdsu.onrender.com/api/v1/admin/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email:values.Email,
          password:values.Password
          }
     )
      });
      const content = await rawResponse.json();
      if(content.success){
        const token = content.data;
        notification.success({
          message: 'Success',
          description: 'Login success',
        });
        dispatch(loginAction(token));
        dashNavigate('/dashboard');     
      }
      else{
        notification.error({
          message: 'Error',
          description: 'Invalid Credentials',
        });
      }
   
    })();
  };
  
  return (
    
    <React.Fragment>
      <Row className="bg-black flex_center login_outer_box">
        <Col span={6} className="bg-pink login_box">
        <Row className="flex_center">
        <Col span={15} className="bg-pink">
        <h4 className="fw-bold text-center">LOGIN</h4>
        <Form
            form={form}
            name="validateOnly"
            layout="vertical"
            className="fw-bold"
            onFinish={(values) => show(values)}
          >
         
                <Form.Item
                  name="Email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: "Enter a Email"
                    },
                    {
                      pattern:/\w+[@][\w]+\.com/,
                      message: "Enter a valid Email"
                    }
                  ]}
                >
                  <Input
                    className="border-0"
                    size="large"
                  />
                </Form.Item>            
                <Form.Item
                  name="Password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                    }
                  ]}
                >
                  <Input
                    className="border-0"
                    size="large"
                  /> 
                
                </Form.Item>   
              <Form.Item>
                
                <Button size="large" className="bg-black text-light" htmlType="submit">Submit</Button>
                
              </Form.Item>
             
           
          </Form>
                                                                                
          <p className="fw-bold text-center box_bottom">Don't have an account? <Link className="" to="/register">sign up</Link></p>

        </Col>
        </Row>
        </Col>
        
      </Row>
    </React.Fragment>   
  );
}

export default Login;
