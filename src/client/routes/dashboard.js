import CompetitionList from '../containers/4.2/Dashboard/CompetitionList'


export default {
    childRoutes: [
        {
            path: 'dashboard',
            childRoutes: [
                {
                    path: 'competition/live',
                    tab_active: 1,
                    component: CompetitionList
                },
                {
                    path: 'competition/end',
                    tab_active: 2,
                    component: CompetitionList
                },
                {
                    path: 'competition/moderation',
                    tab_active: 3,
                    component: CompetitionList
                },
                {
                    path: 'competition/reject',
                    tab_active: 4,
                    component: CompetitionList
                }
            ]
        }
    ]
}