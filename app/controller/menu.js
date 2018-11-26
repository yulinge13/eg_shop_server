const Controller = require('egg').Controller

class MenuController extends Controller{
    async getMenuLists(){
        const ctx = this.ctx
        const res = await ctx.service.menu.findMenuLists()
        ctx.body = {
            success:true,
            msg:'ok',
            data:res
        }
    }
}

module.exports = MenuController