
module.exports = (opation,app) => {
    return async function (ctx,next) {
        console.log(11111)
        await next()
    }
}   