import mongoose , { Schema } from 'mongoose';

const LoginRecord = new Schema({
    userName: {
        type: String,
        required: true,
        trim: true
    },
    loginTime: {
        type: String,
        required: true
    }
})

export default mongoose.model('LoginRecord',LoginRecord);