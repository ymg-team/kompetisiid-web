import Index from '../containers/news/index'
import NewsList from '../containers/news/List'
import Error from '../containers/error/index'

import EmptyLayout from '../layouts/4.2/Empty'

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
