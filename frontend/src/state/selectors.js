import {createSelector} from '@reduxjs/toolkit';
import moment from 'moment-timezone';
import _ from 'lodash';
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


export const getSeriesDataForChart = createSelector(
    [jobsSelector], (jobs) => {
        const categories = [];
        const interview = [];
        const pending = [];
        const decline = [];

        if(jobs.jobsList.length){
            const {jobsList} = jobs;
            const getCategories = () =>{
                const today = moment();
                for (let i = 0; i < 30; i++) {
                    const prevDay = moment().subtract(i, 'day').format('DD / MM');
                    categories.push(prevDay);
                }
            }
            getCategories();

            for (let i = 0; i < 30; i++) {
                const prevDay = moment().subtract(i, 'day').format('YYYY-MM-DD');
                
                const filteredDays = jobsList.filter(job =>{
                    const createdAt = job.createdAt.split('T')[0];
                    return createdAt === prevDay;
                });

                const statusGroup = _.groupBy(filteredDays, 'status');

                statusGroup.Interview ? interview.push(statusGroup.Interview.length) : interview.push(0)
                statusGroup.Pending ? pending.push(statusGroup.Pending.length) : pending.push(0);
                statusGroup.Declined ? decline.push(statusGroup.Declined.length) : decline.push(0);  
            }
        }
        
        return {
            categories:categories.reverse(),
            interview:interview.reverse(),
            pending: pending.reverse(),
            decline: decline.reverse(),
        };
    }
);