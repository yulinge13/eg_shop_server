const Service = require('egg').Service
class ProductService extends Service {
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
            classSecId,
            productContent
        } = parmas
        console.log(parmas)
        const res = this.app.mysql.query(`
        INSERT INTO product ( 
            productName, 
            price, 
            productPic, 
            productNum, 
            classFirstId, 
            classSecId ,
            productContent
        )
        VALUES ( 
            '${productName}',
            '${price}', 
            '${productPic}', 
            '${productNum}', 
            '${classFirstId}',
            '${classSecId}',
            '${productContent}'
        )`)
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
            id,
            productContent
        } = parmas
        let sql = `
            update product set 
                productName='${productName}',
                price='${price}',
                productPic='${productPic}',
                productNum='${productNum}',
                classFirstId='${classFirstId}',
                classSecId='${classSecId}' 
                productContent=${productContent}
            where 
                id='${id}'
        `
        const res = this.app.mysql.query(sql)
        return res
    }
    //获取商品
    async getProductInfo(id) {
        let sql = `select * from product where id=${id}`
        let data = await this.app.mysql.query(sql)
        if (data.length > 0) {
            let info = data[0]
            let commnetSql = `select * from comment where productId=${id}`
            let comments = await this.app.mysql.query(commnetSql)
            return { ...info,
                comments
            }
        } else {
            return false
        }
    }
}
module.exports = ProductService