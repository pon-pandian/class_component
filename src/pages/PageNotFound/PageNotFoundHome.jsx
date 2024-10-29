import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const PageNotFoundHome = () => {

    const dashNavigate = useNavigate();

    return (
        <>
         <Result 
         className="bg-pink PageNotFound fw-bold"
         status="404"
         title="404"
         subTitle="Sorry, the page you visited does not exist."
         extra={<Button type="primary" className="bg-black fs-6 fw-bold" onClick={()=>{ dashNavigate('/dashboard');}}>Back Home</Button>} 
         />
        </>
    );
}
 
export default PageNotFoundHome;