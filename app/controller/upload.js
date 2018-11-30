const Controller = require('egg').Controller
class uploadFile extends Controller {
    async uploadFiles() {
        try {
            const ctx = this.ctx
            await ctx.helper.fileType(ctx)
        } catch (err) {
            ctx.error('上传失败', err)
        }
    }
}
module.exports = uploadFile