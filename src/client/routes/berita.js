import NewsDetail from '../containers/4.2/NewsDetail'
import NewsList from '../containers/4.2/NewsList'

import Error from '../containers/4.2/Error'

export default {
    childRoutes: [
        {
            path: 'news',
            indexRoute: {
                component: NewsList
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
                    component: NewsList
                },
                {
                    path: ':encid(/:title)',
                    component: NewsDetail
                }
            ]
        },
        {
            path: 'berita',
            indexRoute: {
                component: NewsList
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
                    component: NewsList
                },
                {
                    path: 'baca/:encid(/:title)',
                    component: NewsDetail
                },
                {
                    path: ':encid(/:title)',
                    component: NewsDetail
                }
            ]
        }
    ]
}