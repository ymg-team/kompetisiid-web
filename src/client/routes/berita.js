import Index from '../containers/news/index'
import NewsList from '../containers/4.2/NewsList'
import Error from '../containers/4.2/Error'

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
