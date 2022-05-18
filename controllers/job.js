const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Job = require('../models/Job');
const moment = require('moment-timezone');


const addJob = catchAsync(async(req, res, next) =>{
    await Job.init();

    const newJob = new Job({
        ...req.body,
        user: req.user.id
    });

    await newJob.save();

    res.status(201).json({
        message: 'Job saved successfully',
        data:newJob
    })
});


const editJob = catchAsync(async(req, res, next) =>{
    const jobId = req.params.id;

    let foundJob = await Job.findById(jobId);



    if(!foundJob){
        return next(new AppError('Job not found', 'Failed', 400));
    }
    let xxx = req.body;


    
    for (const key in req.body) {
        foundJob[key] = req.body[key];
    }


    await foundJob.save();
    res.status(201).json({
        message: 'Job Updated successfully',
        data:foundJob
    })
});

const getAllJobs = catchAsync(async(req, res, next) =>{
    const userId = req.user.id;

    let allJobs = await Job.find({user:userId}).sort({createdAt:-1});

    
    allJobs = allJobs.map(job =>{
        const created = moment(job.createdAt).format('MMMM Do, YYYY');
        return{
            ...job._doc,
            created
        }
    })
    

    res.status(200).json({
        message: 'Successfully fetched all jobs',
        data:allJobs
    })
});


const deleteJob = catchAsync(async(req, res, next) =>{

    const jobId = req.params.id;
    
   await Job.findByIdAndRemove(jobId);
   const allJobs = await Job.find({user:req.user.id})

    
    

    res.status(204).json({
        message: 'Successfully deleted selected job',
        data:allJobs
    })
});


module.exports ={
    addJob,
    getAllJobs,
    deleteJob,
    editJob
}