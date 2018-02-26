import { checkLogin } from '../middleware/index';
import cookiesConf from '../config/cookiesConfig';
import UserController from '../controller/user';

export default function(Router) {
    let router = new Router();
    // router.use(checkLogin);
    
    router.get('/login',async (ctx , next) => {
        let title = '登录';
        await ctx.render('login',{title});
    })
    .get('/reg',async (ctx , next) => {
        let title = '注册';
        await ctx.render('reg',{title});
    })
    // .get('/', checkLogin , async (ctx , next) => {
    .get('/' ,checkLogin, async (ctx , next) => {
        // console.log(ctx.body);
        let title = '首页';
        let userName = ctx.cookies.get('userName',cookiesConf);
        let avatar = ctx.cookies.get('avatar',cookiesConf);
        let logged_in = ctx.cookies.get('logged_in',cookiesConf);
        let data = {
            title,
            userName,
            avatar,
            logged_in
        }
        await ctx.render('index',data);
    })
    .get('/testadd', checkLogin , async (ctx , next) => {
    // .get('/testadd' , async (ctx , next) => {
        let title = '测试添加数据';
        await ctx.render('testAdd',{title});
    })
    .get('/logout', UserController.signOut)

    return router.routes();
}