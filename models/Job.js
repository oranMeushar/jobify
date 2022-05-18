const mongoose = require('mongoose');


const jobSchema = new mongoose.Schema({

    user:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    position:{
        type:'string',
        required:[true, 'position is required'],
        maxLength:[50, 'position length cant exceed 50 characters'], //
        minlength:[2, 'position length cant be less than 2 characters']
    },
    company:{
        type:'string',
        required:[true, 'company is required'],
        maxLength:[30, 'company length cant exceed 30 characters'], //
        minlength:[2, 'company length cant be less than 2 characters']
    },
    location:{
        type:'string',
        maxLength:[30, 'location length cant exceed 30 characters'], //
        // minlength:[2, 'location length cant be less than 2 characters'],
        default:'My City' //#this will only kick in if the field <location> is not present in the post request
    },
    status:{
        type:'string',
        enum:['Interview', 'Pending', 'Declined'],
        require:[true, 'status is required'],
    },
    jobType:{
        type:'string',
        enum:['Full-Time', 'Part-Time', 'Remote', 'Internship'],
        required:[true, 'Job type is required']
    }
}, { timestamps:true});

jobSchema.pre('validate', function(next){
    if(this.location?.length === 0){
        this.location = 'My City'
    }
    next();
});
jobSchema.post('save', function(doc, next){
    this.__v = undefined;
    next();
});

const Job = mongoose.model('Job', jobSchema);


module.exports = Job;