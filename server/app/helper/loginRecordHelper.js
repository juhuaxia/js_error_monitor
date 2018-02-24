import LoginRecordModel from '../model/loginRecord';
import log4js from 'log4js';

const errLog = log4js.getLogger('err');

async function loginRecordHelper(userName){
    let result = {
        code:200,
        data:[]
    }
    let loginTime = Date.now();
    let record = {
        userName,
        loginTime
    }
    try{
        await LoginRecordModel.create(record);
    }catch(err){
        errLog.error('loginRecord create error',err);
        throw new Error('loginRecord create error');
    }
    return result;
}

export default loginRecordHelper;