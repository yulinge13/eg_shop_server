const Service = require('egg').Service
class MenuService extends Service {
    //查询所有的商品
    async findLists(parmas) {
        const {
            pageNum,
            pageSize,
            search
        } = parmas
        let sqlPage = `select * from product limit ${(pageNum-1)*pageSize}, ${pageSize}`
        let sqlSearch = `select * from product where productName like '%${search}%' limit ${(pageNum-1)*pageSize}, ${pageSize}`
        let sql = null
        if (search) {
            sql = sqlSearch
        } else {
            sql = sqlPage
        }
        console.log(sql)
        const res = await this.app.mysql.query(sql)
        return res
    }
    //添加商品
    async addProduct(parmas) {
        const {
            productName,
            price,
            productPic,
            productNum,
            classFirstId,
            classSecId
        } = parmas
        console.log(parmas)
        const res = this.app.mysql.query(`
        INSERT INTO product ( productName, price, productPic, productNum, classFirstId, classSecId )
        VALUES
            ( '${productName}', '${price}', '${productPic}', '${productNum}', '${classFirstId}', '${ classSecId }' )
        `)
        return res
    }
    //删除商品
    async removeProduct(id) {
        let sql = `
            delete from product where id = '${id}'
        `
        const res = this.app.mysql.query(sql)
        return res
    }
    //修改商品
    async editorProduct(parmas) {
        const {
            productName,
            price,
            productPic,
            productNum,
            classFirstId,
            classSecId,
            id
        } = parmas
        let sql = `
            update product set 
                productName='${productName}',
                price='${price}',
                productPic='${productPic}',
                productNum='${productNum}',
                classFirstId='${classFirstId}',
                classSecId='${classSecId}' 
            where 
                id='${id}'
        `
        const res = this.app.mysql.query(sql)
        return res
    }
}
module.exports = MenuService