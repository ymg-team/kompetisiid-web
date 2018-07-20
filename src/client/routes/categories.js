// containers
import Categories from '../containers/categories/index'

// layout
import EmptyLayout from '../layouts/4.2/Empty'

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
      component: Categories
    }
  ]
}
