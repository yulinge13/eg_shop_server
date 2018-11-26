module.exports = appInfo => {
    const config = {};
    // should change to your own
    config.keys = 'yulinge';

    // add your config here
    config.security = {
        csrf: {
            ignoreJSON: false, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
            enable: false,
        },
        methodnoallow: {
            enable: false
        },
        domainWhiteList: ['localhost:7001']
    };
    config.cors = {
        origin: '*',
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
        credentials: true
    };
    config.bodyParser = {
        jsonLimit: '1mb',
        formLimit: '1mb',
    }
    config.multipart = {
        mode: 'file',
    };
    // config.redis = {
    //     client: {
    //         port: 6379, // Redis port 
    //         host: '127.0.0.1', // Redis host 
    //         password: '',
    //         db: 0,
    //     },
    // }

    // config.onerror = {
    //     // all(err, ctx) {
    //     //     // 在此处定义针对所有响应类型的错误处理方法
    //     //     // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
    //     //     ctx.body = 'error';
    //     //     ctx.status = 500;
    //     // },
    //     html(err, ctx) {
    //         // html hander
    //         ctx.body = '<h3>error</h3>';
    //         ctx.status = 500;
    //     },
    //     json(err, ctx) {
    //         console.log(err)
    //         // json hander
    //         ctx.body = {
    //             message: 'error'
    //         };
    //         ctx.status = 500;
    //     },
    //     jsonp(err, ctx) {
    //         // 一般来说，不需要特殊针对 jsonp 进行错误定义，jsonp 的错误处理会自动调用 json 错误处理，并包装成 jsonp 的响应格式
    //     },
    // }
    return config;
};