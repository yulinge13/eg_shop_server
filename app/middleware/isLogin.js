module.exports = () => {
    return async function (ctx, next) {
        const isOkToken = await ctx.helper.jwtVerify(ctx.request.headers.token)
        if (isOkToken) {
            await next()
        } else {
            ctx.error('登陆失效', null)
        }
    }
}