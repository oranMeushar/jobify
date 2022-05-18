import React from 'react';
import { useNavigate   } from 'react-router-dom';
import Logo from '../../components/logo/logo';
import detectiveImage from '../../resources/images/detective.png';
import {LogoContainer, LogoText, HomeContainer, TitleAndButtonContainer, MainTitle, SubTitle, Button, DetectiveImage} from './home.style';
const Home = () => {

    const navigate = useNavigate ();

    return (
        <HomeContainer>
            <LogoContainer>
                <Logo/> 
                <LogoText>Jobify</LogoText>
            </LogoContainer>
            <TitleAndButtonContainer>
                <MainTitle>Job <span>Tracking</span> App</MainTitle>
                <SubTitle>I may not have gone where i intended to go but i think i have ended up where i intended to be</SubTitle>
            </TitleAndButtonContainer>
            <Button onClick={() => navigate('/register')}>Login/Register</Button>
            <DetectiveImage src={detectiveImage}/>
        </HomeContainer>
    );
};

export default Home;