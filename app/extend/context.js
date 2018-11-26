module.exports = {
    success(msg, data) {
        this.body = {
            msg,
            success: true,
            data
        }
    },
    error(msg, data) {
        this.body = {
            msg,
            success: false,
            data
        }
    }
};