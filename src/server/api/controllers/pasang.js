/**
 * الرَّحِيم الرَّحْمَنِ اللَّهِ بِسْمِ
 * Created by yussan on 13/11/16.
 */

import * as repo from '../repositories/pasang'

export function postCepat(req, res)
{
    return repo.postCepat(req.params, response => {
        res.json(response)
    })
}