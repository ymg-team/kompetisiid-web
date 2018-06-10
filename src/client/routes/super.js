// layouts
import EmptyLayout from '../layouts/4.2/Empty'
import SuperLayout from '../layouts/SuperLayoutV5'

// containers
import SuperDashboard from '../containers/_super/dashboard/index'
import Request from '../containers/_super/requests/index'
import NotFound from '../containers/error/index'

export default {
  path: '/super',
  component: SuperLayout,
  routes: [
    {
      path: '/super/dashboard',
      exact: true,
      component: SuperDashboard
    },

    // request send competition
    {
      path: '/super/requests',
      status: 'waiting',
      exact: true,
      component: Request
    },
    {
      path: '/super/requests/waiting',
      status: 'waiting',
      exact: true,
      component: Request
    },
    {
      path: '/super/requests/approved',
      status: 'approved',
      exact: true,
      component: Request
    },
    {
      path: '/super/requests/rejected',
      status: 'rejected',
      exact: true,
      component: Request
    },

    // 404
    {
      path: '/super/*',
      fullscreen: true,
      exact: true,
      error_code: 404,
      error_msg: 'Halaman yang anda kunjungi tidak ditemukan',
      component: NotFound
    }
  ]
}
