/**
 * Created by yussan on 21/10/16.
 */
import * as actions from '../actions'
import {expectedAction} from '../../consts'
import {CALL_API} from '../../middlewares/api'

describe('actions kompetisi', () => {
    it('get Categories', () => {
        const act = actions.getCategories()
        expect(act).toEqual(expectedAction)

        const expectedResponse = {
            
        }
        const {url, method} = act[CALL_API]
    })
})