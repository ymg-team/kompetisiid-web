import Profile from '../containers/user/index'

import LayoutEmpty from '../layouts/EmptyLayout'

export default {
  path: '/u',
  component: LayoutEmpty,
  routes: [
    {
      path: '/u/:username',
      component: Profile
    }
  ]
}
