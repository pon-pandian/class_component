import React, { useEffect, useState } from 'react';
import { Row, Col, Card,  notification, Form, Input, Radio, Select, Upload, Image } from 'antd';
import { useLocation, useNavigate, useParams  } from 'react-router-dom';
import UserImage from '../../Assets/Images/PonPandianImage.jpg'
import { SlSocialLinkedin } from "react-icons/sl";
import { GoStack } from "react-icons/go";
import { LuDollarSign, LuServer } from "react-icons/lu";
import { FiUser, FiUsers } from "react-icons/fi";
import {
  LayoutOutlined,
  MenuOutlined,
  SettingOutlined,
  AppstoreOutlined,
  UserAddOutlined,
  createFromIconfontCN,
  UploadOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../../redux/actionCreator/actionCreator';
import { persistor } from '../../redux/store/store';
import Country from '../dropDownPage/country';
import State from '../dropDownPage/state';
import City from '../dropDownPage/city';
import { Option } from 'antd/es/mentions';
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';
import { Content, Header } from 'antd/es/layout/layout';




const Settings = () => {
  

  return (
  
    <>
        <Header
          style={{
            marginLeft:-40,
            paddingRight:40,
            background:"rgb(42,42,42)"
            
          }}
        >
            <Row className="p-3">
                <h4 className="fw-bold grey_color_text">SETTINGS</h4>
            </Row>
      
        </Header>
        <Content
         className="bg-black"
           style={{
             margin: '24px 8px',
             paddingLeft: 20,
            
           }}
         >  
     

         </Content> 
    </>
  
  );
};


export default Settings;