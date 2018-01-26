import UserProfile from '../containers/4.2/UserProfile'

export default {
    path: ':username',
    indexRoute: {
        component: UserProfile,
    },
    // childRoutes: [
    //     {
    //         path: 'kompetisi/dipasang',
    //         component: Jelajah
    //     }       
    // ]
}