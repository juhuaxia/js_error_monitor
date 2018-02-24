const errorConfig = {
    200: {
        code: 200,
        msg: '成功',
        data:[]
    },
    404: {
        code: 404,
        msg: '资源不存在',
        data:[]
    },
    500: {
        code: 500,
        msg: '服务器错误',
        data:[]
    },
    502: {
        code: 502,
        msg: '服务器错误',
        data:[]
    },
    //登录相关
    600: {
        code: 600,
        msg: '用户名或密码错误',
        data:[]
    },
    601: {
        code: 601,
        msg: '用户未登录',
        data:[]
    },
    602: {
        code: 602,
        msg: 'token错误',
        data:[]
    },
    603: {
        code: 603,
        msg: '用户名不存在',
        data:[]
    },
    //注册相关
    700: {
        code:700,
        msg: '用户名已存在',
        data:[]
    },
    //通用
    800: {
        code:800,
        msg: '参数错误',
        data:[]
    },
    801: {
        code: 801,
        msg: '验证码错误',
        data:[]
    },
    802: {
        code: 802,
        msg: '用户名不能为空'
    },
    803: {
        code: 803,
        msg: '密码不能为空'
    },
}

export default errorConfig;