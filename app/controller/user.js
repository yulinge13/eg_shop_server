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
            if (res) {
                ctx.success('恭喜注册成功!', res)
            } else {
                ctx.error('注册失败!', res)
            }
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
                if (res) {
                    ctx.success('登陆成功', res)
                } else {
                    ctx.error('登陆失败，账号密码错误', null)
                }
            } else {
                ctx.error('登陆失败', null)
            }
        }

    }

}