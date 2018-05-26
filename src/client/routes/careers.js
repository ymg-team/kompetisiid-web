import Index from '../containers/careers/index'

function handleOther()
{
    if(typeof window != 'undefined') window.scrollTo(0,0)
}

export default {
    childRoutes: [
        {
            path: 'careers',
            onEnter: () => handleOther(),
            component: Index,
        }
    ]
}
