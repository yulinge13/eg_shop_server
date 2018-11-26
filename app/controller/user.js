module.exports = app => {
    return class User extends app.Controller {
        //注册
        async addUserInfo() {
            const {
                ctx
            } = this
            const {
                name,
                passWord,
                sex,
                age
            } = ctx.request.body
            let signInfo = {
                name,
                passWord,
                sex,
                age
            }
            let res = await this.ctx.service.user.addUser(signInfo)
            ctx.success('ok', res)
            // ctx.body = {
            //     success:true,
            //     msg:'ok',
            //     data:token
            // }
        }
        //登陆
        async login() {
            const {
                ctx
            } = this
            const {
                name,
                passWord,
            } = ctx.request.body
            if (name && passWord) {
                let signInfo = {
                    name,
                    passWord,
                }
                let res = await this.ctx.service.user.login(signInfo)
                if(res){
                    ctx.success('登陆成功', res)
                }else{
                    ctx.success('登陆失败，账号密码错误', null)
                }
            } else {
                ctx.success('登陆失败', null)
            }
            // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoieXVsaW5nZTEzIiwicGFzc1dvcmQiOiJ5dTgwMTUxMTM1IiwiaWF0IjoxNTQxNDk4MTgyLCJleHAiOjE1NDE1MDE3ODJ9.U7aWREYsjAuCSB9J0_z3OIXaFq1vzeQ-9f-csN7Xzbw'
        }

    }

}