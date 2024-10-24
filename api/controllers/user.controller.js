import bcryptjs from 'bcryptjs';
import User from '../models/User.model.js';
import { errorHandler } from '../utils/error.js';

export const test = (req, res) => {
    res.json({
        message: 'User Api route is working',
    });
};

//this function 'test' is for the router.get() in user.router.js file

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id)
        return next(errorHandler(401, 'You can only update your own account!'))
    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            }
        }, { new: true })     //the new:true will update the information & will give u the new info not the previous one

        const { password, ...rest } = updateUser._doc;

        res.status(200).json(rest);
    } catch (error) {
        next(error)
    }
}