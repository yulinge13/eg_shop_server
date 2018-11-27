
module.exports = (pamras,app) => {
    return async function (ctx,next) {
        console.log(ctx.query)
        console.log(ctx.method)
        const method = ctx.method.toUpperCase()
        let body = []
        if(method === 'GET'){
            body = ctx.request.query
        }else if(method === 'POST'){
            body = ctx.request.body
        }
        let onOff = true
        let msg = ''
        pamras.forEach(i => {
            if(!body[i]){
                onOff = false
                msg = `请填写${i}`
            }
        })
        if(onOff){
            await next()
        }else{
            ctx.body = {
                success:false,
                data:null,
                msg
            }
        }
    }
}   