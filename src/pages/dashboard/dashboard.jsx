import React, { useEffect, useState } from "react";
import { IoMdMale, IoMdFemale } from "react-icons/io";
import { Row, Col, Card, notification, Modal, Segmented } from "antd";
import { LuTable2 } from "react-icons/lu";
import { FaUserCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { SlSocialLinkedin } from "react-icons/sl";
import { GoStack } from "react-icons/go";
import { LuDollarSign, LuServer } from "react-icons/lu";
import { FiEdit, FiUser, FiUsers } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { AppstoreOutlined, BarsOutlined, LayoutOutlined } from "@ant-design/icons";
import { Button, Layout, Space, Table, Tag, Badge } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";
import Column from "antd/es/table/Column";

const Dashboard = () => {
  const [Box, setBox] = useState("cards");
 
  const { Header, Content } = Layout;
  const editNavigate = useNavigate();
  const deleteNavigate = useNavigate();
  const Token = useSelector((item) => item.token.token.token);
  const [AllUsersData, setAllUsersData] = useState([]);
  // const [MaleData, setMaleData] = useState([]);
  // const [FemaleData, setFemaleData] = useState([]);
  // const [FrontEnd, setFrontEnd] = useState([]);
  // const [BackEnd, setBackEnd] = useState([]);
  // const [HR, setHR] = useState([]);
  // const [BDE, setBDE] = useState([]);
  // const [FullStack, setFullStack] = useState([]);
  const [ totalCards, setTotalCards ] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [GenderModel, setGenderModel] = useState("No data");
  const [FirstNameModel, setFirstNameModel] = useState("No data");
  const [LastNameModel, setLastNameModel] = useState("No data");
  const [AddressModel, setAddressModel] = useState("No data");
  const [ImageModel, setImageModel] = useState("No data");
  const [CreatedModel, setCreatedModel] = useState("No data");
  const [EmailModel, setEmailModel] = useState("No data");
  const [RoleModel, setRoleModel] = useState("No data");

  const displayData = [
    {
      title: "Total",
      icon: <FiUsers className="cards_logo" />,
      count: AllUsersData.length,
    },
    {
      title: "Male",
      icon:  <FiUser className="cards_logo" />,
      count: totalCards.Male,
    },
    {
      title: "Female",
      icon: <FiUser className="cards_logo" />,
      count: totalCards.Female,
    },
    {
      title: "Front End",
      icon: <LayoutOutlined className="cards_logo" />,
      count: totalCards.FrontEnd,
    },
    {
      title: "Back End",
      icon: <LuServer className="cards_logo" />,
      count: totalCards.BackEnd,
    },
    {
      title: "HR",
      icon: <SlSocialLinkedin className="cards_logo" />,
      count: totalCards.HR,
    },
    {
      title: "BDE",
      icon:  <LuDollarSign className="cards_logo" />,
      count: totalCards.BDE,
    },
    {
      title: "Full Stack",
      icon: <GoStack className="cards_logo" />,
      count: totalCards.FullStack,
    },
  ]

  const showModal = (values) => {
    setFirstNameModel(values.first_name);
    setLastNameModel(values.last_name);
    setEmailModel(values.email);
    setAddressModel(values.address);
    setGenderModel(values.gender);
    setImageModel(values.imageurl);
    setCreatedModel(values.created_at);
    setRoleModel(values.role);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchForm = () => {
    axios
      .get("https://admin-app-bdsu.onrender.com/api/v1/users", {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((success) => {
        setAllUsersData(success.data.data);

          const totalCardsReduce = success.data.data.reduce((acc, curr) => {
            acc[curr.gender] = (acc[curr.gender] || 0) + 1;
            acc[curr.role] = (acc[curr.role] || 0) + 1;
            return acc;
          }, {});
          console.log("display",totalCardsReduce );
          setTotalCards(totalCardsReduce);
     

        // setMaleData(
        //   success.data.data.filter((values) => values.gender === "Male")
        // );
        // setFemaleData(
        //   success.data.data.filter((values) => values.gender === "Female")
        // );
        // setFrontEnd(
        //   success.data.data.filter((values) => values.role === "FrontEnd")
        // );
        // setBackEnd(
        //   success.data.data.filter((values) => values.role === "BackEnd")
        // );
        // setHR(success.data.data.filter((values) => values.role === "HR"));
        // setBDE(success.data.data.filter((values) => values.role === "BDE"));
        // setFullStack(
        //   success.data.data.filter((values) => values.role === "FullStack")
        // );
      })
      .catch((error) => console.log("error -->", error));
  };

  const editTableValues = (id) => {
    editForm(id);
  };

  const deleteTableValues = (id) => {
    deleteForm(id);
  };

  const deleteForm = (id) => {
    axios
      .delete(`https://admin-app-bdsu.onrender.com/api/v1/users/${id}`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((success) => {
        deleteNavigate("/dashboard");
        if (success) {
          notification.success({
            message: "Success",
            description: "User deleted successfully",
          });
          fetchForm();
        }
      })
      .catch((error) => console.log("error -->", error));
    handleCancel();
  };

  useEffect(() => {
    fetchForm();
  }, []);

  const editForm = (id) => {
    editNavigate(`/edit/${id}`);
  };

  // const buttonCardBox = (value) => {
  //   setBox(value);
  // };

  // const buttonTableBox = (value) => {
  //   setBox(value);
  // };

  return (
    <>
      <Header
        style={{
          marginLeft: -40,
          paddingRight: 40,
          background: "rgb(42,42,42)",
        }}
      >
        <Row className="p-3">
          <h4 className="fw-bold grey_color_text">DASHBOARD</h4>
        </Row>
      </Header>
      <Content
        className="bg-black dash_content"
        style={{
          margin: "24px 8px",
          paddingLeft: 20,
          height: "200px",
          overflowY: "scroll",
          overflowX: "hidden",
        }}
      >
    
          <>
          <Row gutter={16} className="mb-2 ms-2 card_body">
          {displayData.map((items) => {
            return (<>
            
            <Col span={6}>
              <Card className="card" bordered={false}>
                <Row className="ps-3">
                  <Col span={16}>
                    {items.icon}  
                    <Row className="cards_name">{items.title}</Row>
                  </Col>
                  <Col className="cards_count" span={8}>
                  {items.count ? items.count : '0'}
                  </Col>
                </Row>
              </Card>
            </Col>
         
        
            
            </>)
          })}
    </Row>
        </>
        <hr className="ms-3 line" />

        <Header
          className="bg-black"
          style={{
            marginLeft: -40,
            paddingRight: 60,
          }}
        >
          <Row className="p-4 ps-2 pe-0">
            <Col span={21}>
              <h4 className="fw-bold grey_color_text">USERS</h4>
            </Col>
            <Row className="bg-grey card_to_table p-2">

            <Segmented className='toggle-btn'
             id="cards_segment"
            onChange={(value) => {setBox(value) }}
             selected={'cards'}
            options={[
              {
                value: 'cards',
                icon: <AppstoreOutlined />,
               
              },
              {
                value: 'table',
                icon: <LuTable2 />,
              },
            ]}
          />
              {/* <Button
                onClick={() => buttonCardBox("cards")}
                id="card_view"   
                className={Box === "cards"? "border-0 box_black" : "bg-grey border-0" }
              >
                <AppstoreOutlined />
              </Button>
              <Button
                onClick={() => buttonTableBox("table")}
                id="table_view"
                className="bg-grey border-0"
              >
                <LuTable2 />
              </Button> */}
            </Row>
          </Row>
        </Header>
        {Box === "cards" ? (
          <>
            <Row gutter={16} className="mt-4 mb-4 ms-2">
              {AllUsersData.map((dashboardValues) => {
                return (
                  <>
                    <Col span={6}>
                      <Card
                        className="add-user-dashboard card "
                        bordered={false}
                        key={dashboardValues.id}
                      >
                        <img
                          src={dashboardValues.imageurl}
                          alt={dashboardValues.first_name}
                          width="80px"
                          height="80px"
                          className="add-user-dashboard-image"
                          onClick={() => showModal(dashboardValues)}
                        />

                        <Modal
                          title={
                            <>
                              {FirstNameModel + " " + LastNameModel}{" "}
                              <span className="text-light role_box">
                                <FaUserCheck />
                                <span className="ms-2 role_box_roles">
                                  {RoleModel}
                                </span>
                              </span>
                            </>
                          }
                          open={isModalOpen}
                          onOk={handleOk}
                          onCancel={handleCancel}
                          cancelButtonProps={{ style: { display: "none" } }}
                          okButtonProps={{ style: { display: "none" } }}
                        >
                          <Badge.Ribbon
                            text={
                              RoleModel === "Male" ? (
                                <IoMdMale />
                              ) : (
                                <IoMdFemale />
                              )
                            }
                            className={
                              GenderModel === "Male"
                                ? "male_color_ribbon"
                                : "female_color_ribbon"
                            }
                          ></Badge.Ribbon>
                          <Row>
                            <img
                              src={ImageModel}
                              alt={FirstNameModel + " " + LastNameModel}
                              className="image_model_box model_dashboard_image"
                              width="130px"
                              height="130"
                            />
                          </Row>
                          <span className="bg-grey grey_box_model"></span>

                          <p className="ms-5 h6">
                            <span className="fw-bold">Email: </span>
                            {EmailModel}
                          </p>
                          <p className="ms-5 h6">
                            <span className="fw-bold">Address: </span>
                            {AddressModel}
                          </p>
                          <p className="ms-5 h6">
                            <span className="fw-bold">Created at: </span>
                            {CreatedModel}
                          </p>
                          <Row className="ms-5">
                            <button
                              size="large"
                              className="rounded mt-4 ms-4 mt-3 pt-2 pb-2 border-0 bg-green text-light edit_model"
                              onClick={() => {
                                editForm(dashboardValues.id);
                              }}
                            >
                              <FiEdit className="mb-1" /> Edit
                            </button>
                            <button
                              onClick={() => {
                                deleteForm(dashboardValues.id);
                              }}
                              className="rounded mt-4 btn-margin-delete pt-2 pb-2 border-0 bg-red text-light delete_model"
                            >
                              <RiDeleteBinLine className="mb-1" /> Delete
                            </button>
                          </Row>
                        </Modal>

                        <Row className="d-flex justify-content-center text-pink fw-bold mt-2 ">
                          {dashboardValues.first_name +
                            " " +
                            dashboardValues.last_name}
                        </Row>
                        <Row className="d-flex justify-content-center">
                          <a
                            className="text-light-grey fw-bold aside_mail"
                            href="mailto:pon@gmail.com"
                          >
                            {dashboardValues.email}
                          </a>
                        </Row>
                        <Row>
                          <button
                            size="large"
                            className="rounded mt-4 ms-4 mt-3 pt-2 pb-2 ps-4 pe-4 border-0 bg-green text-light"
                            onClick={() => {
                              editForm(dashboardValues.id);
                            }}
                          >
                            <FiEdit />
                          </button>
                          <button
                            onClick={() => {
                              deleteForm(dashboardValues.id);
                            }}
                            className="rounded mt-4 btn-margin-delete pt-2 pb-2 ps-4 pe-4  border-0 bg-red text-light"
                          >
                            <RiDeleteBinLine />
                          </button>
                        </Row>
                        <Row className="add-user-dashboard-card mb-3"></Row>
                      </Card>
                    </Col>
                  </>
                );
              })}
            </Row>
          </>
        ) : (
          <>
            <Table
              className="table_properties bg-black fw-bold mt-4 ms-3 me-5"
              dataSource={AllUsersData}
            >
              <Column
                className="bg-grey"
                title="Name"
                dataIndex={"first_name"}
                key="name"
              />
              <Column
                className="bg-grey"
                title="Email"
                dataIndex="email"
                key="email"
              />
              <Column
                className="bg-grey"
                title="Address"
                dataIndex="address"
                key="address"
              />
              <Column
                className="bg-grey"
                title="Gender"
                dataIndex="gender"
                key="gender"
                render={(tags) => (
                  <>
                    {[tags].map((tag) => {
                      let color =
                        tag.length > 5 ? "female_color" : "male_color";
                      return (
                        <Tag className={color} key={tag}>
                          {tag.toUpperCase()}
                        </Tag>
                      );
                    })}
                  </>
                )}
              />
              <Column
                className="bg-grey"
                title="Role"
                dataIndex="role"
                key="role"
              />

              <Column
                className="bg-grey"
                title="Action"
                key="id"
                render={(_, record) => (
                  <Space size="middle">
                    <Row>
                      <button
                        size="large"
                        className="rounded pt-2 pb-2 ps-4 pe-4 border-0 bg-green text-light"
                        onClick={() => editTableValues(record.id)}
                      >
                        <FiEdit />
                      </button>
                      <button
                        size="large"
                        onClick={() => deleteTableValues(record.id)}
                        className="rounded btn-margin-delete pt-2 pb-2 ps-4 pe-4  border-0 bg-red text-light"
                      >
                        <RiDeleteBinLine />
                      </button>
                    </Row>
                  </Space>
                )}
              />
            </Table>
          </>
        )}
      </Content>
    </>
  );
};
export default Dashboard;
