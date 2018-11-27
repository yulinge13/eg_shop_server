const Controller = require('egg').Controller

class ProductController extends Controller {
    //查询所有的商品
    async findLists(parmas) {
        const {
            ctx,
            app
        } = this
        let data = null
        data = await ctx.service.product.findLists(ctx.query)
        // await app.redis.del('lists')
        // await app.redis.exists('lists', async function (err, res) {
        //     if (res === 1) { // 存在  
        //         console.log('exists');
        //         data = await app.redis.get('lists')
        //         ctx.body = {
        //             success: true,
        //             data: data,
        //             msg: 'ok'
        //         }
        //     } else {
        //         console.log('no exists');
        //         data =  await ctx.service.product.findLists(ctx.query)
        //         app.redis.set('lists', data.join())
        //         ctx.body = {
        //             success: true,
        //             data: data,
        //             msg: 'ok'
        //         }
        //     }
        // });
        console.log('enter')
        console.log(data)
        ctx.body = {
            success: true,
            data: data,
            msg: 'ok'
        }
    }
    //添加商品
    async addProduct(parmas) {
        const {
            ctx
        } = this
        console.log(ctx.request.body)
        const {
            productName,
            price,
            productPic,
            productNum,
            classFirstId,
            classSecId,
            id
        } = ctx.request.body
        if (productName && price && productPic && productNum && classSecId && classFirstId) {
            let res = null
            if (id) {
                res = await ctx.service.product.editorProduct(ctx.request.body)
            } else {
                res = await ctx.service.product.addProduct(ctx.request.body)
            }
            ctx.body = {
                success: true,
                data: res,
                msg: 'ok'
            }
        } else {
            ctx.body = {
                success: false,
                data: {},
                msg: '信息不全'
            }
        }

    }
    //删除商品
    async removeProduct() {
        const {
            ctx
        } = this
        console.log(ctx.request.body)
        const {
            id
        } = ctx.request.body
        const res = await ctx.service.product.removeProduct(id)
        ctx.body = {
            success: true,
            data: res,
            msg: 'ok'
        }
    }
    //获取商品详情
    async getProductInfo() {
        const {
            ctx
        } = this
        const {
            productId
        } = ctx.request.query
        const res = await ctx.service.product.getProductInfo(productId)
        if(res){
            ctx.success('获取成功',res)
        }else{
            ctx.error('获取失败',res)
        }
    }
}
module.exports = ProductController