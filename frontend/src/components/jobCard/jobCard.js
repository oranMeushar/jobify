import React from 'react';
import {JobCardContainer, CardTitleContainer, TitlesText, CapitalLetter, CardMainContainer, CardFooter, Button} from './jobCard.style';
import { FaLocationArrow, FaCalendarAlt, FaBriefcase } from 'react-icons/fa';
import { useDeleteJobMutation } from '../../state/api';
import { useDispatch, useSelector } from 'react-redux';
import { setJobs } from '../../state/jobsReducer';
import { useNavigate   } from 'react-router-dom';
const JobCard = ({location, jobType, created, position, status, company, _id}) => {

    const [deleteJob, result] = useDeleteJobMutation();
    const dispatch = useDispatch();
    const jobs = useSelector(state =>state.jobs.jobsList);

    const navigate = useNavigate ();

    const colors = {
        'Pending':{
            background:'rgb(252, 239, 199)',
            color:'rgb(233, 185, 73)'
        },
        'Interview':{
            background: 'rgb(224, 232, 249)',
            color: 'rgb(100, 122, 203)'
        },
        'Declined':{
            background: 'rgb(255, 238, 238)',
            color: 'rgb(214, 106, 106)'
        }
        
    }

    const handleDelete = () =>{
        deleteJob({id:_id})
        .then(() =>{
            const updatedJobs = jobs.filter(job => job._id !== _id);
            dispatch(setJobs(updatedJobs));
        })
        .catch(() =>{console.log('An error occurred while trying to delete the job');});
    }

    const handleEdit = () =>{
        navigate('/add-job?edit=true', {state:{id:_id}})
    }

    return (
        <JobCardContainer>
            
            <CardTitleContainer>
                <CapitalLetter>{company.charAt(0).toUpperCase()}</CapitalLetter>
                <TitlesText> 
                    <p>Company: {company}</p> 
                    <p>Position: {position}</p>
                </TitlesText>
            </CardTitleContainer>
            <CardMainContainer color={colors[status].color} background={colors[status].background}>
                <p> <FaLocationArrow/> {location} </p>
                <p> <FaCalendarAlt/> {created} </p>
                <p> <FaBriefcase/> {jobType} </p>
                <p> {status} </p>
            </CardMainContainer>
            <CardFooter>
                <Button color={'#0f5132'} background={'#d1e7dd'} onClick={handleEdit}>Edit</Button>
                <Button color={'#842029'} background={'#f8d7da'} onClick={handleDelete}>Delete</Button>
            </CardFooter>
        </JobCardContainer>
    );
};

export default JobCard;