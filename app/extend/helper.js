const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
const xlsx = require('xlsx');
module.exports = {
    //md5加密
    getMd5(content) {
        const hasx = crypto.createHash('md5')
        let res = hasx.update(content).digest('hex')
        return res
    },
    //解析token
    async jwtVerify(token) {
        const {
            keys
        } = this.app.config
        try {
            const isOkToken = jwt.verify(token, keys)
            return isOkToken
        } catch (err) {
            return false
        }
    },
    //判断文件类型
    async fileType(ctx) {
        try {
            let time = new Date().getTime()
            const file = await ctx.request.files[0]
            console.log(file)
            const {
                filename
            } = file
            const imgReg = /(jpeg|png|jpg)/g //图片的正则匹配
            const xlsxReg = /xlsx/g
            if (imgReg.test(filename)) {
                this.uploadImg(file, time, ctx)
            } else if (xlsxReg.test(filename)) {
                this.uploadXlsx(file, time, ctx)
            } else {
                ctx.error('上传失败', null)
            }
        } catch (err) {
            ctx.error('上传失败', err)
        }
    },
    //图片的上传
    async uploadImg(file, time, ctx) {
        try {
            const target = this.config.baseDir + '/app/public/images/' + time + file.filename //储存的路径
            const readStream = await fs.createReadStream(file.filepath) //读取流 读取上传过来的文件
            const writeStream = await fs.createWriteStream(target); // 写入流 准备要写入的路径
            await readStream.pipe(writeStream) // 写入（保存图片）
            ctx.success('上传成功', {
                name: path.basename(file.filename),
                basePath: this.config,
                url: '/public/images/' + time + file.filename
            })
        } catch (err) {
            ctx.error('上传失败', err)
        }
    },
    //xlsx 上传
    async uploadXlsx(file, time, ctx) {
        try {
            const target = this.config.baseDir + '/app/public/file/' + time + file.filename
            const readStream = await fs.createReadStream(file.filepath)
            const writeStream = await fs.createWriteStream(target);
            await readStream.pipe(writeStream)
            const workbook = xlsx.readFile(file.filepath);
            const sheetNames = workbook.SheetNames;
            let datas = []
            for (const sheetName of sheetNames) {
                const worksheet = workbook.Sheets[sheetName];
                const data = xlsx.utils.sheet_to_json(worksheet);
                datas.push(data);
            }
            ctx.success('上传成功', datas)
        } catch (err) {
            ctx.error('上传失败', null)
        }
    }
}