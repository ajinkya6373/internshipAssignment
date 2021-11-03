
import "./card.css"
import 'antd/dist/antd.css';
import { Card } from 'antd';
import { useState } from "react";
import {
    EditOutlined,
    DeleteFilled,
    HeartOutlined,
    MailOutlined,
    PhoneOutlined,
    GlobalOutlined,
    HeartFilled
} from '@ant-design/icons';
import { useStateValue } from '../../context/userContext';
import { Modal } from 'antd';
import { Form, Input } from 'antd';
const { Meta } = Card;
export default function CardComponent({ data }) {
    const [, dispatch] = useStateValue()
    const [like, setLike] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [name, setName] = useState(data.name)
    const [email, setEmail] = useState(data.email)
    const [phone, setPhone] = useState(data.phone)
    const [website, setWebsite] = useState(data.website);
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = (e) => {
        e.preventDefault();
        setIsModalVisible(false);
        let formData = {
            id: data.id,
            name: name,
            email: email,
            phone: phone,
            website: website,
        }
        dispatch({ type: "UPDATE", payload: formData })
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const deleteUser = () => {
        dispatch({ type: "DELETE_USER", payload: data.id })
    }
    return (
        <div>
            <Card
                style={{margin:"15px"}}
                cover={
                    <img
                        alt="example"
                        src={`https://avatars.dicebear.com/v2/avataaars/${data.username}}.svg?options[mood][]=happy`}
                    />
                }
                actions={[

                    like ? <HeartFilled style={{ fontSize: "20px", color: "red" }} onClick={() => setLike(!like)} /> :
                        <HeartOutlined key="like" style={{ fontSize: "20px", color: "red" }} onClick={() => setLike(!like)} />,
                    <EditOutlined key="edit" style={{ fontSize: "20px" }} onClick={showModal} />,
                    < DeleteFilled key="delete" style={{ fontSize: "20px" }} onClick={deleteUser} />,

                ]}
            >
                <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <Form >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your name!',
                                },
                            ]}
                        >
                            <Input defaultValue={data.name} onChange={(e) => setName(e.target.value)} />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    type: 'email',
                                },
                            ]}
                        >
                            <Input defaultValue={data.email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Item>
                        <Form.Item
                            label="Phone"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your phone number!',
                                },
                            ]}
                        >
                            <Input defaultValue={data.phone} onChange={(e) => setPhone(e.target.value)} />
                        </Form.Item>
                        <Form.Item
                            label="Website"
                            name="website"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your website!',
                                },
                            ]}
                        >
                            <Input defaultValue={data.website} onChange={(e) => setWebsite(e.target.value)} />
                        </Form.Item>
                    </Form>
                </Modal>
                <Meta
                    title={data.name}
                    description={
                        <div>
                            <div className="infoItem">
                                <MailOutlined style={{ fontSize: "18px" }} />
                                <p className="text">
                                    {data.email}
                                </p>
                            </div>
                            <div className="infoItem">
                                <PhoneOutlined style={{ fontSize: "18px" }} />
                                <p className="text">
                                    {data.phone}
                                </p>
                            </div>
                            <div className="infoItem">
                                <GlobalOutlined style={{ fontSize: "18px" }} />
                                <p className="text">
                                    http:// {data.website}
                                </p>
                            </div>
                        </div>
                    }
                />
            </Card>
        </div>
    )
}
