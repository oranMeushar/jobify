import React from 'react';
import {CardContainer} from './card.style';
const Card = ({icon, color, iconBackgroundColor,countJobs, text}) => {

    return (
        <CardContainer color={color} background={iconBackgroundColor}>
            <div>
                <h1 className='counted-jobs'>{countJobs}</h1>
                <span>{icon}</span>
            </div>
            <p>{text}</p>
        </CardContainer>
    );
};

export default Card;