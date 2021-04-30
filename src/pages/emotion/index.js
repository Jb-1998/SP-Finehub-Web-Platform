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
import { Line, Bar, Radar } from 'react-chartjs-2';

// MAIN SCREEN COMPONENTS
const data1 = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Sadness",
      data: [33, 53, 85, 41, 44, 65],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,  192,192,1)"
    },
    {
      label: "Anxiety",
      data: [33, 25, 35, 51, 54, 76],
      fill: false,
      borderColor: "#742774"
    }
  ]
};
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
const data2 = {
  labels: labels,
  datasets: [{
    axis: 'y',
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    fill: false,
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }]
};

const data3 = {
  labels: [
    'Eating',
    'Drinking',
    'Sleeping',
    'Designing',
    'Coding',
    'Cycling',
    'Running'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 90, 81, 56, 55, 40],
    fill: true,
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgb(255, 99, 132)',
    pointBackgroundColor: 'rgb(255, 99, 132)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(255, 99, 132)'
  }, {
    label: 'My Second Dataset',
    data: [28, 48, 40, 19, 96, 27, 100],
    fill: true,
    backgroundColor: 'rgba(54, 162, 235, 0.2)',
    borderColor: 'rgb(54, 162, 235)',
    pointBackgroundColor: 'rgb(54, 162, 235)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(54, 162, 235)'
  }]
};

const Emotion = () => {

  return (
<body>
    <div>
      <Line className="linechart" data={data1} />
    </div>
    <div>
      <Bar className="barchart" data={data2} />
    </div>
    <div>
      <Radar className="radarchart" data={data3} />
    </div>
</body>

  )
}

export default Emotion;
