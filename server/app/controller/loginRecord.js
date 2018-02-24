import StatusCode from '../StatusCode';
const LoginRecordController = {
    /**
     * 插入登录日期
     * @param {String} userName 用户名
     * @param {*} ctx 
     */
    async addLoginRecord(userName , ctx){
        // let { userName } = ctx.request.body;
        console.log('recode ok')
        // ctx.body = StatusCode[200];
    },

    /**
     * 获取某用户的登录信息
     */
    async getLoginRecord(ctx){
        let { userName } = ctx.request.body;
        let res = await LoginRecordModel.find({ userName })
        StatusCode[200].data = res;
        ctx.body = StatusCode[200]
    }
}

export default LoginRecordController;