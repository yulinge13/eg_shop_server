const Service = require('egg').Service
const jwt = require('jsonwebtoken')
class User extends Service {
    //添加用户
    async addUser(params) {
        const {ctx} = this
        const {
            name,
            passWord,
            sex,
            age
        } = params
        let md5Possword = ctx.helper.getMd5(passWord)
        let info = await this.app.mysql.query(`insert into user(name,passWord,sex,age) values('${name}','${md5Possword}','${sex || null}','${age || null}')`)
        return info
    }

    //更新用户
    async updateUser(params) {
        const {
            name,
            age,
            id
        } = params
        const info = await this.app.mysql.update('user', {
            name,
            age
        }, {
            where: {
                id
            }
        })
        return info
    }
    //删除用户
    async deleteUser(params) {
        const {
            id
        } = params
        // const info = await this.app.mysql.delete('user',{
        //     where:{
        //         id:4
        //     }
        // })
        const info = await this.app.mysql.query(`delete from user where id = ?`, [id])
        return info
    }
    //用户登陆
    async login(params) {
        const {
            ctx
        } = this
        const {
            name,
            passWord,
        } = params
        let md5Possword = ctx.helper.getMd5(passWord)
        let res = await this.app.mysql.query(`select * from user where name='${name}' and passWord='${md5Possword}'`)
        if (res && res.length > 0) {                                                 
            const {
                keys
            } = this.app.config
            let token = jwt.sign({...params,userId:res[0].id}, keys, {
                expiresIn: 60 * 60 * 1 // 1小时过期
            })
            return {
                ...res[0],
                token
            }
        } else {
            return false
        }
    }
}

module.exports = User