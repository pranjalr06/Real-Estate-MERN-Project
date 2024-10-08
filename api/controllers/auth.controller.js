import User from '../models/User.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {

    const {username, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10)  //to hash the password || and hashSync is to wait for the pwd
    const newUser = new User({username, email, password: hashedPassword});
    try{
        await newUser.save();
        res.status(201).json('User created successfully!')
    }
    catch (error){
        next(error);
    }
   
};

//create a signin function | authorization & authentication

export const signin = async (req, res, next) => {
    const { email, password} = req.body;
    try{
        const validUser = await User.findOne({email});
        if(!validUser) return next(errorHandler(404, 'User not found'));

        const validPassword = bcryptjs.compareSync(password, validUser.password)    //it compare the password with the pwd in db
        if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET)
        const {password:pass, ...rest} = validUser._doc;     //for hiding pwd
        res
            .cookie('access_token', token, {httpOnly: true})
            .status(200)
            .json(rest); //saving the token data in the cookie
    } catch (error) {
        next(error);    // next is middleware
    }
} 