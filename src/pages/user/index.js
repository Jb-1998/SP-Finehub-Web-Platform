import React, {useContext, useState, useEffect, useRef} from 'react';
import Button from 'react-bootstrap/Button';
import {auth, storage} from "../../firebase";
import { UserContext } from "../../providers/UserProvider";
import {Navbar} from "../../containers"
import FlatList from 'flatlist-react';
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import './style.css'
import Modal from 'react-bootstrap/Modal';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import FormControl from 'react-bootstrap/FormControl'
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner'
import 'emoji-mart/css/emoji-mart.css'
import { Picker, NimblePicker } from 'emoji-mart'
import data from 'emoji-mart/data/twitter.json'
import moment from "moment";
import { ImSmile, ImSmile2, ImClock } from "react-icons/im";
import { FiImage } from "react-icons/fi";
import { IconContext } from "react-icons";
import { Scrollbars } from 'react-custom-scrollbars';
import TextareaAutosize from "react-autosize-textarea"
import CommentInput from '../../components/comment-input/index'
import { Menu, Avatar, PageHeader,  Tag, Tabs,  Skeleton, Timeline, Popconfirm, Drawer, Form, Col, Input, Select, DatePicker, Divider } from 'antd';
import {Button as ButtonAntDesign} from 'antd';
import { Card as CardAntDesign} from 'antd';
import {Row as RowAntDesign} from 'antd';
import { MailOutlined, AppstoreOutlined, SettingFilled, HomeFilled,  MessageFilled, EllipsisOutlined, SmileFilled, PlusOutlined } from '@ant-design/icons';


import { ReactComponent as CommentIcon } from '../../assets/icons/comment.svg';
import { ReactComponent as MediaIcon } from '../../assets/icons/media.svg';
import { ReactComponent as FeedIcon } from '../../assets/icons/feed.svg';
import { ReactComponent as JournalIcon } from '../../assets/icons/journal.svg';



import { ReactComponent as ShareIcon } from '../../assets/icons/share.svg';


const User = () => {
    const { Option } = Select;
    const user = useContext(UserContext);
    const {photoURL,displayName, uid} = user;
    const [feedData, setFeedData] = useState([])
    const [visible, setVisible] = useState(false)
    const [loadingCard, setLoadingCards] = useState(true);

    const { TabPane } = Tabs;


    function callback(key) {
        console.log(key);
    }
    const showDrawer  = () => {
        setVisible(true)
    }

    const onClose = () => {
        setVisible(false)
    }
    const getFeedData = () => {

        try{
            axios.get('https://asia-southeast2-fineweb-99acb.cloudfunctions.net/feed_post_data/',
            {
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": 'application/json',
                }
            }).then((res) => {
                const arr = res.data
                const key = "uid"
                const result = arr.filter(d => d[key]===uid)
                console.log(result)
                setFeedData(result)
            })
        } catch(err){
        }
    }
    useEffect(() => {
        // Update the document title using the browser API
        getFeedData()
    }, []);

    function ActionsCardItem(props) {
        const [open, setOpen] = useState(false);

        return (
        <li className="action-item-style">
            <a className="action-button-style" onClick={() => setOpen(!open)}>
            {props.icon}
            </a>

            {open && props.children}
        </li>
        );
    }
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
      };

    return (

        <div>
            <Navbar />
            <Drawer
                title=" "
                width={400}
                onClose={onClose}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
                footer={
                    <div
                    style={{
                        textAlign: 'right',
                    }}
                    >
                    <ButtonAntDesign onClick={onClose} style={{ marginRight: 8 }}>
                        Cancel
                    </ButtonAntDesign>
                    <ButtonAntDesign onClick={onClose} type="primary">
                        Update
                    </ButtonAntDesign>
                    </div>
                }
                >
                <Divider>Edit Account Information</Divider>
                <Form layout="vertical" hideRequiredMark>
                    <RowAntDesign gutter={16}>
                    <Col span={24}>
                        <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: 'Please enter user name' }]}
                        >
                        <Input defaultValue={`${user.displayName}`}  />
                        </Form.Item>
                    </Col>
                    </RowAntDesign>
                    <RowAntDesign gutter={16}>
                    <Col span={24}>
                        <Form.Item
                        name="description"
                        label="Description"
                        rules={[
                            {
                            required: true,
                            message: 'please enter url description',
                            },
                        ]}
                        >
                        <Input.TextArea rows={4} defaultValue="This is a brief description about me, and I hope that everyone is doing okay hehe" />
                        </Form.Item>
                    </Col>
                    </RowAntDesign>
                </Form>
            </Drawer>
            <div>
                <div className="container-style-user justify-content-center">
                    <div className="page-header-container">
                        <div className="picture-style">
                            <CardAntDesign bodyStyle={{ width: 200, alignItems: 'center', justifyContent: 'center' }} bordered={false}
                            cover={<img src={user.photoURL ? `${user.photoURL}` : 'https://res.cloudinary.com/dcw61tfvq/image/upload/v1614527393/cute_volmwc.png'} style={{width: 200, height: 200, marginTop: 25, borderRadius: 100}}/>}>
                            </CardAntDesign>
                        </div>
                        <div className="info-style">
                            <div style={{wdith: '50%', paddingLeft: 5, paddingRight: 5, }}>
                            <CardAntDesign style={{ width: '100%', paddingTop: 20 }} bordered={false}>
                                <p style={{fontSize: 25, fontWeight: '600'}}>{user.displayName}</p>
                                <p>This is a brief description about me, and I hope that everyone is doing okay hehe</p>
                                <span><ButtonAntDesign className="edit" onClick={showDrawer}>Edit Profile</ButtonAntDesign></span>
                            </CardAntDesign>
                            </div>
                        </div>
                        <div className="tabs-style">
                            <Tabs defaultActiveKey="1" onChange={callback} centered style={{marginLeft:0}}>
                                <TabPane tab={
                                            <span style={{alignItems: 'center', justifyContent: 'center'}}>
                                            {/* <ButtonAntDesign style={{borderWidth: 0.1, width: 0, borderRadius: 30,  borderColor: 'transparent'}}><ActionsCardItem icon={<FeedIcon />}/></ButtonAntDesign> */}
                                             <span>Activities</span>
                                            </span>
                                } key="1">
                                <div className="activities-container">
                                    <div className="setting-feed">
                                    <CardAntDesign style={{width: 280, paddingTop: 20, marginRight: 10 }} bordered={true}>
                                        <p style={{fontSize: 25, fontWeight: '600'}}>Emotion Analytics</p>
                                        <p>This is a brief description about me, and I hope that everyone is doing okay hehe</p>
                                        <span><ButtonAntDesign>Edit Profile</ButtonAntDesign></span>
                                    </CardAntDesign>
                                    </div>
                                    <div className="activity-feed">
                                        <ul style={{listStyle: 'none', marginBottom: 25}}>
                                               <FlatList
                                            list={feedData}
                                            sortDescending={false}
                                            renderItem={(user, index) => {
                                                const publishedDate = user.createdAt;
                                                const dateTime = moment(publishedDate, "YYYY-MM-DD hh:mm:ss").format("MMMM DD, YYYY HH:mm:ss")
                                                const newDateTime = moment(dateTime).fromNow()
                                                return (
                                                    <div>
                                                        <li key={index}>
                                                        <Card style={{marginBottom: 2}} className="card-style">
                                                            <Card.Header style={{backgroundColor: '#fff', border:0}}>
                                                            <div className="profile-style">
                                                                <Image src={user.photoURL ? `${user.photoURL}` : 'https://res.cloudinary.com/dcw61tfvq/image/upload/v1614527393/cute_volmwc.png'} roundedCircle style={{height: 35, width: 35, backgroundSize: 'cover'}} className="image-profile-style" fluid/>
                                                                <div className="name-section-style-second">
                                                                    <span>{user.displayName}</span>
                                                                    <div style={{marginTop: -5}}>
                                                                    <div>
                                                                        <IconContext.Provider value={{ size: "0.7em"}}><ImClock/> </IconContext.Provider><span style={{fontSize: 12}}>{newDateTime} - {user.emotions}</span>
                                                                    </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            </Card.Header>
                                                            <Card.Body style={{borderLeftWidth: 1, marginLeft: 34, borderColor: '#b3b3b3', borderStyle: 'solid', borderTopWidth: 0, borderBottomWidth: 0, borderRightWidth: 0, marginBottom: 20}}>
                                                                <Card.Text style={{fontSize: 14, marginTop: -28, marginLeft: 10}}>
                                                                    {user.content}
                                                                </Card.Text>
                                                                {
                                                                    user.imageUrl ?
                                                                    <Image src={`${user.imageUrl}`} style={{height: '40%', width: '95%', backgroundSize: 'cover', borderRadius: 20, marginLeft: 10}}/>
                                                                    :
                                                                    null
                                                                }
                                                                <Row style={{justifyContent: 'space-between', width: '95%', marginLeft:10, marginTop: 10, borderBottomWidth: 0, borderColor: '#b3b3b3', borderStyle: 'solid', borderTopWidth: 0.5, borderLeftWidth: 0, borderRightWidth: 0, paddingBottom: 0, paddinTop: 10,}}>
                                                                    <span style={{fontSize: 12}}><ButtonAntDesign style={{borderWidth: 0.1, width: 0, borderRadius: 30,  borderColor: 'transparent'}} onClick={() => {
                                                                    }}><ActionsCardItem icon={<CommentIcon />}/></ButtonAntDesign><span style={{marginBottom: -5}}>{user.comments.length} {user.comments.length > 1 ? 'Comments' : 'Comment'}</span></span>
                                                                    <span><ButtonAntDesign style={{borderWidth: 0.1, width: 0, borderRadius: 30,  borderColor: 'transparent'}} onClick={() =>{}}><ActionsCardItem icon={<ShareIcon />}/></ButtonAntDesign></span>
                                                                </Row>
                                                                <Card.Text style={{fontSize: 12, marginBottom: 0,marginTop: 15, marginLeft: 10}}>{user.comments ? 'User replies': 'No user replies yet'}</Card.Text>
                                                                <FlatList
                                                                list={user.comments}
                                                                sortDescending={false}
                                                                renderItem={(comment, index) => {

                                                                    const publishedDateComment = comment.createdAt;
                                                                    const dateTimeComment = moment(publishedDateComment, "YYYY-MM-DD hh:mm:ss").format("MMMM DD, YYYY HH:mm:ss")
                                                                    const newDateTimeComment = moment(dateTimeComment).fromNow()
                                                                    return (
                                                                        <div>
                                                                            <li key={index}>
                                                                            <Card style={{marginBottom: -20, border:0, marginLeft: 0, width: '90%'}} className="card-style-comment">
                                                                                <Card.Header style={{backgroundColor: '#fff', border:0, alignItems: 'center'}}>
                                                                                <div className="profile-style">
                                                                                    <Image src={comment.photoURL ? `${comment.photoURL}` : 'https://res.cloudinary.com/dcw61tfvq/image/upload/v1614527393/cute_volmwc.png'} roundedCircle style={{height: 25, width: 25, backgroundSize: 'cover', marginRight: 60}} className="image-profile-style" fluid/>
                                                                                    <div className="name-section-style-comment">
                                                                                        <span style={{fontSize: 10,}}>{comment.displayName}</span>
                                                                                        <div style={{marginTop: -10}}>
                                                                                            <div>
                                                                                                <IconContext.Provider value={{ size: "0.5em"}}><ImClock/>  </IconContext.Provider><span style={{fontSize: 10}}>{newDateTimeComment}</span>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                </Card.Header>
                                                                                <Card.Body style={{marginLeft: 40, marginTop: -30, width: '100%'}}>
                                                                                    <Card.Text style={{color: 'black', fontSize: 12}}>
                                                                                        {comment.comment}
                                                                                    </Card.Text>
                                                                                </Card.Body>
                                                                            </Card>
                                                                            </li>
                                                                        </div>
                                                                    )
                                                                }}
                                                                renderWhenEmpty={() => <div></div>}
                                                                />
                                                            </Card.Body>
                                                            <Card.Footer style={{backgroundColor: '#fff',}}>
                                                                <Row style={{marginTop: 0, backgroundColor: 'white',paddingTop: 10, paddingBottom: 10, borderRadius: 5}}>
                                                                    <Image src={photoURL ? `${photoURL}` : 'https://res.cloudinary.com/dcw61tfvq/image/upload/v1614527393/cute_volmwc.png'} roundedCircle style={{height: 25, width: 25, backgroundSize: 'cover', marginRight: 25, marginLeft: 20}} className="image-profile-style" fluid/>
                                                                    <CommentInput data_id={index} content_id={user.id} refresh={getFeedData}/>
                                                                </Row>
                                                            </Card.Footer>
                                                        </Card>
                                                        </li>
                                                    </div>
                                                )
                                            }}
                                            renderWhenEmpty={() => <div>
                                                <Card
                                                style={{marginBottom: 5, height: '100%', padding: 20}}
                                                className="card-style">
                                                    <Skeleton loading={loadingCard} avatar active style={{marginBottom: 10}}></Skeleton>
                                                </Card>
                                                <Card
                                                style={{marginBottom: 5, height: '100%', padding: 20}}
                                                className="card-style"
                                                >
                                                <Skeleton loading={loadingCard} avatar active style={{marginBottom: 10}}></Skeleton>
                                                </Card>
                                                <Card
                                                style={{marginBottom: 5, height: '100%', padding: 20}}
                                                className="card-style"
                                                >
                                                <Skeleton loading={loadingCard} avatar active style={{marginBottom: 10}}></Skeleton>
                                                </Card>
                                                <Card
                                                style={{marginBottom: 5, height: '100%', padding: 20}}
                                                className="card-style"
                                                >
                                                <Skeleton loading={loadingCard} avatar active style={{marginBottom: 10}}></Skeleton>
                                                </Card>
                                            </div>}
                                            />
                                        </ul>
                                    </div>
                                </div>

                                </TabPane>
                                {/* <TabPane tab={
                                    <span>
                                        <ButtonAntDesign style={{borderWidth: 0.1, width: 0, borderRadius: 30,  borderColor: 'transparent'}}><ActionsCardItem icon={<MediaIcon />}/></ButtonAntDesign>
                                        Media
                                    </span>
                                }key="2">
                                <div style={{width: 780}}>
                                    <p>Media</p>
                                </div>
                                </TabPane>
                                <TabPane tab={
                                    <span>
                                        <ButtonAntDesign style={{borderWidth: 0.1, width: 0, borderRadius: 30,  borderColor: 'transparent'}}><ActionsCardItem icon={<JournalIcon />}/></ButtonAntDesign>
                                        Journal
                                    </span>
                                } key="3">
                                <div style={{width: 780}}>
                                    <p>Journal</p>
                                </div>
                                </TabPane> */}
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}


export default User;
