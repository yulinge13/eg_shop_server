const Service = require('egg').Service
class MenuService extends Service {
    async findMenuLists(parmas) {
        const ctx = this.ctx
        const res = await this.app.mysql.query(`select * from firstmenu`)
        return res
    }
}
module.exports = MenuService