import React, {useState, useEffect} from 'react';
import withHeaderAndNav from '../../hocs/withHeaderAndNav/withHeaderAndNav';
import { useAddJobMutation, useEditJobMutation } from '../../state/api';
import { Input } from '../register/register.style';
import {AddJobContainer, FormTitle, FieldsContainer,Button, ButtonContainer} from './addJob.style';
import {toast} from 'react-toastify';
import { useLocation, useNavigate   } from 'react-router-dom';
import { useSelector } from 'react-redux';
const AddJob = () => {

    const [position, setPosition] = useState('');
    const [company, setCompany] = useState('');
    const [location, setLocation] = useState('');
    const [status, setStatus] = useState('Pending');
    const [jobType, setJobType] = useState('Full-Time');

    const [iseEdit, setIsEdit] = useState(false);

    const [addJob] = useAddJobMutation();
    const [editJob] = useEditJobMutation();

    const {state, search} = useLocation();
    const navigate = useNavigate();

    const jobs = useSelector(state =>state.jobs.jobsList);

    useEffect(() =>{
        handleEdit();
    },[])

    const handleEdit = () =>{
        if(search.includes('edit=true')){
            
            const jobId = state?.id;
            const foundJob = jobs.find(job => job._id === jobId);
            
            if(!foundJob) {
                return navigate('/all-jobs');
            }
            
            setPosition(foundJob.position);
            setCompany(foundJob.company);
            setLocation(foundJob.location);
            setStatus(foundJob.status);
            setJobType(foundJob.jobType)
            
        }
    }

    
    

    const handleSubmit = (e) =>{
        e.preventDefault();
        const body = {
            position,
            company,
            location,
            status,
            jobType,
        }

        if(search.includes('edit=true')){
            editJob({body, id:state.id})
            .unwrap()
            .then(handleSuccess)
            .catch(handleError)
        }
        else{
            addJob(body)
            .unwrap()
            .then(handleSuccess)
            .catch(handleError)
        }

        
    }

    const handleClear = () =>{
        setPosition('');
        setCompany('');
        setLocation('');
        setJobType('Full-Time');
        setStatus('Pending');
    }


    const handleSuccess = (fulfilled) =>{
        search.includes('edit=true') ?
         toast.success('Successfully updated selected job') :
         toast.success('Successfully added a new job')
        
    }

    const handleError = (err) =>{  
        toast.error(`Position and Company fields are required`)
    }

    return (
        <AddJobContainer>
            <form className='form' onSubmit={handleSubmit}>
                <FormTitle>{search.includes('edit=true') ? 'Edit ' : 'Add '}Job</FormTitle>
                <FieldsContainer>

                    <label htmlFor='position'>
                        <span>Position</span>
                        <Input type='text' id='position' value={position} onChange={(e) => setPosition(e.target.value)} required/>
                    </label>

                    <label htmlFor='company'>
                        <span>Company</span>
                        <Input type='text' id='company' value={company} onChange={(e)=>setCompany(e.target.value)} required/>
                    </label>

                    <label htmlFor='location'>
                        <span>Job Location</span>
                        <Input type='text' id='location' value={location} onChange={(e)=>setLocation(e.target.value)}required/>
                    </label>

                    <label htmlFor='status'>
                       <span>Status</span> 
                        <select id='status' onChange={(e) =>setStatus(e.target.value)} value={status}>
                            <option value='Pending'>Pending</option>
                            <option value='Interview'>Interview</option>
                            <option value='Declined'>Declined</option>
                        </select>
                    </label>

                    <label htmlFor='job-type'>
                        <span>Job Type</span>
                        <select id='job-type' onChange={(e) =>setJobType(e.target.value)} value={jobType}>
                            <option value='Full-Time'>Full-Time</option>
                            <option value='Part-Time'>Part-Time</option>
                            <option value='Remote'>Remote</option>
                            <option value='Internship'>Internship</option>
                        </select>
                    </label>

                    <ButtonContainer>
                        <Button color={'2cb1bc'} onClick={handleSubmit}>Submit</Button>
                        <Button color={'627d98'} onClick={handleClear}>Clear</Button>
                    </ButtonContainer>

                </FieldsContainer>
            </form>
        </AddJobContainer>
    );
};

export default withHeaderAndNav(AddJob);