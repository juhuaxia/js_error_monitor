import StatusCode from '../StatusCode';
import { getAllErrorHelper , addNewErrorHelper } from '../helper/errorHelper';

const ErrorController = {
    /**
     * 新增错误数据
     */
    async addNewError(ctx){
        // let { errorName , type , filePath , line , col } = ctx.request.body;
        let result = await addNewErrorHelper(ctx.query);
        ctx.body = StatusCode[result.code];
    },
    /**
     * 获取全部错误数据
     */
    async getAllError(ctx){
        let result = await getAllErrorHelper();
        StatusCode[result.code].data = result.data;
        ctx.body = StatusCode[result.code];
    }
}

export default ErrorController;