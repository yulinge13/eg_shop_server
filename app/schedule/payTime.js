module.exports = {
    schedule: {
        interval: '10s', // 1 分钟间隔
        type: 'worker', // 指定所有的 worker 都需要执行
    },
    async task(ctx) {
        console.log('this is timer task')
    },
};