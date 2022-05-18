import React, {useState} from 'react';
import LinesSvg from '../../resources/images/lines.svg';
import {HeaderContainer, HeaderTitle, ButtonContainer, Burger, LogOutButton} from './header.style';
import { FaUserCircle, FaArrowAltCircleDown } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../../state/authReducer';
const Header = ({setIsBurgerClicked, isBurgerClicked}) => {


    const user = useSelector((state) => state.auth.user)

    const dispatch = useDispatch();

    
    const [isClicked, setIsClicked] = useState(false);

    const handleLogOutClicked = (e) =>{
        e.stopPropagation();
        dispatch(setLogout());
    }   

    return (
        <HeaderContainer>
            <Burger src={LinesSvg} alt="svg" onClick={() =>setIsBurgerClicked(!isBurgerClicked)}/>
            <HeaderTitle>Dahsboard</HeaderTitle>  
            <ButtonContainer onClick={() =>setIsClicked(!isClicked)}>
                <p><FaUserCircle/></p> 
                <p>{user.name}</p> 
                <p><FaArrowAltCircleDown/></p> 
                <LogOutButton onClick={handleLogOutClicked} isClicked={isClicked}>Log Out</LogOutButton>
            </ButtonContainer>
        </HeaderContainer>
    );
};

export default Header;