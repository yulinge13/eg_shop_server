const crypto = require('crypto')
const jwt = require('jsonwebtoken')
module.exports = {
    //md5加密
    getMd5(content) {
        const hasx = crypto.createHash('md5')
        let res = hasx.update(content).digest('hex')
        return res
    },
    //解析token
    async jwtVerify(token){
        const {
            keys
        } = this.app.config
        try{
            const isOkToken = jwt.verify(token, keys)
            return isOkToken
        }catch(err){
            return false
        }
    }
}