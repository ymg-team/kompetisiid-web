import Profile from '../containers/user/index'

import LayoutEmpty from '../layouts/4.2/Empty'

export default {
  path: '/user',
  component: LayoutEmpty,
  routes: [
    {
      path: '/user/:username',
      component: Profile
    }
  ]
}
