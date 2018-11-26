const Controller = require('egg').Controller;
class HomeController extends Controller {
    async index() {
        const ctx = this.ctx
        const user = await ctx.service.user.find()
        ctx.body = user
    }
    async addUser() {
        const ctx = this.ctx
        const {
            name,
            age
        } = ctx.request.body
        console.log(ctx.request.body)
        if (name && age) {
            const user = await ctx.service.user.addUser({
                name,
                age
            })
            console.log(user)
            ctx.body = {
                success: true,
                msg: '添加成功',
                status: 200,
                data: {
                    user
                }
            }
        } else {
            ctx.body = {
                success: false,
                msg: '添加失败',
                status: 400,
                data: {}
            }
        }
    }
    async updateUser() {
        const ctx = this.ctx
        const {
            name,
            age,
            id
        } = ctx.request.body
        console.log(ctx.request.body)
        if (name && age) {
            const user = await ctx.service.user.updateUser({
                name,
                age,
                id
            })
            ctx.body = {
                success: true,
                msg: '更新成功',
                status: 200,
                data: {
                    user
                }
            }
        } else {
            ctx.body = {
                success: false,
                msg: '更新失败',
                status: 400,
                data: {}
            }
        }
    }
    async deleteUser() {
        const ctx = this.ctx
        const {
            id
        } = ctx.request.body
        console.log(ctx.request.body)
        if (id) {
            const user = await ctx.service.user.deleteUser({
                id
            })
            ctx.body = {
                success: true,
                msg: '删除成功',
                status: 200,
                data: {
                    user
                }
            }
        } else {
            ctx.body = {
                success: false,
                msg: '删除失败',
                status: 400,
                data: {}
            }
        }
    }
}

module.exports = HomeController