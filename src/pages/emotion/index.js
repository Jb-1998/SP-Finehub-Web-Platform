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

// charts

// MAIN SCREEN COMPONENTS


const Emotion = () => {

  return (
      <h1> hi </h1>
  )
}

export default Emotion;
