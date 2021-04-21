import React, {useContext, useState} from 'react'
import './style.css'
import TextareaAutosize from "react-autosize-textarea"
import { FiSend } from "react-icons/fi";
import { IconContext } from "react-icons";
import axios from 'axios';
import moment from "moment";
import { UserContext } from "../../providers/UserProvider";
import Row from 'react-bootstrap/Row'

export default function CommentInput({data_id, content_id, ...props}) {
    console.log(data_id)
    console.log("content_id",content_id)
    const user = useContext(UserContext);
    const {photoURL,displayName, email, uid} = user;
    const [comment, setComment] = useState('');
    const [feedData, setFeedData] = useState([])
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
                console.log(res)
                setFeedData(res.data)
                
            })
        } catch(err){
            console.log(err)
        }
    }
    const postComment = (data_id, event) => {
        let timeData = moment().format("YYYY-MM-DD HH:mm:ss")
        console.log("data id for comment", data_id)
        try{
            axios.put(`https://asia-southeast2-fineweb-99acb.cloudfunctions.net/feed_post_data/comment/${data_id}`, 
            {
                "uid": uid,
                "displayName": displayName,
                "photoURL": photoURL,
                "comment": comment,
                "createdAt": timeData,
            },
            {
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": 'application/json',
                }
            }).then(() => {
                setComment('');
                props.refresh()
            })
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <div className="commentInput">
            <Row>
                <TextareaAutosize  className="text-area-style" placeholder="Write a comment..."  value={comment} onChange={(e) => setComment(e.target.value)} />          
                <span className="color-button" onClick={() => {
                    postComment(content_id)
                }} >Reply</span>
            </Row>
        </div>
    )
}
