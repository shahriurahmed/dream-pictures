import React, { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import SocialLogin from './SocialLogin/SocialLogin';

const Login = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const emailRef = useRef('');
    const passwordRef = useRef('');


    if (user) {
        navigate(from, { replace: true });
    }

    if (loading) {
        return <div class="spinner-border" style={{ marginTop: "150px" }} role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    }
    const handleSubmit = event => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value
        signInWithEmailAndPassword(email, password)
    }

    return (
        <div className='container w-50 mx-auto'>
            <h2 className='fw-bold mt-5'>Please Log In</h2>
            <SocialLogin></SocialLogin>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
                    <Form.Label >Email address</Form.Label>
                    <Form.Control ref={emailRef} type="email" placeholder="Enter email" required />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3 text-start" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control ref={passwordRef} type="password" placeholder="Password" required />
                </Form.Group>
                <p className='text-danger text-start'>{error?.message}</p>
                <Button className='px-5 mb-3' variant="dark" type="submit">
                    Submit
                </Button>
            </Form>
            <p>New to Dream Pictures <Link to='/signup' className='text-danger pe-auto text-decoration-none ' >Please Sign Up</Link></p>
        </div>
    );
};

export default Login;