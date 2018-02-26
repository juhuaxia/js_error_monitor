import ErrorModel from '../model/errorInfo';
import log4js from 'log4js';
import produce from 'immer';

let result = {
    code:200,
    data:[]
}

const errLog = log4js.getLogger('err');

export async function addNewErrorHelper(params){
    let { errorName , type , filePath , line , col } = params;
        let createTime = Date.now();
        let newError = {
            errorName,
            type,
            filePath,
            line,
            col,
            createTime
        }
        // console.log(ctx.query);
        try{
            await ErrorModel.create(newError);
        }catch(err){
            errLog.error('errors create error',err);
            throw new Error('errors create error');
        }
        return produce(result,draft=>{
            draft.code = 200;
        })
}

export async function getAllErrorHelper(params){
    let res = [];
    try{
        res = await ErrorModel.find({},null);
    }catch(err){
        errLog.error('getError error',err);
        throw new Error('getError error');
    }
    return produce(result,draft=>{
        draft.code = 200;
        draft.data = res;
    })
}

export async function getErrorByTypeHelper(){
    let res = [];
    try{
        res = await ErrorModel.find({})
    }catch(err){

    }
}