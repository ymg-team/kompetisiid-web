import Index from '../pages/news/index'
import NewsList from '../pages/news/List'
import Error from '../pages/error/index'

import EmptyLayout from '../layouts/EmptyLayout'

export default {
  path: '/news',
  component: EmptyLayout,
  routes: [
    {
      path: '/news',
      exact: true,
      component: NewsList
    },
    {
      path: '/news/tag',
      exact: true, 
      component: Error
    },
    {
      path: '/news/tag/:tag',
      exact: true, 
      component: NewsList
    },
    {
      path: '/news/:encid/:title',
      exact: true,
      component: Index
    }
  ]
}
