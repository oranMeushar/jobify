import React, {useState} from 'react';
import {LoginContainer, Form, LogoContainer, LogoText, FormTitle, Input, Label, Button, FormFooter} from './register.style';
import Logo from '../../components/logo/logo';
import {useCreateUserMutation} from '../../state/api';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../state/authReducer';
import { useNavigate   } from 'react-router-dom';

const Signup = ({setIsMember}) => {

    const [name, setName] = useState({value:'', isError:false});
    const [email, setEmail] = useState({value:'', isError:false});
    const [password, setPassword] = useState({value:'', isError:false});
    const [passwordConfirm, setPasswordConfirm] = useState({value:'', isError:false});

    const [createUser,] = useCreateUserMutation();

    const dispatch = useDispatch();

    const navigate = useNavigate ();

    const handleSubmit = (e) =>{
        e.preventDefault();
        const body = {
            name:name.value,
            email: email.value,
            password: password.value,
            passwordConfirm:passwordConfirm.value
        }
        createUser(body)
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
        const {errors} = err.data;
        if (errors) {
            for (const key in errors) {
                switch (key) { 
                    case 'name':
                        setName({value:errors[key].message, isError:true});
                        break;
                    case 'email':
                        setEmail({value:errors[key].message, isError:true});
                        break;
                    case 'password':
                        setPassword({value:errors[key].message, isError:true});
                        break;
                    case 'passwordConfirm':
                        setPasswordConfirm({value:errors[key].message, isError:true});
                        break;
                    default:
                        break;
                }
            }
        }
        if (err.data.message.includes('E11000')) {
            setEmail({value:'Email already exists', isError:true});
        }
    }


    return (
        <LoginContainer>
            <Form onSubmit={handleSubmit}>
            <LogoContainer>
                <Logo/> 
                <LogoText>Jobify</LogoText>
            </LogoContainer>
            

            <FormTitle>Register</FormTitle>
            <Label htmlFor='name'>
                <p>Name</p>
                <Input 
                    id = 'name' 
                    type='text' 
                    value={name.value} 
                    onChange={(e) => setName({value:e.target.value, isError:false})} 
                    isError={name.isError} 
                    onFocus={(e) => {setName({value:e.target.value, isError:false}); name.isError && e.target.select()}} 
                    required
                />
            </Label>
            <Label htmlFor='email'>
                <p>Email</p>
                <Input 
                    id = 'email' 
                    type='email' 
                    placeholder='1@2.com'
                    value={email.value} 
                    onChange={(e) => setEmail({value:e.target.value, isError:false})} 
                    isError={email.isError} 
                    onFocus={(e) =>{setEmail({value:e.target.value, isError:false});email.isError && e.target.select() }}  
                    required
                />
            </Label>
            <Label htmlFor='password'>
                <p>Password</p>
                <Input 
                    id = 'password' 
                    type={password.isError ? 'text' : 'password'} 
                    value={password.value} 
                    onChange={(e) => setPassword({value:e.target.value, isError:false})} 
                    isError={password.isError}
                    onFocus={(e) => setPassword({value: password.isError ? '' : e.target.value, isError:false})} 
                    required
                />
            </Label>
            <Label htmlFor='passwordConfirm'>
                <p>Confirm Password</p>
                <Input 
                    id = 'passwordConfirm' 
                    type=  {passwordConfirm.isError ? 'text' : 'password'} 
                    value={passwordConfirm.value} 
                    onChange={(e) => setPasswordConfirm({value:e.target.value, isError:false})} 
                    isError={passwordConfirm.isError} 
                    onFocus={(e) => setPasswordConfirm({value: passwordConfirm.isError ? '' : e.target.value, isError:false})} 
                    required
                />
            </Label>
            <Button onClick={handleSubmit}>Submit</Button>
            <FormFooter>
                Already a member ? <span onClick={() =>setIsMember(true)}>Login</span>
            </FormFooter>
            </Form>
        </LoginContainer>
    );
};

export default Signup;