import mongoose, { Schema } from 'mongoose';

/**
 * 错误信息模型
 * @param {String} errorName 错误名称
 * @param {String} filePath 出错文件路径
 * @param {Number} line 错误行数
 * @param {Number} col 错误列数
 * @param {String} createTime 创建日期
 */

 const Errors = new Schema({
     errorName: String,
     type:String,
     filePath: String,
     line: Number,
     col: Number,
     createTime: String
 })

 export default mongoose.model('Errors',Errors);