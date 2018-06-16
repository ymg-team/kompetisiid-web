/**
 * Created by yussan on 13/11/16.
 */
import formidable from 'formidable'

export function post(req, res, next)
{
    let form = new formidable.IncomingForm()
    form.uploadDir = '/tmp'
    form.parse(req, (err, fields, files) => {
        let params = fields
        params.files = files
        req.body = Object.assign({}, params)
        next()
    })
}
