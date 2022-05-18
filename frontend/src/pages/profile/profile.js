import React, {useState} from 'react';
import withHeaderAndNav from '../../hocs/withHeaderAndNav/withHeaderAndNav';
import { Input } from '../register/register.style';
import {toast} from 'react-toastify';
import {ProfileContainer, FormTitle, FieldsContainer, Button, ButtonContainer} from './profile.style';
import { useChangeProfileMutation } from '../../state/api';
import { setProfile } from '../../state/authReducer';
import { useDispatch } from 'react-redux';
import LoadingSpinner from '../../components/loader/loader';

const Profile = () => {


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const [changeProfile, result] = useChangeProfileMutation();
    const handleSubmit = (e) =>{
        e.preventDefault();

        if(!name && !email && !password && !passwordConfirm){
            toast.error('Nothing to update');
            return;
        }
        const body = {
            name,
            email,
            password,
            passwordConfirm,
        }
        setIsLoading(true);
        changeProfile(body)
        .unwrap()
        .then(handleSuccess)
        .catch(handleError)
    }

    const handleSuccess = (fulfilled) =>{
       toast.success('Successfully updated profile');
       const {user} = fulfilled;
       setIsLoading(false);
       dispatch(setProfile(user));
    }

    const handleError = (err) =>{  
        let errorsString = '';
        const {errors} = err.data;
        if (errors) {
            for (const key in errors) {
                errorsString += errors[key].message + '.' + '\n' ;
            }
        }

        if(!errors){
            errorsString += err.data.message + '.' + '\n' ;
        }

        toast.error(errorsString);
        setIsLoading(false);
    }


    return (
        <ProfileContainer>
            {isLoading && <LoadingSpinner topPosition={'22vmin'}/>}
            <form className='form' onSubmit={handleSubmit}>
                <FormTitle>Profile</FormTitle>
                <FieldsContainer>

                    <label htmlFor='name'>
                        <span>Name</span>
                        <Input type='text' id='name' value={name} onChange={(e) => setName(e.target.value)} required/>
                    </label>

                    <label htmlFor='email'>
                        <span>Email</span>
                        <Input type='text' id='email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                    </label>

                    <ButtonContainer>
                        <Button color={'2cb1bc'} onClick={handleSubmit}>Submit</Button>
                    </ButtonContainer>

                    <label htmlFor='password'>
                        <span>Password</span>
                        <Input type='password' id='password' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                    </label>

                    <label htmlFor='passwordConfirm'>
                        <span>Confirm Password</span>
                        <Input type='password' id='passwordConfirm' value={passwordConfirm} onChange={(e)=>setPasswordConfirm(e.target.value)} required/>
                    </label>
                </FieldsContainer>
            </form>
        </ProfileContainer>
    );
};

export default withHeaderAndNav(Profile);





