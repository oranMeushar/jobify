import React, {useEffect, useState} from 'react';
import withHeaderAndNav from '../../hocs/withHeaderAndNav/withHeaderAndNav';
import { Input } from '../register/register.style';
import {toast} from 'react-toastify';
import {AllJobsContainer, SearchFormContainer, FormTitle, FieldsContainer, Button, JobsListContainer} from './allJobs.style';
import { useGetAllJobsQuery } from '../../state/api';
import { setProfile } from '../../state/authReducer';
import { useDispatch, useSelector } from 'react-redux';
import { setJobs } from '../../state/jobsReducer';
import JobCard from '../../components/jobCard/jobCard';
import moment from 'moment-timezone';
const AllJobs = () => {
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('All');
    const [jobType, setJobType] = useState('All');
    const [sortBy, setSortBy] = useState('Latest');
    const dispatch = useDispatch();

    const jobs = useSelector(state =>state.jobs.jobsList);

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
        dispatch(setJobs(data.data))
    }


    useEffect(() =>{
        fetchJobs();
    },[]);

    const handleClear = () =>{
        setSearch('');
        setStatus('All');
        setJobType('All');
        setSortBy('Latest');
    };


    const sortResults = (jobs) =>{
        if(sortBy === 'Latest'){
            jobs = jobs.sort((jobA, jobB) =>{
                const jobAStartTime = moment(jobA.createdAt).valueOf();
                const jobBStartTime = moment(jobB.createdAt).valueOf();

                if(jobAStartTime > jobBStartTime) return -1;
                if(jobAStartTime < jobBStartTime) return 1;
                
                return 0;
                
            });
        }

        else if(sortBy === 'Oldest'){
            jobs = jobs.sort((jobA, jobB) =>{
                const jobAStartTime = moment(jobA.createdAt).valueOf();
                const jobBStartTime = moment(jobB.createdAt).valueOf();

                if(jobAStartTime > jobBStartTime) return 1;
                if(jobAStartTime < jobBStartTime) return -1;

                return 0;
                
            });
        }

        else if(sortBy === 'A-Z'){
            jobs = jobs.sort((jobA, jobB) =>{
                const nameA = jobA.company.toLowerCase();
                const nameB = jobB.company.toLowerCase();

                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
            
                return 0;
                
            });
        }

        return jobs;
    }

    const setFilters = () =>{
        if(jobs){
            let results = [...jobs];
            results = sortResults(results);

            if(status != 'All'){
                results = results.filter(job => job.status === status);
            }
    
            if(jobType != 'All'){
                results = results.filter(job => job.jobType === jobType);
            }

            if(search.length){
                results = results.filter(job => job.company.toLowerCase().includes(search.toLowerCase()))
            }

           

            return results;
        }
        

    }

    const filteredJobs = setFilters();

    return (
        <AllJobsContainer>
        <SearchFormContainer>
            <FormTitle>Filters</FormTitle>
            <FieldsContainer>

                <label htmlFor='search'>
                    <span>Search</span>
                    <Input type='search' id='search' value={search} onChange={(e) => setSearch(e.target.value)}/>
                </label>

                <label htmlFor='status'>
                       <span>Status</span> 
                        <select id='status' value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value='All'>All</option>
                            <option value='Pending'>Pending</option>
                            <option value='Interview'>Interview</option>
                            <option value='Declined'>Declined</option>
                        </select>
                </label>

                <label htmlFor='job-type'>
                        <span>Type</span>
                        <select id='job-type' onChange={(e) =>setJobType(e.target.value)} value={jobType}>
                            <option value='All'>All</option>
                            <option value='Full-Time'>Full-Time</option>
                            <option value='Part-Time'>Part-Time</option>
                            <option value='Remote'>Remote</option>
                            <option value='Internship'>Internship</option>
                        </select>
                </label>

                <label htmlFor='sortBy'>
                        <span>Sort</span>
                        <select id='sortBy' onChange={(e) =>setSortBy(e.target.value)} value={sortBy}>
                            <option value='Latest'>Latest</option>
                            <option value='Oldest'>Oldest</option>
                            <option value='A-Z'>A-Z</option>
                        </select>
                </label>

                <Button color={'2cb1bc'} onClick={handleClear}>Clear</Button>

            </FieldsContainer>
        </SearchFormContainer>

        <h1>{jobs && jobs.length} Jobs found</h1>
        <JobsListContainer>
            {filteredJobs && filteredJobs.map(job =>{
                return <JobCard {...job}></JobCard>
            })}
        </JobsListContainer>
    </AllJobsContainer>
    );
};

export default withHeaderAndNav(AllJobs);





