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

export default Profile = () => {

    return(
      <h1> hi </h1>
    )
}

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
