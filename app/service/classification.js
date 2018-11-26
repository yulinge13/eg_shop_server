const Service = require('egg').Service

class Classification extends Service {
    //获取分类
    async getClass(firstClassId) {
        let sql = `
        SELECT
            cfs.*,
            cf.NAME firstClassName,
            cs.NAME secClassName 
        FROM
            class_first_sec cfs
            LEFT JOIN classificationfirst cf ON cfs.classFirstId = cf.id
            LEFT JOIN classificationsec cs ON cfs.classSecId = cs.id`
        // 如果有firstClassId 根据firstClassId查询该下面的二级分类    
        if (firstClassId) {
            sql += ` where cfs.classFirstId = '${firstClassId}' order by cf.name desc`
        }else{
            sql += ' order by cf.name desc'
        }
        const res = await this.app.mysql.query(sql)
        return res
    }
    //添加分类
    async addClass(parmas) {
        const {
            firstClassName,
            secClassName
        } = parmas
        let sqlFirst = `
            insert into classificationfirst(name) values('${firstClassName}')
        `
        let sqlSec = `
            insert into classificationsec(name) values('${secClassName}')
        `
        await this.app.mysql.query(sqlFirst)
        const firstId  = await this.app.mysql.query(`select id from classificationfirst where name = '${firstClassName}'`)
        await this.app.mysql.query(sqlSec)
        const secId  = await this.app.mysql.query(`select id from classificationsec where name = '${secClassName}'`)
        const result = await this.app.mysql.query(`insert into class_first_sec(classFirstId,classSecId) values('${firstId[0].id}','${secId[0].id}')`)
        return result 
    }
    //查询所有的一级分类
    async getFirstClass(){
        let sql = `select * from classificationfirst`
        const res = await this.app.mysql.query(sql)
        return res
    }
}


module.exports = Classification