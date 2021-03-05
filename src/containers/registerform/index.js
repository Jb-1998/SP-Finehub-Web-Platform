import React, {useState} from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import googleLogo from '../../assets/images/google_logo.png'
import './style.css'
import {SignInWithGoogle, generateUserDocument, auth} from '../../firebase'
import {Link} from '@reach/router';

const LoginForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [error, setError] = useState(null);


    

    const createUserWithEmailAndPasswordHandler = async (event) => {
        event.preventDefault()

        try{
            const {user} = await auth.createUserWithEmailAndPassword(email, password);
            generateUserDocument(user, {displayName});
          }
          catch(error){
            setError('Error Signing up with email and password');
        }
    }
    console.log(email)
    console.log(password)


    return (
        <div className="form-container-style">
            <h4 style={{paddingBottom: 30}}>Sign In to Access the platform</h4>
            <Card>
                <Card.Body>
                    <Form className="card-">

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Display Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter display name" value={displayName} onChange={(e) => setDisplayName(e.target.value)}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" style={{width: '100%'}} onClick={createUserWithEmailAndPasswordHandler}>
                            Sign Up
                        </Button>
                        <p style={{alignItems: 'center', textAlign: 'center', marginTop: 2, marginBottom: -2}}>or</p>
                        <Button variant="light" style={{width: '100%', paddingTop: 5, paddingBottom: 10}} onClick={SignInWithGoogle}>
                        <img src={googleLogo} alt="google-logo" width="20px" height="20px" style={{marginRight: 10}}/>Sign In using gmail account
                        </Button>
                        <div style={{textAlign: 'center', marginTop: 10}}>
                            <p style={{fontSize: 14}}>Already have account yet? <Link to="/" className="text-blue-500 hover:text-blue-600">Sign In here</Link>{" "}</p>
                        </div>
                    </Form>
                </Card.Body>
            </Card>

        </div>
    )
}


export default LoginForm;