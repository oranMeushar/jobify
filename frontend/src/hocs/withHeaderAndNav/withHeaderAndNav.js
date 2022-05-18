import React, {useState} from 'react';
import {HeaderAndNavContainer, HeaderAndMain} from './withHeaderAndNav.style';
import Navigatiion from '../../components/navigation/navigatiion';
import Header from '../../components/header/header';

const withHeaderAndNav = (Component) => {
    return (props) =>{
        const [isBurgerClicked, setIsBurgerClicked] = useState(false);

        return(
            <HeaderAndNavContainer>
                <Navigatiion isBurgerClicked = {isBurgerClicked}/>  
                <HeaderAndMain>
                    <Header setIsBurgerClicked={setIsBurgerClicked} isBurgerClicked={isBurgerClicked}/>
                    <Component/>
                </HeaderAndMain>
            </HeaderAndNavContainer>
        )
    }
};

export default withHeaderAndNav;