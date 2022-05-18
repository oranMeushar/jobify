import React from 'react';
import Logo from '../../components/logo/logo';
import {LogoContainer, LogoText, NavigationLinks, NavigationContainer} from './navigation.style';
import { FaChartBar, FaSearch, FaPlus, FaUser } from 'react-icons/fa';
import { useNavigate, NavLink   } from 'react-router-dom';
const Navigatiion = ({isBurgerClicked}) => {
    return (
        <NavigationContainer isBurgerClicked={isBurgerClicked}>

            <LogoContainer>
                <Logo/> 
                <LogoText>Jobify</LogoText>
            </LogoContainer>

            <NavigationLinks>
                <li>
                    <NavLink exact to='/stats'> <p><FaChartBar/></p>    Stats</NavLink>
                </li>
                <li>
                    <NavLink exact to='/all-jobs'> <p><FaSearch/></p> All Jobs</NavLink>
                </li>
                <li>
                    <NavLink exact to='/add-job'> <p><FaPlus/></p>  Add Job</NavLink>
                </li>
                <li>
                    <NavLink exact to='/profile'> <p><FaUser/></p>  Profile</NavLink>
                </li>
            </NavigationLinks>
        </NavigationContainer>
        
    );
};

export default Navigatiion;