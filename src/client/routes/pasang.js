import Add from '../containers/4.2/AddCompetition'
import SendCompetition from '../containers/4.2/SendCompetition'

export default {
    childRoutes: [
        {
            path: 'add',
            indexRoute: {
                component: Add
            },
            childRoutes: [
                {
                    path: 'send',
                    component: SendCompetition
                }
            ]
        },
        {
            path: 'pasang',
            indexRoute: {
                component: Add
            }           
        }
    ]
}