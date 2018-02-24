import Koa from 'koa';
import path from 'path';
import Router from 'koa-router';
import render from 'koa-ejs';
import cors from 'koa-cors';
import bodyParser from 'koa-bodyparser';
import staticServer from 'koa-static';
import api from './app/route/api';
import pageRoute from './app/route';
import mongoose, { Promise } from 'mongoose';
import {dbconfig} from './app/config';
import log4js from 'log4js';
import logConfig from './logConf';
import session from 'koa-generic-session';
import MongoStore from 'koa-generic-session-mongo';
// import cookiesConf from './app/config/cookiesConfig';
// import sessionConf from './app/config/sessionConfig';

log4js.configure(logConfig);

const errLog = log4js.getLogger('err');
const debugLog = log4js.getLogger('default');
const othLog = log4js.getLogger('oth');

mongoose.promise = Promise;
mongoose.connect(dbconfig.url);
mongoose.connection.on('error',(error)=>{
    errLog.error('mongoose connect error',error)
    console.error('db connect error');
});

var app = new Koa();

render(app,{
    root:path.join(__dirname,'app/view'),
    layout:false,
    viewExt:'ejs'
});

app.use(cors({
    origin:function(ctx){
        return "*";
    },
    credentials: true,
    allowMethods: ['GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

app.keys = ['js','error_ob'];

// app.use(session(sessionConf));
app.use(bodyParser());
app.use(staticServer(path.join(__dirname, 'app/statics')))
app.use(api(Router));
app.use(pageRoute(Router));

app.listen(3000);