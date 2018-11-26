module.exports = app => {
    return class Order extends app.Controller {
        //添加订单
        async addOrder() {
            const {
                ctx
            } = this
            const {
                productId
            } = ctx.request.body
            const isOkToken = await ctx.helper.jwtVerify(ctx.headers.token)
            if (isOkToken) {
                const res = await ctx.service.order.addOrder({
                    isOkToken,
                    productId
                })
                if (res) {
                    ctx.success('下单成功', res)
                } else {
                    ctx.error('下单失败', null)
                }
            } else {
                ctx.error('登陆失效', null)
            }
        }
        //获取订单列表
        async orderLists() {
            const {
                ctx
            } = this
            const {
                pageNum,
                pageSize,
                keyWord
            } = ctx.request.body
            const {
                token
            } = ctx.headers
            const isOkToken = await ctx.helper.jwtVerify(token)
            if (isOkToken) {
                let res = await ctx.service.order.orderLists({userId:isOkToken.userId,...ctx.request.body})
                ctx.success('获取成功！',res)
            } else {
                ctx.error('登陆失效', null)
            }
        }
        //支付 
        async orderPay(){
            const {ctx} = this
            const {
                orderId
            } = ctx.request.body
            const {
                token
            } = ctx.request.headers
            const isOkToken = await ctx.helper.jwtVerify(token)
            if (isOkToken) {
                let res = await ctx.service.order.orderPay({userId:isOkToken.userId,orderId})
                if(res){
                    ctx.success('支付成功！',res)
                }else{
                    ctx.error('支付失败！', null)
                }
            } else {
                ctx.error('登陆失效', null)
            }
        }
    }
}