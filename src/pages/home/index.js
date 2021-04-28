// React JS built in native packages
import React, {useContext, useState, useEffect, useRef} from 'react';

// external native css style for home page
import './style.css'

// Firebase storage for storing of images and other media files
import {storage} from "../../firebase";

// user provider built for accessing user data
import { UserContext } from "../../providers/UserProvider";

// React Bootstrap CSS Framework Components used
import Dropdown from 'react-bootstrap/Dropdown'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'

// React AntDesign CSS Framework Components used
import {Avatar, Skeleton, Timeline, Popconfirm, message, Divider } from 'antd';
import {Button  as ButtonAntDesign} from 'antd'
import { Card as CardAntDesign} from 'antd';

// Packages and styles required for emoji modal, component used is NimblePicker,
//emoji data styling type used is twitter emojis
import data from 'emoji-mart/data/twitter.json'
import {NimblePicker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'

// moment package used for getting date and time
import moment from "moment";
// axios package used for handling http requests to server
import axios from 'axios';

// custom package used for icons ---> react-icons
import { ImSmile, ImSmile2, ImClock } from "react-icons/im";
import { IconContext } from "react-icons";
import { FiImage } from "react-icons/fi";

// custom package components downloaded and used in the home page
import FlatList from 'flatlist-react';
import Scrollbars from 'react-custom-scrollbars';
import TextareaAutosize from "react-autosize-textarea"

// custom components and containers created
import {Navbar} from "../../containers"
import CommentInput from '../../components/comment-input/index'

// custom icons created as react components using svg
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';
import { ReactComponent as CommentIcon } from '../../assets/icons/comment.svg';
import { ReactComponent as ShareIcon } from '../../assets/icons/share.svg';

// Link for navigation process to other pages, using react-router
import {Link} from '@reach/router';

const { Meta } = CardAntDesign;


const text = 'Are you sure to delete this task?';

function confirm() {
    message.info('Clicked on Yes.');
}
function NavItem(props) {
    const [open, setOpen] = useState(false);

    return (
      <li className="nav-item-style">
        <a className="icon-button-style" onClick={() => setOpen(!open)}>
          {props.icon}
        </a>

        {open && props.children}
      </li>
    );
  }

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
const Emoji = props => (
    <span
        className="emoji"
        role="img"
        aria-label={props.label ? props.label : ""}
        aria-hidden={props.label ? "false" : "true"}
    >
        {props.symbol}
    </span>
);

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      style={{textDecoration: 'none', fontSize: 12, color: 'gray'}}
    >
      {children}
      <span>{"            "}</span>
      <span style={{backgroundColor: '#E8E8E8', width: 10, height: 10}}>&#x25BE;</span>
    </a>
  ));

  // forwardRef again here!
  // Dropdown needs access to the DOM of the Menu to measure it

  const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      const [value, setValue] = useState('');

      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <ul>
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value),
            )}
          </ul>
        </div>
      );
    },
  );



// MAIN SCREEN COMPONENTS
const Home = () => {

    const user = useContext(UserContext);
    const {photoURL,displayName, uid} = user;
    const [modalShow, setModalShow] = useState(false);
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false)
    const [feedData, setFeedData] = useState([])
    const [emotions, setEmotions] = useState('');
    const [showEmojis, setShowEmojis] = useState(false)
    const [currentDay, setCurrentDay] = useState('')
    const [clicked, setClicked] = useState(false);
    const [displayImageFile, setDisplayImageFile] = useState(null)
    const [imageAsFile, setImageAsFile] = useState(null)
    const [imageAsUrl, setImageAsUrl] = useState('')
    const [loadingCard, setLoadingCards] = useState(true);

    const handleImageAsFile = (e) => {
        setImageAsFile(e.target.files[0])
        setDisplayImageFile(URL.createObjectURL(e.target.files[0]))
    }
    const inputEl = useRef(null);
    useEffect(() => {
        setCurrentDay(moment().format("YYYY-M-D HH:mm:ss"))
    }, [currentDay]);
    const getFeedData = () => {

        try{
            axios.get('https://asia-southeast2-fineweb-99acb.cloudfunctions.net/feed_post_data/',
            {
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": 'application/json',
                }
            }).then((res) => {
                setFeedData(res.data)
            })
        } catch(err){
        }
    }

    useEffect(() => {
        // Update the document title using the browser API
        getFeedData()
    }, []);
    const createPost = (event) => {
        setLoading(true)
        let timeData = moment().format("YYYY-MM-DD HH:mm:ss");
        event.preventDefault();
        if(imageAsFile === null) {
            try {
                axios.post('https://asia-southeast2-fineweb-99acb.cloudfunctions.net/feed_post_data/feed/store',
                {
                    "uid": uid,
                    "displayName": displayName,
                    "photoURL": photoURL,
                    "content": content,
                    "createdAt": timeData,
                    "emotions": emotions,
                    "imageUrl": null,
                    "comments": [],
                },
                {
                    headers: {
                        'Accept': 'application/json',
                        "Content-Type": 'application/json',
                    }
                }).then((res) => {
                    setContent('')
                    setLoading(false)
                    getFeedData()
                    closeMenu()
                    setModalShow(false);
                    setImageAsFile(null)
                    setImageAsUrl('')
                    setCurrentDay(moment().format("YYYY-M-D HH:mm:ss"))
                })
            } catch(err){
            }
        } else if(imageAsFile !== null){
            const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)
            let timeData = moment().format("YYYY-MM-DD HH:mm:ss")
            uploadTask.on('state_changed',
            (snapShot) => {
                //takes a snap shot of the process as it is happening
            }, (err) => {
                //catches the errors
            }, () => {
                // gets the functions from storage refences the image storage in firebase by the children
                // gets the download url then sets the image from firebase as the value for the imgUrl key:
                storage.ref('images').child(imageAsFile.name).getDownloadURL()
                .then(url => {
                    setImageAsUrl(url)
                    try {
                        axios.post('https://asia-southeast2-fineweb-99acb.cloudfunctions.net/feed_post_data/feed/store',
                        {
                            "uid": uid,
                            "displayName": displayName,
                            "photoURL": photoURL,
                            "content": content,
                            "createdAt": timeData,
                            "emotions": emotions,
                            "imageUrl": url,
                            "comments": [],
                        },
                        {
                            headers: {
                                'Accept': 'application/json',
                                "Content-Type": 'application/json',
                            }
                        }).then((res) => {
                            setContent('')
                            setLoading(false)
                            getFeedData()
                            closeMenu()
                            setModalShow(false);
                            setImageAsFile(null)
                            setImageAsUrl('')
                            setCurrentDay(moment().format("YYYY-M-D HH:mm:ss"))
                        })
                    } catch(err){
                    }
                })
            })
        }
    }

    const showEmojisModal = e => {
        setShowEmojis(true)
        setClicked(true)
    };

    const addEmoji = (e) => {
        let emoji = e.native;
        let newContent = content + emoji;
        setContent(newContent)
    }

    const closeMenu = e => {
        if (inputEl !== null){
            setShowEmojis(false)
            setClicked(false)
        }
    };

    const closeCreatePost = () => {
        setModalShow(false);
        setImageAsFile(null)
        setContent('');
        closeMenu()
        setEmotions("")
    }

    return (
        <div>
            <Navbar />
            <Modal
                show={modalShow}
                onHide={closeCreatePost}
                aria-labelledby="contained-modal-title-vcenter"
                dialogClassName="modal-width"
                centered
                >
                <Modal.Header closeButton style={{borderWidth: 0.1}} className="justify-content-center">
                    <Modal.Title id="contained-modal-title-vcenter" style={{fontSize: 13}}>
                        Create Post
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Modal.Title id="contained-modal-title-vcenter" style={{fontSize: 13, marginBottom: 25}}>
                        <div className="profile-style">
                            <Image src={photoURL ? `${photoURL}` : 'https://res.cloudinary.com/dcw61tfvq/image/upload/v1614527393/cute_volmwc.png'} roundedCircle style={{height: 35, width: 35, backgroundSize: 'cover'}} className="image-profile-style" fluid/>
                            <div className="name-section-style">
                                <span>{displayName}</span>
                                <Dropdown>
                                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                        {
                                            emotions ?
                                            emotions
                                            :
                                            "Emotions"
                                        }
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu as={CustomMenu}>
                                        <Dropdown.Item eventKey="😥Sad" onSelect={(eventKey, event) => {
                                            setEmotions(eventKey)
                                        }} style={{fontSize: 12}}><Emoji symbol="😢" label="sheep"/> Sad</Dropdown.Item>
                                        <Dropdown.Item eventKey="😠Angry" onSelect={(eventKey, event) => setEmotions(eventKey)} style={{fontSize: 12}}><Emoji symbol="😠" label="sheep"/> Angry</Dropdown.Item>
                                        <Dropdown.Item eventKey="😰Fearful" onSelect={(eventKey, event) => setEmotions(eventKey)} style={{fontSize: 12}}><Emoji symbol="😨" label="sheep"/> Fearful</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                    </Modal.Title>
                    <Scrollbars style={{height: imageAsFile ? 300 : 120, }} autoHide={imageAsFile ? false : true}>
                            <TextareaAutosize  className="text-area-style" placeholder="What would you like to share?" style={{width: '90%'}} value={content} onChange={(e) => {
                                setContent(e.target.value)
                                closeMenu()
                                }
                            }/>
                        <div>
                            {
                                imageAsFile ?
                                <div>
                                    <Image src={displayImageFile} style={{height: '50%', width: '100%', backgroundSize: 'cover'}}/>
                                </div>
                                :
                                null
                            }
                        </div>
                    </Scrollbars>
                    <label for="upload-photo" style={{cursor: 'pointer'}}><FiImage/></label>
                            <input
                            type="file"
                            name="photo"
                            id="upload-photo"
                            onChange={handleImageAsFile}
                            />

                        {
                            showEmojis ?
                            <span style={styles.emojiPicker} ref={inputEl}>
                                <NimblePicker sheetSize={64} set="twitter" data={data} onSelect={addEmoji} title="" emoji='none' style={{ position: 'absolute', bottom: '20px', right: '20px' }} />
                            </span>
                            :
                            null
                        }
                        <p onClick={showEmojisModal} style={styles.getEmojiButton}>{clicked? <IconContext.Provider value={{ color: "#785ED8", className: "global-class-name" }}><ImSmile2/></IconContext.Provider>: <ImSmile/>}</p>
                </Modal.Body>
                <Modal.Footer style={{borderWidth: 0, width: '100%'}}>
                    <Button onClick={createPost} style={{width: '100%'}} variant={content || imageAsFile ? 'primary' : 'secondary'} disabled={content || imageAsFile ? false : true}>
                    {
                                loading ?
                                <div>
                                    <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    />
                                    <span>  Posting...</span>
                                </div>
                                :
                                <span>Post</span>
                    }
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="container-style justify-content-center">
                <div className="feed-style">
                    <Row className="row-style">
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
                                                        <IconContext.Provider value={{ size: "0.7em"}}><ImClock/> </IconContext.Provider><span style={{fontSize: 12,}}>{newDateTime} - {user.emotions}</span>
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
                                                        <div className="feed">
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
                                            <Card.Footer className="footer" style={{backgroundColor: '#fff',}}>
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
                    </Row>
                </div>

                <div className="settings-style">
                    <div style={{ width: '18rem', marginBottom: 0, }}></div>
                    <Scrollbars style={{height: '100%', paddingRight: 20}} autoHide={true} thumbMinSize={30}>
                        <div style={{wdith: '50%', paddingLeft: 5, paddingRight: 5, }}>
                        <CardAntDesign
                            bordered={false}
                            style={{ width: '17rem', marginBottom: 0}}
                            cover={
                            <img
                                className="cp"
                                alt="example"
                                src="https://images.unsplash.com/photo-1598550487031-0898b4852123?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                                style={{borderRadius: 20}}
                            />
                            }
                            >
                            <Meta
                            className="pfp"
                            avatar={<Avatar src={user.photoURL ? `${user.photoURL}` : 'https://res.cloudinary.com/dcw61tfvq/image/upload/v1614527393/cute_volmwc.png'} style={{marginTop: -70, marginLeft: '80%', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderStyle: 'solid', borderColor: 'black'}} size={90}/>}
                            description={<p><br/>{''}</p>}
                            style={{fontSize: 12}}
                            />
                            <Meta
                            className="displayname"
                            title={<p style={{fontSize: 13.5, marginTop: 0, textAlign: 'center'}}>{user.displayName}</p>}
                            description={<p style={{marginTop: -25, marginBottom: -1, textAlign: 'center'}}>This is my brief profile section</p>}
                            style={{fontSize: 12}}

                            />
                            </CardAntDesign>
                            <Link to="/"><Button className="profile" variant="secondary" onClick={() => {}} style={{width: '17rem', marginBottom: 5}}>My Profile</Button></Link>
                            <Link to="/emotion"><Button variant="secondary" onClick={() => {}} style={{width: '17rem', marginBottom: 5}}>Emotion Analytics</Button></Link>
                            <button className="post-button-style" onClick={() => setModalShow(true)} style={{width: '17rem', marginBottom: 20}}>Create a post</button>

                            <p className="act" style={{fontWeight: 'bold', color: '#a7a7a7'}}>Activities</p>
                            <CardAntDesign className="sched" hoverable size="small" title="Scheduled Session" style={{ width: '17rem', borderRadius: 10, alignItems: 'center', borderWidth: 1.5, marginBottom: 10, marginLeft:0}} bordered onClick={() => {}}
                                extra={
                                    <Popconfirm
                                    placement="rightTop"
                                    title={text}
                                    onConfirm={confirm}
                                    okText="Yes"
                                    cancelText="No"
                                    >
                                        <ButtonAntDesign style={{borderWidth: 0.1, width: 0, borderRadius: 30,  borderColor: 'transparent'}}>
                                        <NavItem icon={<CloseIcon />}/>

                                        </ButtonAntDesign>
                                    </Popconfirm>
                                }
                            >
                                <p>Here is your session schedules for today</p>
                                <Timeline>
                                    <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                                    <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
                                </Timeline>
                            </CardAntDesign>
                        </div>
                        <div>
                            {
                                imageAsFile ?
                                null
                                :
                                null
                            }
                        </div>
                    </Scrollbars>
                </div>
            </div>
        </div>
    )
}

export default Home;

const styles = {
    emojiPicker: {
        position: "absolute",
        bottom: 10,
        right: 0,
        left: 260,
        cssFloat: "right",
        marginLeft: "500px"
    },
    getEmojiButton: {
        cssFloat: "right",
        border: "none",
        margin: 0,
        cursor: "pointer"
    },
}
