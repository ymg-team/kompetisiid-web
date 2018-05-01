// containers
import Categories from '../containers/4.2/Categories'

// layout
import EmptyLayout from '../layouts/4.2/Empty'

// modules
import Auth from '../helpers/routerAuthorization'

function handleEnter() {
  if (typeof window != 'undefined') window.scrollTo(0, 0)
}

export default {
  path: '/categories',
  component: EmptyLayout,
  routes: [
    {
      path: '/categories',
      exact: true,
      component: Auth(Categories)
    }
  ]
}
