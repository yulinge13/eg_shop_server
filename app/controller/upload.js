const Controller = require('egg').Controller
const xlsx = require('xlsx');
const fs = require('fs')
const path = require('path')
class uploadFile extends Controller {
    async uploadFiles() {
        let url = this.config.baseDir + '/app/public/images'
        const ctx = this.ctx
        let time = new Date().getTime()
        // fs.readdirSync(url)
        try {
            const file = await ctx.request.files[0]
            console.log(file)
            // const stream = await ctx.getFileStream();
            // const target = this.config.baseDir + '/app/public/images/' + time + stream.filename
            const target = this.config.baseDir + '/app/public/file/' + time + file.filename
            // console.log(stream)
            const readStream = await fs.createReadStream(file.filepath)
            const writeStream = await fs.createWriteStream(target);
            await readStream.pipe(writeStream)
            // await stream.pipe(writeStream)
            const workbook = xlsx.readFile(file.filepath);
            const sheetNames = workbook.SheetNames;
            let datas = []
            for (const sheetName of sheetNames) {
                const worksheet = workbook.Sheets[sheetName];
                const data = xlsx.utils.sheet_to_json(worksheet);
                datas.push(data);
            }
            ctx.body = {
                data: datas,
                // name: path.basename(stream.filename),
                // basePath: this.config,
                // url: '/public/images/' + time + stream.filename
            }
        } catch (err) {
            ctx.body = {
                success: false,
                data: err
            }
        }
    }
}
module.exports = uploadFile