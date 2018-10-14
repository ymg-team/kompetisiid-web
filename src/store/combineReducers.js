/**
 * Created by yussan on 02/10/16.
 */
import Kompetisi from '../client/containers/competition/reducer'
import Berita from '../client/containers/news/reducer'
import Pasang from '../client/containers/sendCompetition/reducer'
import User from '../client/containers/user/reducer'
import Request from '../client/containers/_super/requests/reducer'

import {combineReducers} from 'redux'

export default combineReducers({
  Kompetisi,
  Berita,
  Pasang,
  User,
  Request
})
