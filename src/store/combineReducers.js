/**
 * Created by yussan on 02/10/16.
 */
import Kompetisi from "../client/pages/competition/reducer"
import Berita from "../client/pages/news/reducer"
import Pasang from "../client/pages/sendCompetition/reducer"
import User from "./user/reducer"
import Request from "../client/pages/_super/requests/reducer"
import Others from "../client/pages/others/reducer"

import { combineReducers } from "redux"

export default combineReducers({
  Kompetisi,
  Berita,
  Pasang,
  User,
  Request,
  Others
})
