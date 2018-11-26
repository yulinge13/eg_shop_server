const Service = require('egg').Service
const UUID = require('node-uuid')
//订单状态枚举
const enumConfig = {
    0: 0, //刚下订单
    1: 1, //待支付
    2: 2, //已完成支付 待发货
    3: 3, //已完成支付 已发货
    4: 4, //已完成支付 已收货
    5: 5, //待评价
    6: 6, //已评价
}
class User extends Service {
    //添加用户
    async addOrder(params) {
        try {
            const {
                isOkToken,
                productId
            } = params
            const {
                userId
            } = isOkToken
            const orderId = UUID.v1().replace(/-/g, '')
            const orderNo = 'ylgShop' + new Date().getTime() + parseInt(Math.random() * 10000) + userId
            const creatTime = new Date().getTime()
            let productList = await this.app.mysql.query(`select * from product where id=${productId}`)
            let productInfo = productList[0]
            if (productInfo && productInfo.productNum >= 1) {
                let info = await this.app.mysql.query(`insert into orderLists(orderId,orderNo,productId,userId,creatTime,orderStatus) values('${orderId}','${orderNo}','${productId}','${userId}','${creatTime}',${enumConfig['0']})`)
                await this.app.mysql.query(`update product set productNum = ${productInfo.productNum-1} where id = ${productId}`)
                return info
            } else {
                return false
            }
        } catch (err) {
            return false
        }
    }
    //获取订单列表
    async orderLists(params) {
        const {
            pageNum,
            pageSize,
            keyWord,
            userId
        } = params
        let sql = `select * from orderlists o left join product p on o.productId = p.id where userId = '${userId}'`
        let sqlConfi = ''
        if (pageNum && pageSize && keyWord) {
            sqlConfi = ` like %${keyWord}% limit ${(pageNum-1)*pageSize},${pageSize}`
        } else if (pageNum && pageSize) {
            sqlConfi = ` limit ${(pageNum-1)*pageSize},${pageSize}`
        }
        let list = await this.app.mysql.query(sql + sqlConfi)
        return list
    }
    //支付
    async orderPay(params){
        try{
            const {
                orderId,
                userId
            } = params
            const sql = `update orderlists set orderStatus=${enumConfig['2']} where orderId='${orderId}' and userId=${userId}`
            const res = await this.app.mysql.query(sql)
            console.log(res)
            return res
        }catch(err){
            return false
        }
    }
}

module.exports = User