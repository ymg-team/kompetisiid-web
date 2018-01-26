import * as repo from '../repositories/kompetisi'

/***
 * function to get kompetisi list
 * @method GET
 * @query limit (int)
 * @query popular (boolean), default not set
 * @query mediapartner (boolean), default not set
 * @query garansi (boolean), default not set
 * @query support (boolean), default not set
 * @query berakhir (boolean), default not set
 * @query lastid (string), encoded last id, use to load more data
 * @query firstid (string), encoded first id, use to load new data
 * @query mainkat (int), id main category
 * @query subkat (int), id sub category
 * @query tag (string), tag
 * @query q (string), keyboard to searching
 */
export function getJelajah(req, res, next)
{
    const url = req.query.popular && parseInt(req.query.popular) === 1 ? '/jelajah/popular' : '/jelajah'
    let {params} = req
    params.query = req.query
    req.reqdata = {
        method: 'get',
        params: req.params,
        url,
    }

    next()
}

/**
 *  function to get related competition
 *  @method GET
 *  @params (string) encid on url
 */
export function getRelated(req, res)
{
    repo.getRelated(req.params.id, response => {
        return res.json(response)
    })
}

/**
 * function to get all categories available
 * @method GET
 */
export function getCategories(req, res)
{
    repo.getCategories(response => {
        return res.json(response)
    })
}

/**
 * function to get detail competition
 * @method GET
 * @param (string) encoded id
 */
export function getDetail(req, res)
{
    repo.getDetail(req.params.id, response => {
        return res.json(response)
    })
}

/**
 * function to get favorited tag
 */
export function getFavoritedtag(req, res)
{
    repo.getFavoritedtag({}, response => {
        return res.json(response)
    })
}

/**
 * function to get pengumuman kompetisi
 * @method GET
 * @param (string) encoded id
 */
export function getPengumuman(req, res)
{
    repo.getPengumuman(req.params.id, response => {
        return res.json(response)
    })
}
