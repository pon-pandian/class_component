import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const PageAccessDenied = () => {
    
    const loginNavigate = useNavigate();
    return (
        <>
        <Result
         className="bg-pink PageNotFound fw-bold"
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={<Button type="primary" className="bg-black fs-6 fw-bold" onClick={ ()=> loginNavigate('/') }>Back Login</Button>}
  />
        </>
    );
}
  
export default PageAccessDenied;