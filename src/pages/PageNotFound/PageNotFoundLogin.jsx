import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const PageNotFoundLogin = () => {
    const loginNavigate = useNavigate();
    return (
        <>
        <Result
         className="bg-pink PageNotFound fw-bold"
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button type="primary" className="bg-black fs-6 fw-bold" onClick={ ()=> loginNavigate('/') }>Back Login</Button>}
  />
        </>
    );
}
  
export default PageNotFoundLogin;