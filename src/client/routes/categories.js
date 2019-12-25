// pages
import Categories from '../pages/categories/index'

// layout
import EmptyLayout from '../layouts/EmptyLayout'

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
