import UserController from '../controller/user';
import ErrorController from '../controller/error';
import LoginRecordController from '../controller/loginRecord';

export default function(Router){
    
    var router = new Router({
        // prefix:'/api'
    });

    router
    .post('/api/login',UserController.signIn)
    .post('/api/signup',UserController.signUp)
    .get('/api/addError',ErrorController.addNewError)
    .post('/api/getAllError',ErrorController.getAllError)
    .post('/api/getLoginRecord',LoginRecordController.getLoginRecord)

    return router.routes();
}