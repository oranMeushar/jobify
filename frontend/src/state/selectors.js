import {createSelector} from '@reduxjs/toolkit';


const jobsSelector = (state) => state.jobs;



export const getCountOfJobsTypes = createSelector(
    [jobsSelector], (jobs) => {

        let res = {
            Interview:0,
            Pending:0, 
            Declined:0
        };

        if(jobs.jobsList.length){
            const {jobsList} = jobs;
            
            jobsList.forEach((job) =>{
                res[job.status] += 1;
            })
        }
        return res;
    }
);