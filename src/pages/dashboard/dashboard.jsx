import React, { Component } from "react";						
import { IoMdMale, IoMdFemale } from "react-icons/io";						
import { Row, Col, Card, notification, Modal, Segmented } from "antd";						
import { LuTable2 } from "react-icons/lu";						
import { FaUserCheck } from "react-icons/fa";						
import withRouter from "../privateLayout/withRouter";						
import { SlSocialLinkedin } from "react-icons/sl";						
import { GoStack } from "react-icons/go";						
import { LuDollarSign, LuServer } from "react-icons/lu";						
import { FiEdit, FiUser, FiUsers } from "react-icons/fi";						
import { RiDeleteBinLine } from "react-icons/ri";						
import { AppstoreOutlined, LayoutOutlined } from "@ant-design/icons";						
import { Layout, Space, Table, Tag, Badge } from "antd";						
import { connect } from "react-redux";						
import axios from "axios";						
import Column from "antd/es/table/Column";						
						
class Dashboard extends Component {						
constructor(props) {						
super(props);						
this.state = {						
Box: "cards",						
AllUsersData: [],						
totalCards: 0,						
isModalOpen: false,						
GenderModel: "No data",						
FirstNameModel: "No data",						
LastNameModel: "No data",						
AddressModel: "No data",						
ImageModel: "No data",						
CreatedModel: "No data",						
EmailModel: "No data",						
RoleModel: "No data",						
};						
}						
						
displayData = [						
{ title: "Total", icon: <FiUsers className="cards_logo" />, count: 0 },						
{ title: "Male", icon: <FiUser className="cards_logo" />, count: 0 },						
{ title: "Female", icon: <FiUser className="cards_logo" />, count: 0 },						
{ title: "Front End", icon: <LayoutOutlined className="cards_logo" />, count: 0 },						
{ title: "Back End", icon: <LuServer className="cards_logo" />, count: 0 },						
{ title: "HR", icon: <SlSocialLinkedin className="cards_logo" />, count: 0 },						
{ title: "BDE", icon: <LuDollarSign className="cards_logo" />, count: 0 },						
{ title: "Full Stack", icon: <GoStack className="cards_logo" />, count: 0 },						
];						
						
componentDidMount() {						
this.fetchForm();						
}						
						
fetchForm = () => {						
const { Token } = this.props;						
axios.get("http://node.mitrahsoft.co.in/users", {						
headers: { Authorization: `Bearer ${Token}` },						
})						
.then((success) => {				
  console.log("dashboard-->(success)",success);	
// const totalCardsReduce = success.data.data.reduce((acc, curr) => {						
// acc[curr.gender] = (acc[curr.gender] || 0) + 1;						
// acc[curr.role] = (acc[curr.role] || 0) + 1;						
// return acc;						
// }, {});						
// this.setState({						
// AllUsersData: success.data.data,						
// totalCards: totalCardsReduce,						
// });						
})						
.catch((error) => console.log("dashboard -->(error)",error));						
};						
						
showModal = (values) => {						
this.setState({						
FirstNameModel: values.first_name,						
LastNameModel: values.last_name,						
EmailModel: values.email,						
AddressModel: values.address,						
GenderModel: values.gender,						
ImageModel: values.imageurl,						
CreatedModel: values.created_at,						
RoleModel: values.role,						
isModalOpen: true,						
});						
};						
						
handleOk = () => {						
this.setState({ isModalOpen: false });						
};						
						
handleCancel = () => {						
this.setState({ isModalOpen: false });						
};						
						
editForm = (id) => {						
this.props.history.push(`/edit/${id}`);						
};						
						
deleteForm = (id) => {						
const { Token } = this.props;						
axios						
.delete(`http://node.mitrahsoft.co.in/user/${id}`, {						
headers: { Authorization: `Bearer ${Token}` },						
})						
.then(() => {						
notification.success({						
message: "Success",						
description: "User deleted successfully",						
});						
this.fetchForm();						
})						
.catch((error) => console.log("error -->", error));						
this.handleCancel();						
};						
						
render() {						
const { Box, AllUsersData, isModalOpen, totalCards } = this.state;						
const { Header, Content } = Layout;						
						
return (						
<>						
<Header style={{ marginLeft: -40, paddingRight: 40, background: "rgb(42,42,42)" }}>						
<Row className="p-3">						
<h4 className="fw-bold grey_color_text">DASHBOARD</h4>						
</Row>						
</Header>						
<Content className="bg-black dash_content" style={{ margin: "24px 8px", paddingLeft: 20, height: "200px", overflowY: "scroll", overflowX: "hidden" }}>						
<>						
<Row gutter={16} className="mb-2 ms-2 card_body">						
{this.displayData.map((item, index) => (						
<Col span={6} key={index}>						
<Card className="card" bordered={false}>						
<Row className="ps-3">						
<Col span={16}>						
{item.icon}						
<Row className="cards_name">{item.title}</Row>						
</Col>						
<Col className="cards_count" span={8}>						
{totalCards[item.title] || "0"}						
</Col>						
</Row>						
</Card>						
</Col>						
))}						
</Row>						
</>						
<hr className="ms-3 line" />						
<Header className="bg-black" style={{ marginLeft: -40, paddingRight: 60 }}>						
<Row className="p-4 ps-2 pe-0">						
<Col span={21}>						
<h4 className="fw-bold grey_color_text">USERS</h4>						
</Col>						
<Row className="bg-grey card_to_table p-2">						
<Segmented						
className="toggle-btn"						
id="cards_segment"						
onChange={(value) => this.setState({ Box: value })}						
selected={"cards"}						
options={[						
{ value: "cards", icon: <AppstoreOutlined /> },						
{ value: "table", icon: <LuTable2 /> },						
]}						
/>						
</Row>						
</Row>						
</Header>						
{Box === "cards" ? (						
<Row gutter={16} className="mt-4 mb-4 ms-2">						
{AllUsersData.map((dashboardValues) => (						
<Col span={6} key={dashboardValues.id}>						
<Card className="add-user-dashboard card " bordered={false}>						
<img						
src={dashboardValues.imageurl}						
alt={dashboardValues.first_name}						
width="80px"						
height="80px"						
className="add-user-dashboard-image"						
onClick={() => this.showModal(dashboardValues)}						
/>						
{/* Modal Implementation */}						
</Card>						
</Col>						
))}						
</Row>						
) : (						
<Table className="table_properties bg-black fw-bold mt-4 ms-3 me-5" dataSource={AllUsersData}>						
<Column className="bg-grey" title="Name" dataIndex={"first_name"} key="name" />						
<Column className="bg-grey" title="Email" dataIndex="email" key="email" />						
<Column className="bg-grey" title="Address" dataIndex="address" key="address" />						
<Column						
className="bg-grey"						
title="Gender"						
dataIndex="gender"						
key="gender"						
render={(tags) => (						
<>						
{[tags].map((tag) => {						
let color = tag.length > 5 ? "female_color" : "male_color";						
return (						
<Tag className={color} key={tag}>						
{tag.toUpperCase()}						
</Tag>						
);						
})}						
</>						
)}						
/>						
<Column className="bg-grey" title="Role" dataIndex="role" key="role" />						
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
onClick={() => this.editForm(record.id)}						
>						
<FiEdit />						
</button>						
<button						
size="large"						
onClick={() => this.deleteForm(record.id)}						
className="rounded btn-margin-delete pt-2 pb-2 ps-4 pe-4  border-0 bg-red text-light"						
>						
<RiDeleteBinLine />						
</button>						
</Row>						
</Space>						
)}						
/>						
</Table>						
)}						
</Content>						
</>						
);						
}						
}						
						
const mapStateToProps = (state) => ({ Token: state.Token });						
						
export default withRouter(connect(mapStateToProps)(Dashboard));						