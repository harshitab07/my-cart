import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
    try {
        const { name, email, password, role, answer } = req.body;

        // validation
        if (!name) {
            return res.send(
            {
                success: false,
                message: 'Name is required'
            }
        );
        }

        if (!email) {
            return res.send(
            {
                success: false,
                message: 'Email is required'
            }
        );
        }

        if (!password) {
            return res.send(
            {
                success: false,
                message: 'Password is required'
            }
        );
        }

        if (!answer) {
            return res.send(
            {
                success: false,
                message: 'Please answer the question'
            }
        );
        }

        // make sure its unique
        const user = await userModel.findOne({ email });
        if (user) {
            return res.send(
                {
                    success: false,
                    message: 'User already registered. Please LogIn'
                }
            );
        }

        // save user
        const hashedPassword = await hashPassword(password);
        const newUser = await new userModel({name, email, password: hashedPassword, role: role || 0, answer}).save();

        return res.status(200).send(
            {
                success: true,
                message: 'User registered successfully!',
                newUser
            }
        );
    } catch (err) {
        console.log('Error in registerController', { err });
        res.status(500).send(
            {
                success: false,
                message: 'Error in registration',
                error: err
            }
        );
    }
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // validation
        if (!email || !password) {
            return res.send(
            {
                success: false,
                message: 'Invalid email or password'
            }
        );
        }

        // check user
        const user = await userModel.findOne({email});

        if (!user) {
            return res.send(
                {
                    success: false,
                    message: 'User not found'
                }
            );
        }

        const match = await comparePassword(password, user.password);

        if (!match) {
            return res.send(
                {
                    success: false,
                    message: 'Invalid password'
                }
            );
        }

        // create token
        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" } );

        return res.status(200).send(
            {
                success: true,
                message: 'Logged in successfully!',
                user: {
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    id: user?._id,
                    address: user?.address,
                    phone: user?.phone
                },
                token
            }
        );
    } catch (err) {
        console.log('Error in loginController', { err });
        res.status(500).send(
            {
                success: false,
                message: 'Error in login',
                error: err
            }
        );
    }
};

// test controller
export const testController = (req, res) => {
    try {
        res.send('Protected route');
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Access denied',
            error
        });
    }

}

// change password controller
export const forgotPasswordController = async (req, res) => {
    try {
        const { email, password, answer } = req.body;

        if (!email || !password || !answer) {
            res.send({
                success: false,
                message: 'Email, password and answer are required!',
            });
        }

        const user = await userModel.findOne({email});
        if (!user) {
            return res.send({
                success: false,
                message: 'Invalid email',
            });
        }

        if (user.answer !== answer) {
            return res.send({
                success: false,
                message: 'Incorrect answer',
            });
        }

        const hashedPassword = await hashPassword(password);

        await userModel.findByIdAndUpdate(user._id, { password: hashedPassword });
        res.status(200).send({
            success: true,
            message: 'Password changed successfully',
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Failed to change password',
            error
        });
    }
}

export const profileController = async (req, res) => {
    try {
        const { email, address, phone, id : _id } = req.body;

        const user = await userModel.findById(req.user._id);
        const updatedUser = await userModel.findByIdAndUpdate(req.user._id, { address: address || user?.address, phone: phone || user?.phone }, {new:true});
        console.log({ updatedUser })
        res.status(200).send({
            success: true,
            message: 'Updated profile successfully',
            data: updatedUser
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Failed to update profile',
            error: error.message || error
        });
    }
}

export const ordersController = async (req, res) => {
    try {
        const orders = await orderModel.find({buyer: req.user._id}).populate("products","-photo").populate("buyer", "name");
        res.json(orders);
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Failed to get orders',
            error: error.message || error
        });
    }
};