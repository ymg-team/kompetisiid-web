/**
 * الرَّحِيم الرَّحْمَنِ اللَّهِ بِسْمِ
 * created by yussan 23 Oct 2016 18:29
 */

 /**
  * function to create news
  * @param {object} req.body
  */
export function createNews(req, res, next) {
  req.reqdata = {
    version: "v42",
    method: "post",
    params: req.body,
    url: `/v2/news`
  }

  next()
}

/**
 * function to update news by id
 * @param {number} req.params.id
 * @param {object} req.body
 */
export function udpateNewsById(req, res, next) {
  req.reqdata = {
    version: "v42",
    method: "put",
    params: req.body,
    url: `/v2/news/${req.params.id}`
  }
}

export function getNews(req, res, next) {
  let { params } = req
  params.query = req.query
  req.reqdata = {
    version: "v42",
    method: "get",
    params,
    url: `/v2/news`
  }

  next()
}

export function getNewsDetail(req, res, next) {
  req.reqdata = {
    version: "v42",
    method: "get",
    params: req.params,
    url: `/v2/news/${req.params.id}`
  }

  next()
}
