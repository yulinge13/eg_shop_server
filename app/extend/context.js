module.exports = {
    //成功的提示
    success(msg, data) {
        this.body = {
            msg,
            success: true,
            data
        }
    },
    //失败的提示
    error(msg, data) {
        this.body = {
            msg,
            success: false,
            data
        }
    }
};