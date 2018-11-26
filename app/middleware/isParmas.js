
module.exports = (pamras,app) => {
    return async function (ctx,next) {
        console.log(ctx.query)
        console.log(pamras)
        const {body} = ctx.request
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