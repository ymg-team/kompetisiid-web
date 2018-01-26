import Careers from '../containers/4.2/Careers'

function handleOther()
{
    if(typeof window != 'undefined') window.scrollTo(0,0)
}

export default {
    childRoutes: [
        {
            path: 'careers',
            onEnter: () => handleOther(),
            component: Careers,
        }
    ]
}