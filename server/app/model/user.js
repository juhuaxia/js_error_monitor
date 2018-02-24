import mongoose, { Schema } from "mongoose";
import { validPassword } from "../lib/commjs";

/**
 * @param {String} userName 用户名
 * @param {String} password 密码
 * @param {String} avatar 头像
 * @param {String} createTime 创建日期
 */
const User = new Schema({
    userName: {
        type:'String',
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        validate:[validPassword , '密码长度为0-8位'],
        trim: true
    },
    token: {
        type: String,
        trim: true
    },
    avatar: {
        type: String,
        default: 'http://wx4.sinaimg.cn/thumb150/0065Yaa0ly1fnv2h4r51dj30qo0qoabw.jpg',
        trim: true
    },
    createTime: String
})

export default mongoose.model('User',User);