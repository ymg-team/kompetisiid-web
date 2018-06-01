// containers
import Index from '../containers/careers/index'

// layout
import EmptyLayout from '../layouts/4.2/Empty'

export default {
    path: '/careers',
    component: EmptyLayout,
    routes: [
        {
            path: '/careers',
            exact: true,
            component: Index,
        }
    ]
}
