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
import Form from 'react-bootstrap/Form'
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import FormControl from 'react-bootstrap/FormControl'
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner'
import EmojiField from 'emoji-picker-textfield';
import 'emoji-mart/css/emoji-mart.css'
import { Picker, NimblePicker } from 'emoji-mart'
import data from 'emoji-mart/data/twitter.json'
import moment from "moment";
import { ImSmile, ImSmile2, ImClock } from "react-icons/im";
import { FiImage } from "react-icons/fi";
import { IconContext } from "react-icons";
import { Scrollbars } from 'react-custom-scrollbars';
import TextareaAutosize from "react-autosize-textarea"
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect} from "react-router-dom";

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

const Home = () => {

    const user = useContext(UserContext);
    const {photoURL,displayName, email, uid} = user;
    const [modalShow, setModalShow] = useState(false);
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false)
    const [feedData, setFeedData] = useState([])
    const [emotions, setEmotions] = useState('');
    const [showEmojis, setShowEmojis] = useState(false)
    const [currentDay, setCurrentDay] = useState('')
    const [clicked, setClicked] = useState(false);
    const [displayImageFile, setDisplayImageFile] = useState(null)

    const allInputs = {imgUrl: ''}
    const [imageAsFile, setImageAsFile] = useState(null)
    const [imageAsUrl, setImageAsUrl] = useState('')

    console.log("ImageAsFile",imageAsFile)
    const handleImageAsFile = (e) => {
        setImageAsFile(e.target.files[0])
        setDisplayImageFile(URL.createObjectURL(e.target.files[0]))
    }

    console.log(imageAsUrl)


    const inputEl = useRef(null);


    const people = [
        {name: 'sample1', lastname: 'sample1'},
        {name: 'sample2', lastname: 'sample2'}
    ]

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
                //console.log(res.data)
                setFeedData(res.data)
            })
        } catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        // Update the document title using the browser API
        getFeedData()
    }, []);
    console.log(imageAsFile)
    console.log(currentDay)

    const createPost = (event) => {
        setLoading(true)
        let timeData = moment().format("YYYY-MM-DD HH:mm:ss")
        console.log("date inside", currentDay)
        event.preventDefault();
        if(imageAsFile === null) {
            console.log("do not execute upload")
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
                console.log(err)
            }
        }else if(imageAsFile !== null){
            console.log("execute upload")
            const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)
            let timeData = moment().format("YYYY-MM-DD HH:mm:ss")
            uploadTask.on('state_changed',
            (snapShot) => {
                //takes a snap shot of the process as it is happening
                console.log(snapShot)
            }, (err) => {
                //catches the errors
                console.log(err)
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
                        console.log(err)
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
        console.log(inputEl)
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
                dialog ClassName="modal-width"
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
                    <Scrollbars style={{height: imageAsFile ? 300 : 120}} autoHide={imageAsFile ? false : true}>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <TextareaAutosize  className="text-area-style" placeholder="What would you like to share?"  value={content} onChange={(e) => {
                                setContent(e.target.value)
                                closeMenu()
                                }
                            }/>
                        </Form.Group>
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
                                <span>post</span>
                    }
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="container-style justify-content-center">
                <div className="feed-style">
                    <Row className="row-style">
                        <ul style={{listStyle: 'none'}}>
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
                                        <Card style={{marginBottom: 5}} className="card-style">
                                            <Card.Header style={{backgroundColor: '#fff', border:0}}>
                                            <div className="profile-style">
                                                <Image src={user.photoURL ? `${user.photoURL}` : 'https://res.cloudinary.com/dcw61tfvq/image/upload/v1614527393/cute_volmwc.png'} roundedCircle style={{height: 35, width: 35, backgroundSize: 'cover'}} className="image-profile-style" fluid/>
                                                <div className="name-section-style-second">
                                                    <span>{user.displayName}</span>
                                                    <Dropdown style={{marginTop: -5}}>
                                                    <div>
                                                        <IconContext.Provider value={{ size: "0.7em"}}><ImClock/>  </IconContext.Provider><span style={{fontSize: 12}}>{newDateTime} - {user.emotions}</span>
                                                    </div>
                                                    </Dropdown>
                                                </div>
                                            </div>
                                            </Card.Header>
                                            <Card.Body>
                                                <Card.Text>
                                                    {user.content}
                                                </Card.Text>
                                                {
                                                    user.imageUrl ?
                                                    <Image src={`${user.imageUrl}`} style={{height: '50%', width: '100%', backgroundSize: 'cover'}}/>
                                                    :
                                                    null
                                                }
                                            </Card.Body>
                                            <Card.Footer style={{backgroundColor: '#fff'}}>
                                                <div className="profile-style">
                                                    <Image src={user.photoURL ? `${user.photoURL}` : 'https://res.cloudinary.com/dcw61tfvq/image/upload/v1614527393/cute_volmwc.png'} roundedCircle style={{height: 20, width: 20, backgroundSize: 'cover'}} className="image-profile-style" fluid/>
                                                    <div className="name-section-style-second" >
                                                        <TextareaAutosize  className="text-area-style" placeholder="comment section here.."  value={content} onChange={(e) => {
                                                            setContent(e.target.value)
                                                            closeMenu()
                                                            }
                                                        }/>
                                                    </div>
                                                </div>
                                            </Card.Footer>
                                        </Card>
                                        </li>
                                    </div>
                                )
                            }}
                            renderWhenEmpty={() => <div>List is empty!</div>}
                            />
                        </ul>
                    </Row>
                </div>
                <div className="settings-style">
                    <Button className = "button" variant="primary" onClick={() => setModalShow(true)} style={{width: '100%', marginBottom: 20}}>Create a post</Button>
                    <Button className = "button" variant="primary" style={{width: '100%', marginBottom: 20}}>Profile</Button>


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
