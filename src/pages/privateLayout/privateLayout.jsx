import React, { useState } from "react";
import { Row, Col, notification } from "antd";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import UserImage from "../../Assets/Images/PonPandianImage.jpg";
import {
  MenuOutlined,
  SettingOutlined,
  AppstoreOutlined,
  UserAddOutlined,
  createFromIconfontCN,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../redux/actionCreator/actionCreator";
import { persistor } from "../../redux/store/store";
import AddUser from "../addUser/addUser";
import Dashboard from "../dashboard/dashboard";
import Settings from "../settings/settings";

const PrivateLayout = () => {
  const { Sider } = Layout;
  const Name = useSelector(
    (item) => item.token.token.first_name + " " + item.token.token.last_name
  );
  const Email = useSelector((item) => item.token.token.email);
  const [collapsed, setCollapsed] = useState(false);
  const IconFont = createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
  });
  const privateNavigate = useNavigate();
  const LoginNavigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Layout className="dashboard_box">
      <Sider
        className="left_side_layout ps-1 pt-2 "
        width={250}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="demo-logo-vertical">
          {collapsed ? (
            <Row>
              <Col span={4}>
                <Button
                  type="text"
                  icon={collapsed ? <MenuOutlined /> : <MenuOutlined />}
                  onClick={() => {
                    setCollapsed(!collapsed);
                  }}
                  style={{
                    fontSize: "16px",
                    width: 64,
                    height: 64,
                  }}
                />
              </Col>
            </Row>
          ) : (
            <Row>
              <Col className="ms-2" span={5}>
                <img
                  src={UserImage}
                  alt="user_images"
                  width="40px"
                  className="mt-2 user_image_dashboard"
                ></img>
              </Col>
              <Col span={12}>
                <Row className="fw-bold mt-2 ellipsis_for_words">{Name}</Row>
                <Row>
                  <a
                    className="text-dark fw-bold aside_mail ellipsis_for_words"
                    href="mailto:pon@gmail.com"
                  >
                    {Email}
                  </a>
                </Row>
              </Col>
              <Col span={6}>
                <Row>
                  <Button
                    type="text"
                    icon={collapsed ? <MenuOutlined /> : <MenuOutlined />}
                    onClick={() => {
                      setCollapsed(!collapsed);
                    }}
                    style={{
                      fontSize: "16px",
                      width: 100,
                      height: 40,
                    }}
                  />
                </Row>
              </Col>
            </Row>
          )}
        </div>

        <Menu
          onClick={(value) => {
            privateNavigate(value.key);
          }}
          className="Menu_margin_top padding_menu"
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["/dashboard"]}
          items={[
            {
              key: "/dashboard",
              icon: <AppstoreOutlined />,
              label: "Dashboard",
            },
            {
              key: "/adduser",
              icon: <UserAddOutlined />,
              label: "Add User",
            },
            {
              key: "/settings",
              icon: <SettingOutlined />,
              label: "Settings",
            },
          ]}
        />
        <Row className="aside_margin">
          {collapsed ? (
            <Button
              size="large"
              className="aside_margin bg-black text-light"
              onClick={() => {
                LoginNavigate("/");
                persistor.purge();
                dispatch(logoutAction());
                notification.success({
                  message: "Success",
                  description: "Successfully Logged out",
                });
              }}
            >
              <IconFont type="icon-tuichu" />
            </Button>
          ) : (
            <Button
              size="large"
              className="aside_margin bg-black text-light"
              onClick={() => {
                LoginNavigate("/");
                persistor.purge();
                dispatch(logoutAction());
                notification.success({
                  message: "Success",
                  description: "Successfully Logged out",
                });
              }}
            >
              <IconFont type="icon-tuichu" />
              Logout
            </Button>
          )}
        </Row>
      </Sider>

      <Layout className="right_side_layout bg-black">
        {
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/adduser" element={<AddUser />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/edit/:id" element={<AddUser />} />
            <Route path="*" element={<Navigate to={"/dashboard"} />} />
          </Routes>
        }
      </Layout>
    </Layout>
  );
};
export default PrivateLayout;
