import Loadable from 'react-loadable'

// layouts
import EmptyLayout from '../layouts/4.2/Empty'
import SuperLayout from '../layouts/SuperLayoutV5'

// components
import Loading from '../components/preloaders/GlobalLoader'
import ContentLoading from '../components/preloaders/FullContentLoader'
import EmptyLoading from '../components/preloaders/EmptyLoader'

// containers
const SuperDashboard = Loadable({
  loader: () => import('../containers/_super/dashboard/index'),
  loading: ContentLoading
})
const Request = Loadable({
  loader: () => import('../containers/_super/requests/index'),
  loading: Loading
})
const NotFound = Loadable({
  loader: () => import('../containers/error/index'),
  loading: Loading
})

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
      path: '/super/requests/posted',
      status: 'posted',
      exact: true,
      component: Request
    },
    {
      path: '/super/requests/reject',
      status: 'reject',
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
