import React, {useState} from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import googleLogo from '../../assets/images/google_logo.png'
import './style.css'
import {SignInWithGoogle, auth} from '../../firebase'
import {Link} from '@reach/router'
import Spinner from 'react-bootstrap/Spinner'
const LoginForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);



    const signInWithEmailAndPasswordHandler = (event) => {
        event.preventDefault()
        setLoading(true);
        auth.signInWithEmailAndPassword(email, password).then((res) => {
            setLoading(false)
        }).catch(error => {
            setError("Error signing in with password and email!");
            console.error("Error signing in with password and email", error);
            setLoading(false)
        });
    }



    return (
        <div className="form-container-style">
            <h4 style={{paddingBottom: 30, textAlign: 'center'}}>Sign In to finehub</h4>
            <Card>
                <Card.Body>
                    {error !== null && <div className = "error-container">{error}</div>}
                    <Form className="card-">
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
                        <Button variant="primary" type="submit" style={{width: '100%'}} onClick={signInWithEmailAndPasswordHandler}>
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
                                    <span>  Loading...</span>
                                </div>
                                :
                                <span>Sign In</span>
                            }
                        </Button>
                        <p style={{alignItems: 'center', textAlign: 'center', marginTop: 2, marginBottom: -2}}>or</p>
                        <Button variant="light" style={{width: '100%', paddingTop: 5, paddingBottom: 10}} onClick={SignInWithGoogle}>
                        <img src={googleLogo} alt="google-logo" width="20px" height="20px" style={{marginRight: 10}}/>Sign In using gmail account
                        </Button>
                        <div style={{textAlign: 'center', marginTop: 10}}>
                            <p style={{fontSize: 14}}>Don't have account yet? <Link to="signUp" className="text-blue-500 hover:text-blue-600">Sign up here</Link>{" "}</p>
                        </div>
                    </Form>
                </Card.Body>
            </Card>

        </div>
    )
}


export default LoginForm;