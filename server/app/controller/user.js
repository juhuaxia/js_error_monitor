import StatusCode from '../StatusCode';
import { signInHelper , signUpHelper , signOutHelper } from '../helper/singInUpHelper'
import LoginRecordHelper from '../helper/loginRecordHelper'

const UserController = {
    /**
     * 登录
     * @param {*} ctx 
     */
    async signIn(ctx){
        // console.log(ctx.request);
        let result = await signInHelper(ctx.request,ctx);
        ctx.body = StatusCode[result.code];
    },
    /**
     * 注册
     * @param {*} ctx 
     */
    async signUp(ctx){
        let result = await signUpHelper(ctx.request.body);
        ctx.body = StatusCode[result.code];
    },
    /**
     * 登出
     */
    async signOut(ctx){
        let result = await signOutHelper(ctx);
        ctx.body = StatusCode[result.code];
        ctx.redirect('/');
    },
}

export default UserController;