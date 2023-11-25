import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

// route protection based on token
export const requireSignIn = async (req, res, next) => {
    try {
        const auth = req.headers?.authorization || req.headers?.Authorization
        const decode = JWT.verify(auth, process.env.JWT_SECRET);

        req.user = decode;
        next();
    } catch (error) {
        res.send({
            success: false,
            message: 'Access denied',
            error
        });
    }
}

// admin access
export const adminAccess = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);

        if(!user?.role) {
            return res.send({
                success: false,
                message: "Unauthorized access"
            })
        }
        next();
    } catch (error) {
        return res.status(500).send({
            success: false,
            error
        })
    }
}

// user access
export const userAccess = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);

        if(user?.role) {
            return res.send({
                success: false,
                message: "Unauthorized access"
            })
        } else {
            return res.status(200).send({
                success: true,
                message: "User access grated!"
            })
        }
    } catch (error) {
        return res.status(500).send({
            success: false,
            error
        })
    }
}