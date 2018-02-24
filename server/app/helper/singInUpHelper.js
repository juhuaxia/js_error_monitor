import jwt from 'jsonwebtoken';
import UserModel from '../model/user';
import produce from 'immer';
import LoginRecordHelper from './loginRecordHelper';
import log4js from 'log4js';
import cookiesConf from '../config/cookiesConfig';
import {tokenConf} from '../config';

const errLog = log4js.getLogger('err');

let result = {
    code:200,
    data:[]
}

export async function signInHelper(params,ctx){
    let { userName , password } = ctx.request.body;
    
    let user = await UserModel.findOne({ userName }).exec();
    if( !user || ( user && password !== user.password )){
        const nextState =  produce(result,draft=>{
            draft.code = 600;
        })
        return nextState;
    }else{
        let token = jwt.sign( { name: user.userName }, tokenConf.tokenSecretKey, { expiresIn: tokenConf.expiresIn });
        user.token = token;
        try{
            await user.save();
        }catch(err){
            errLog.error('user signIn save error',err);
            throw new Error('user signIn save error');
        }
        LoginRecordHelper(userName);
        // ctx.session.user = user;
        // console.log(user._id,user.token);
        ctx.cookies.set('uid',user._id,cookiesConf);
        ctx.cookies.set('userName',user.userName,cookiesConf);
        console.log(user.avatar)
        ctx.cookies.set('avatar',user.avatar,cookiesConf);
        ctx.cookies.set('token',user.token,cookiesConf);
        ctx.cookies.set('logged_in','yes',cookiesConf);
        return produce(result,draft=>{
            draft.code = 200;
        })
        // result.data = [user];
    }
}

export async function signUpHelper(params){
    let { userName , password } = params;
    let token = jwt.sign( { userName } , 'secret', { expiresIn: 60*60 });
    let createTime = Date.now();
    let newUser = {
        userName,
        password,
        token,
        createTime
    }
    try{
        await UserModel.create(newUser);
    }catch(err){
        errLog.error('user signUp create error',err);
        throw new Error('user signUp create error');
    }
    return produce(result,draft=>{
        draft.code = 200;
    })
}

export async function signOutHelper(ctx){
    ctx.cookies.set('logged_in','no',cookiesConf);
    ctx.cookies.set('token','',cookiesConf);
    return produce(result,draft=>{
        draft.code = 200;
    }) 
}