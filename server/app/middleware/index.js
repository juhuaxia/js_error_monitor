import cookiesConf from '../config/cookiesConfig';
import log4js from 'log4js';
import StatusCode from '../StatusCode';
import {tokenConf} from '../config';
import jwt from 'jsonwebtoken';

export async function checkLogin(ctx , next){
    let token = ctx.cookies.get('token',cookiesConf),
        uid = ctx.cookies.get('uid',cookiesConf);
    if(!uid || !token){
        ctx.body = StatusCode[601];
        ctx.redirect('/login');
        ctx.cookies.set('logged_in','no',cookiesConf);
    }else{
        let tokenValid;
        try {
            tokenValid = await jwt.verify(token, tokenConf.tokenSecretKey);     //如果token过期或验证失败，将抛出错误
        } catch (err) {
            ctx.cookies.set('logged_in','no',cookiesConf);
            ctx.body = StatusCode[601];
            ctx.redirect('/login');
        }
        ctx.cookies.set('logged_in','yes',cookiesConf);
        await next();
    }
}

// export async function logout(ctx,next){
    
//     await next();
// }