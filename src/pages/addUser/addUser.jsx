import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  notification,
  Form,
  Input,
  Radio,
  Select,
  Image,
} from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Layout } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";
import { Option } from "antd/es/mentions";
import TextArea from "antd/es/input/TextArea";
import { FaPaperPlane } from "react-icons/fa";
import Country from "../dropDownPage/country";
import State from "../dropDownPage/state";
import City from "../dropDownPage/city";

const AddUser = () => {
  
  const { id } = useParams();
  const location = useLocation();
  const Token = useSelector((item) => item.token.token.token);
  const [AllUsersData, setAllUsersData] = useState([]);
  const DashNavigate = useNavigate();
  const [BaseImage, setBaseImage] = useState();
  const [File, setFile] = useState();
  const [ImageURL, setImageURL] = useState("");
  const { Header, Content } = Layout;
  const [form] = Form.useForm();

  const handleFileInputChange = async (e) => {
    const files = e.target.files[0];
    setFile(files);
    const result = await getBase64(files);
    setBaseImage(result);
  };
  
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleUpload = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("file", File);
    try {
      const response = await axios.post(
        "https://admin-app-bdsu.onrender.com/image/uploads",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      setImageURL(response.data.url);

      if (response.data.success) {
        notification.success({
          message: "Success",
          description: "Image uploaded successfully",
        });
      }
    } catch {
      console.log("error");
    }
  };

  const fetchForm = (id) => {
    axios
      .get(`http://node.mitrahsoft.co.in/users${id}`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((success) => {
        setAllUsersData(success.data.data[0]);
      })
      .catch((error) => console.log(error));
  };
  
  useEffect(() => {
    fetchForm(id);
    form.resetFields();
  }, [!id]);

  if (id) {
    form.setFieldsValue({
      FirstName: AllUsersData.first_name,
      LastName: AllUsersData.last_name,
      Email: AllUsersData.email,
      Role: AllUsersData.role,
      Address: AllUsersData.address,
      City: AllUsersData.city,
      Country: AllUsersData.country,
      State: AllUsersData.state,
      Gender: AllUsersData.gender,
    });
  }

  const show = (values) => {
    id
      ? ImageURL
        ? axios
            .patch(
              `http://node.mitrahsoft.co.in/user/${id}`,
              {
                first_name: values.FirstName,
                last_name: values.LastName,
                email: values.Email,
                imageurl: ImageURL,
                gender: values.Gender,
                role: values.Role,
                address: values.Address,
                country: values.Country,
                state: values.State,
                city: values.City,
              },
              {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${Token}`,
                },
              }
            )
            .then((success) => {
              DashNavigate("/dashboard");
              notification.success({
                message: "Success",
                description: "User updated successfully",
              });
            })
            .catch((error) => {
              console.log(error);
            })
        : notification.error({
            message: "Error",
            description: "please upload the Image",
          })
      : ImageURL
      ? (async () => {
          const rawResponse = await fetch(
            "https://admin-app-bdsu.onrender.com/api/v1/users/new",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Token}`,
              },
              body: JSON.stringify({
                first_name: values.FirstName,
                last_name: values.LastName,
                email: values.Email,
                imageurl: ImageURL,
                gender: values.Gender,
                role: values.Role,
                address: values.Address,
                country: values.Country,
                state: values.State,
                city: values.City,
              }),
            }
          );

          const content = await rawResponse.json();

          if (content.success) {
            notification.success({
              message: "Success",
              description: "user added successfully",
            });
            DashNavigate("/dashboard");
          } else {
            notification.error({
              message: "Error",
              description: "User already exist!",
            });
          }
        })()
      : notification.error({
          message: "Error",
          description: "please upload the Image",
        });
  };

  return (
    <>
      {location.pathname === "/adduser" ? (
        <>
          <Header
            style={{
              marginLeft: -40,
              paddingRight: 40,
              background: "rgb(42,42,42)",
            }}
          >
            <Row className="p-3">
              <h4 className="fw-bold grey_color_text">ADD USER</h4>
            </Row>
          </Header>
          <Content
            className="bg-black"
            style={{
              margin: "24px 8px",
              paddingLeft: 20,
            }}
          >
            <Row className="bg-black flex_center me-3 mt-3">
              <Col span={23} className="bg-grey register_box">
                <Row className="d-flex justify-content-evenly">
                  <Col span={9} className="bg-grey">
                    <Form
                      form={form}
                      name="validateOnly"
                      layout="vertical"
                      autoComplete="off"
                      className="fw-bold add-user"
                      onFinish={(values) => show(values)}
                      initialValues={{
                        FirstName: "",
                        Email: "",
                        Role: "",
                      }}
                    >
                      <Form.Item
                        name="FirstName"
                        label="First Name"
                        rules={[
                          {
                            required: true,
                            message: "First Name is Required",
                          },
                          {
                            pattern: /^[A-Za-z ]*$/,
                            message: "Enter alphabets only",
                          },
                        ]}
                      >
                        <Input className="border-0 fs-6" size="large" />
                      </Form.Item>
                      <Form.Item
                        name="Email"
                        label="Email"
                        rules={[
                          {
                            required: true,
                            message: "Enter a Email",
                          },
                          {
                            pattern: /\w+[@][\w]+\.com/,
                            message: "Enter a valid Email",
                          },
                        ]}
                      >
                        <Input className="border-0 fs-6" size="large" />
                      </Form.Item>
                      <Form.Item
                        name="Role"
                        label="Role"
                        rules={[
                          {
                            required: true,
                            message: "Please select a Role",
                          },
                        ]}
                      >
                        <Select size="large">
                          <Option value="FrontEnd">Front End</Option>
                          <Option value="BackEnd">Back End</Option>
                          <Option value="HR">HR</Option>
                          <Option value="BDE">BDE</Option>
                          <Option value="FullStack">Full Stack</Option>
                        </Select>
                      </Form.Item>
                    </Form>
                  </Col>
                  <Col span={9} className="bg-grey">
                    <Form
                      form={form}
                      name="validateOnly"
                      layout="vertical"
                      autoComplete="off"
                      className="fw-bold add-user"
                      onFinish={(values) => show(values)}
                      initialValues={{
                        LastName: "",
                        Gender: "",
                        File: "",
                      }}
                    >
                      <Form.Item
                        name="LastName"
                        label="Last Name"
                        rules={[
                          {
                            required: true,
                            message: "Last Name is Required",
                          },
                          {
                            pattern: /^[A-Za-z ]*$/,
                            message: "Enter alphabets only",
                          },
                        ]}
                      >
                        <Input
                          className="border-0 fs-6 text-light bg-grey input_grey"
                          size="large"
                        />
                      </Form.Item>

                      <Form.Item
                        name="Gender"
                        label="Gender"
                        rules={[
                          {
                            required: true,
                            message: "Please pick a Gender",
                          },
                        ]}
                      >
                        <Radio.Group>
                          <Radio value={"Male"}>&nbsp; Male</Radio>
                          <Radio value={"Female"}>&nbsp; Female</Radio>
                        </Radio.Group>
                      </Form.Item>

                      <Row>
                        <Col span={12}>
                          <Form.Item name="file" label="Image" className="mt-1">
                            <Input
                              onChange={(e) => handleFileInputChange(e)}
                              type="file"
                              size="large"
                            />
                          </Form.Item>
                        </Col>
                        <Col span={6} className="ms-4 mt-4">
                          
                          <Image src={BaseImage} width={100} className="" />

                        </Col>
                        <Col span={4} className="ms-2 mt-2">
                          <Button
                            size="large"
                            className="mt-4 bg-black text-light fw-bold"
                            onClick={handleUpload}
                          >
                            Upload
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </Col>
                  <Col span={20} className="bg-grey">
                    <Form
                      form={form}
                      name="validateOnly"
                      layout="vertical"
                      autoComplete="off"
                      className="fw-bold add-user"
                      onFinish={(values) => show(values)}
                      initialValues={{
                        Address: "",
                        Country: "",
                        State: "",
                        City: "",
                      }}
                    >
                      <Form.Item
                        name="Address"
                        label="Address"
                        rules={[
                          {
                            required: true,
                            message: "Please enter an address",
                          },
                        ]}
                      >
                        <TextArea
                          className="border-0"
                          showCount
                          maxLength={100}
                          style={{
                            height: 120,
                            resize: "none",
                          }}
                        />
                      </Form.Item>

                      <Row>
                        <Col span={8}>
                          <Country />
                        </Col>
                        <Col span={8}>
                          <State />
                        </Col>
                        <Col span={8}>
                          <City />
                        </Col>
                      </Row>
                    </Form>
                  </Col>
                  <Col span={20} className="bg-grey add-user-button">
                    <Row>&nbsp;</Row>
                    <Row>
                      <Col span={8}></Col>
                      <Col span={8}></Col>
                      <Col span={8}>
                        <Form
                          form={form}
                          name="validateOnly"
                          layout="vertical"
                          autoComplete="off"
                          className="fw-bold add-user"
                          onFinish={(values) => show(values)}
                        >
                          <Form.Item>
                            <Button
                              size="large"
                              className="bg-black text-light fw-bold"
                              htmlType="submit"
                            >
                              Submit <FaPaperPlane />
                            </Button>
                          </Form.Item>
                        </Form>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Content>
        </>
      ) : (
        <>
          <Header
            style={{
              marginLeft: -40,
              paddingRight: 40,
              background: "rgb(42,42,42)",
            }}
          >
            <Row className="p-3">
              <h4 className="fw-bold grey_color_text">EDIT USER</h4>
            </Row>
          </Header>
          <Content
            className="bg-black"
            style={{
              margin: "24px 8px",
              paddingLeft: 20,
            }}
          >
            <Row className="bg-black flex_center me-3 mt-3">
              <Col span={23} className="bg-grey register_box">
                <Row className="d-flex justify-content-evenly">
                  <Col span={9} className="bg-grey">
                    <Form
                      form={form}
                      name="validateOnly"
                      layout="vertical"
                      autoComplete="off"
                      className="fw-bold add-user"
                      onFinish={(values) => show(values)}
                      initialValues={{
                        FirstName: "",
                        Email: "",
                        Role: "",
                      }}
                    >
                      <Form.Item
                        name="FirstName"
                        label="First Name"
                        rules={[
                          {
                            required: true,
                            message: "First Name is Required",
                          },
                          {
                            pattern: /^[A-Za-z ]*$/,
                            message: "Enter alphabets only",
                          },
                        ]}
                      >
                        <Input className="border-0 fs-6" size="large" />
                      </Form.Item>
                      <Form.Item
                        name="Email"
                        label="Email"
                        rules={[
                          {
                            required: true,
                            message: "Enter a Email",
                          },
                          {
                            pattern: /\w+[@][\w]+\.com/,
                            message: "Enter a valid Email",
                          },
                        ]}
                      >
                        <Input className="border-0 fs-6" size="large" />
                      </Form.Item>
                      <Form.Item
                        name="Role"
                        label="Role"
                        rules={[
                          {
                            required: true,
                            message: "Please select a Role",
                          },
                        ]}
                      >
                        <Select size="large">
                          <Option value="FrontEnd">Front End</Option>
                          <Option value="BackEnd">Back End</Option>
                          <Option value="HR">HR</Option>
                          <Option value="BDE">BDE</Option>
                          <Option value="FullStack">Full Stack</Option>
                        </Select>
                      </Form.Item>
                    </Form>
                  </Col>
                  <Col span={9} className="bg-grey">
                    <Form
                      form={form}
                      name="validateOnly"
                      layout="vertical"
                      autoComplete="off"
                      className="fw-bold add-user"
                      onFinish={(values) => show(values)}
                      initialValues={{
                        LastName: "",
                        Gender: "",
                        file: "",
                      }}
                    >
                      <Form.Item
                        name="LastName"
                        label="Last Name"
                        rules={[
                          {
                            required: true,
                            message: "Last Name is Required",
                          },
                          {
                            pattern: /^[A-Za-z ]*$/,
                            message: "Enter alphabets only",
                          },
                        ]}
                      >
                        <Input
                          className="border-0 fs-6 text-light bg-grey input_grey"
                          size="large"
                        />
                      </Form.Item>

                      <Form.Item
                        name="Gender"
                        label="Gender"
                        rules={[
                          {
                            required: true,
                            message: "Please pick a Gender",
                          },
                        ]}
                      >
                        <Radio.Group>
                          <Radio value={"Male"}>&nbsp; Male</Radio>
                          <Radio value={"Female"}>&nbsp; Female</Radio>
                        </Radio.Group>
                      </Form.Item>

                      <Row>
                        <Col span={12}>
                          <Form.Item name="file" label="Image" className="mt-1">
                            <Input
                              onChange={(e) => handleFileInputChange(e)}
                              type="file"
                              size="large"
                            />
                          </Form.Item>
                        </Col>
                        <Col span={5} className="m-4 mt-4">
                          {File ? (
                            <Image src={BaseImage} width={100} className="" />
                          ) : (
                          <>
                          <Image src={AllUsersData.imageurl} width={100} className=""/>
                          </>
                        )}
                        </Col>
                     
                        <Col span={4} className="mt-2">
                          <Button
                            size="large"
                            className="mt-4 bg-black text-light fw-bold"
                            onClick={handleUpload}
                          >
                            Upload
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </Col>
                  <Col span={20} className="bg-grey">
                    <Form
                      form={form}
                      name="validateOnly"
                      layout="vertical"
                      autoComplete="off"
                      className="fw-bold add-user"
                      onFinish={(values) => show(values)}
                    >
                      <Form.Item
                        name="Address"
                        label="Address"
                        rules={[
                          {
                            required: true,
                            message: "Please enter an address",
                          },
                        ]}
                      >
                        <TextArea
                          className="border-0"
                          showCount
                          maxLength={100}
                          style={{
                            height: 120,
                            resize: "none",
                          }}
                        />
                      </Form.Item>

                      <Row>
                        <Col span={8}>
                          <Country />
                        </Col>
                        <Col span={8}>
                          <State />
                        </Col>
                        <Col span={8}>
                          <City />
                        </Col>
                      </Row>
                    </Form>
                  </Col>
                  <Col span={20} className="bg-grey add-user-button">
                    <Row>&nbsp;</Row>
                    <Row>
                      <Col span={8}></Col>
                      <Col span={8}></Col>
                      <Col span={8}>
                        <Form
                          form={form}
                          name="validateOnly"
                          layout="vertical"
                          autoComplete="off"
                          className="fw-bold add-user"
                          onFinish={(values) => show(values)}
                        >
                          <Form.Item>
                            <Button
                              size="large"
                              className="bg-black text-light fw-bold"
                              htmlType="submit"
                            >
                              Submit <FaPaperPlane />
                            </Button>
                          </Form.Item>
                        </Form>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Content>
        </>
      )}
    </>
  );
};

export default AddUser;
