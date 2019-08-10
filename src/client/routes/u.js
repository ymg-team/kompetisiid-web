import Profile from '../containers/user/index'

import LayoutEmpty from '../layouts/4.2/Empty'

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
