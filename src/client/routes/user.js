import Profile from '../pages/user/index'

import LayoutEmpty from '../layouts/EmptyLayout'

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
