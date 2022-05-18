import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaBriefcase, FaBug, FaCalendarCheck  } from 'react-icons/fa';

import withHeaderAndNav from '../../hocs/withHeaderAndNav/withHeaderAndNav';
import { setJobs } from '../../state/jobsReducer';
import { getCountOfJobsTypes } from '../../state/selectors';
import {StatsContainer, CardsContainer} from './stats.style';
import Card from './Card/card';

const Stats = () => {

    const dispatch = useDispatch();


    const jobs = useSelector(getCountOfJobsTypes);

    const fetchJobs = async () =>{
        let res, data;
        const user = JSON.parse(localStorage.getItem('user'));
        res = await fetch('http://localhost:5000/jobs',{
            method:'GET',
            headers:{
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json',
            }
        })

        data = await res.json();
        dispatch(setJobs(data.data));
    }

    useEffect(() => {
        fetchJobs();
    },[])
    return (
        <StatsContainer>

            <CardsContainer>
                <Card 
                    icon={<FaBriefcase/>} 
                    color={'rgb(233, 185, 73)'} 
                    iconBackgroundColor={'rgb(252, 239, 199)'} 
                    countJobs={jobs['Pending']}
                    text={'Pending Applications'}
                />
                <Card 
                    icon={<FaBug/>} 
                    color={'rgb(100, 122, 203)'} 
                    iconBackgroundColor={'rgb(224, 232, 249)'} 
                    countJobs={jobs['Interview']}
                    text={'Interviews Scheduled'}
                />
                <Card 
                    icon={<FaCalendarCheck/>} 
                    color={'rgb(214, 106, 106)'} 
                    iconBackgroundColor={'rgb(255, 238, 238)'}
                    countJobs={jobs['Declined']}
                    text={'Jobs Declined'}/>
            </CardsContainer>
        </StatsContainer>
    );
};

export default withHeaderAndNav(Stats);