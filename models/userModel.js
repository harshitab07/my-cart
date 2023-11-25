import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    role: {
        type: Number,
        require: false,
    },
    answer: {
        type: String,
        require: false,
    },
    address: {
        type: String,
        require: false,
    },
    phone: {
        type: String,
        require: false,
    }
}, { timestamps: true });

export default mongoose.model('users', userSchema);