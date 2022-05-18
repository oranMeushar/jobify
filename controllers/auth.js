const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (userId, userEmail) =>{
    const jwtOptions = {
        expiresIn:process.env.JWT_EXPIRE  * 60 * 60  //* 2 hour
    };
    return jwt.sign({userId, userEmail}, process.env.JWT_SECRET, jwtOptions)
}

const register = catchAsync(async(req, res, next) =>{
    await User.init();
    
    const user = new User({
        ...req.body
    });

    await user.save();

    user.__v = undefined;
    user.password = undefined;

    const token = generateToken(user.id, user.email);

    res.status(201).json({
        status:'Success',
        message:'User was successfully created',
        user,
        token
    })
});


const login = catchAsync(async(req, res, next) =>{
    const {email, password} = req.body;

    if(!email || !password){
        return next(new AppError('Please provide both email and password', 'Failed', 400))
    }

    const user = await User.findOne({email});

    if(!user || ! await user.isPassword(password, user.password)){
        return next(new AppError('Invalid email or password', 'Failed', 400));
    }

    user.password = undefined;
    user.__v = undefined;
    const token = generateToken(user._id, user.email);

    res.status(200).json({
        status:'Success',
        message:'Successfully login',
        user,
        token
    })
});



const profile = catchAsync(async(req, res, next) =>{
    const {name, email, password, passwordConfirm} = req.body;
    let user = req.user;

    let updatedFields = {};

    if(name) updatedFields.name = name;
    if(email) updatedFields.email = email;

    user = await User.findByIdAndUpdate(user.id, updatedFields, {runValidators:true, returnDocument:'after'});

    if(password && !passwordConfirm){
        return next(new AppError('Please confirm password', 'Failed', 400))
    }

    if(!password && passwordConfirm){
        return next(new AppError('Please fill the password field', 'Failed', 400))
    }

    if(password && passwordConfirm){
        if(password !== passwordConfirm){
            return next(new AppError('Passwords are not match', 'Failed', 400))
        }
        user.password = password;
        user.passwordConfirm = passwordConfirm;
        await user.save();
    }
    user.password = undefined;
    res.status(200).json({
        status:'Success',
        message:'Profile was successfuly changed',
        user
    });
});




module.exports = {
    register,
    login,
    profile
}

