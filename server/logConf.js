export default {
    replaceConsole: true,
    appenders: {
        log: {
            type: 'console'
        },
        req: {
            type: 'dateFile',
            filename: './logs/reqLogs/',
            pattern: 'req-yyyy-MM-dd.log',
            alwaysIncludePattern: true,
            encoding:"utf-8",
            maxLogSize: 1000
        },
        res: {
            type: 'dateFile',
            filename: './logs/resLogs/',
            pattern: 'res-yyyy-MM-dd.log',
            alwaysIncludePattern: true,
            encoding:"utf-8",
            maxLogSize: 1000
        },
        err: {
            type: 'dateFile',
            filename: './logs/errLogs/',
            pattern: 'err-yyyy-MM-dd.log',
            alwaysIncludePattern: true,
            encoding:"utf-8",
            maxLogSize: 1000
        },
        oth: {
            type: 'dateFile',
            filename: './logs/othLogs/',
            pattern: 'oth-yyyy-MM-dd.log',
            alwaysIncludePattern: true,
            encoding:"utf-8",
            maxLogSize: 1000
        }
    },
    categories: {
        default: { appenders: ['log' , 'req' , 'res'] , level: 'debug' } ,
        err: { appenders: [ 'log' , 'err' ] ,level: 'error' },
        oth: { appenders: [ 'log' , 'oth'] ,level: 'info' }
    }
}
