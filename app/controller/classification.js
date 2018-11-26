const Controller = require('egg').Controller
class Classification extends Controller {
    //获取分类
    async getClass() {
        const ctx = this.ctx
        const {
            classFirstId
        } = ctx.query
        const res = await ctx.service.classification.getClass(classFirstId || null)
        ctx.body = {
            success: true,
            msg: '查询成功',
            status: 200,
            data: res
        }
    }
    //添加分类
    async addClass() {
        const ctx = this.ctx
        const {
            firstClassName,
            secClassName
        } = ctx.request.body
        if (secClassName && firstClassName) {
            const res = await ctx.service.classification.addClass(ctx.request.body)
            ctx.body = {
                success: true,
                msg: '添加成功',
                status: 200,
                data: res
            }
        } else {
            ctx.body = {
                success: false,
                msg: '添加失败',
                status: 400,
                data: null
            }
        }
    }
    //查询所有的一级分类
    async getFirstClass() {
        const ctx = this.ctx
        const res = await ctx.service.classification.getFirstClass()
        ctx.body = {
            success: true,
            msg: '获取成功',
            status: 200,
            data: res
        }
    }
}
module.exports = Classification