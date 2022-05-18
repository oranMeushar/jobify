import React from 'react';
import {LoadingSpinnerContainer} from './loader.style';
import Spinner from 'react-loading';

const LoadingSpinner = ({topPosition}) => {
    return (
        <LoadingSpinnerContainer topPosition={topPosition}>
            <Spinner type='spin' color='#7f36ba' width='48px'/>
        </LoadingSpinnerContainer>
    )
}
export default LoadingSpinner