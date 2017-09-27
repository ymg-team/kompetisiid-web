import Browse from '../containers/4.2/BrowseCompetition'
import Error from '../containers/4.2/Error'

export default {
    childRoutes: [
        {
            path: 'jelajah',
            indexRoute: {
                component: Browse,
            },
            childRoutes: [
                {
                    path: 'tag',
                    error_code: 404,
                    error_msg: 'Halaman yang anda kunjungi tidak ditemukan',
                    component: Error
                },
                {
                    path: 'tag/:tag',
                    component: Browse,
                },
                {
                    
                    path: ':mainkat(/:subkat)',
                    component: Browse,
                }
            ]
        },
        {
            path: 'browse',
            indexRoute: {
                component: Browse,
            },
            childRoutes: [
                {
                    path: 'tag',
                    error_code: 404,
                    error_msg: 'Halaman yang anda kunjungi tidak ditemukan',
                    component: Error
                },
                {
                    path: 'tag/:tag',
                    component: Browse,
                },
                {
                    
                    path: ':mainkat(/:subkat)',
                    component: Browse,
                }
            ]
        }
    ]
}