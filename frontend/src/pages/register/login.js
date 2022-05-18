import React, {useState} from 'react';
import {LoginContainer, Form, LogoContainer, LogoText, FormTitle, Input, Label, Button, FormFooter} from './register.style';
import Logo from '../../components/logo/logo';
import { useDispatch } from 'react-redux';
import { useLoginUserMutation } from '../../state/api';
import { setLogin } from '../../state/authReducer';
import {toast} from 'react-toastify';
import { useNavigate   } from 'react-router-dom';
import LoadingSpinner from '../../components/loader/loader';

const Login = ({setIsMember}) => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const [loginUser, result] = useLoginUserMutation();
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate ();

    const handleSubmit = (e) =>{
        e.preventDefault();
        const body = {
            email,
            password,
        }
        setIsLoading(true);
        loginUser(body)
        .unwrap()
        .then(handleSuccess)
        .catch(handleError)
    }

    const handleSuccess = (fulfilled) =>{
        const {email, name} = fulfilled.user;
        const {token} = fulfilled;
        localStorage.setItem('user',JSON.stringify({email,name, token}))
        dispatch(setLogin({email, name, token}));
        navigate('/stats');
    }

    const handleError = (err) =>{
        const {message, status} = err.data
        toast.error(`Status: ${status}. message: ${message}`)
        setIsLoading(false);
    }
    return (
        <LoginContainer>
            {isLoading && <LoadingSpinner topPosition={'10vmin'}/>}
            <Form onSubmit={handleSubmit}>
            <LogoContainer>
                <Logo/> 
                <LogoText>Jobify</LogoText>
            </LogoContainer>
            <FormTitle>Login</FormTitle>
            <Label htmlFor='email'>
                <p>Email</p>
                <Input id = 'email' type='email' value={email} onChange={(e) =>setEmail(e.target.value)} placeholder='1@2.com' required/>
            </Label>
            <Label htmlFor='password'>
                <p>Password</p>
                <Input id = 'password' type='password' value={password} onChange={(e) =>setPassword(e.target.value)}required/>
            </Label>
            <Button onClick={handleSubmit}>Submit</Button>
            <FormFooter>
                Not a member yet ? <span onClick={() =>setIsMember(false)}>Register</span>
            </FormFooter>
            </Form>
        </LoginContainer>
    );
};

export default Login;