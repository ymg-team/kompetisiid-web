import Categories from '../containers/4.2/Categories'

function handleEnter()
{
    if(typeof window != 'undefined') window.scrollTo(0,0)
}

export default {
    path: 'categories',
    indexRoute: {
        onEnter: () => handleEnter(),
        component: Categories
    }
}