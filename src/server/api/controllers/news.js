/**
 * الرَّحِيم الرَّحْمَنِ اللَّهِ بِسْمِ
 * created by yussan 23 Oct 2016 18:29
 */

export function getNews(req, res, next)
{
    let {params} = req
    params.query = req.query
    req.reqdata = {
        version: 'v42',
        method: 'get',
        params,
        url: `/v2/news`,
    }

    next()
}

export function getNewsDetail(req, res, next)
{
    req.reqdata = {
        method: 'get',
        params: req.params,
        url: `/berita/read/${req.params.id}`,
    }

    next()
}
