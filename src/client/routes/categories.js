import Categories from '../containers/4.2/Categories'

import EmptyLayout from '../layouts/4.2/Empty'

function handleEnter()
{
    if(typeof window != 'undefined') window.scrollTo(0,0)
}

export default {
    path: '/categories',
    component: EmptyLayout,
    routes: [
        {
            path: '/categories',
            exact: true,
            onEnter: () => handleEnter(),
            component: Categories
        }
    ]
}
