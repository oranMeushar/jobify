const AppError = require('../utils/appError');

const handleErrorDev = (error, res) => {
    res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
        stack: error.stack,
        errors:error.errors,
        error
    })
}


const errorController = (error, req, res, next) =>{
    error.statusCode = error.statusCode || 500;
    error.message = error.message || 'Server Error';
    
    if(process.env.NODE_ENV === 'development'){
        handleErrorDev(error, res);
    }
    //TODO: handle production case
}



module.exports = errorController;