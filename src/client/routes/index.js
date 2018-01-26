/**
 * Created by yussan on 06/10/16.
 *  الرَّحْمَنِالرَّحِيم اللَّهِ بِسْمِ
 */

import Berita from './berita'
import Categories from './categories'
import Jelajah from './jelajah'
import Kompetisi from './kompetisi'
import Account from './account'
import Pasang from './pasang'
import Profile from './profile'
import Dashboard from './dashboard'
import Careers from './careers'
import Login from '../containers/4.2/Login'


import Home from '../containers/4.2/Home'
import Error from '../containers/4.2/Error'

import LayoutHome from '../layouts/4.2/Home'
import LayoutError from '../layouts/4.2/Error'
import LayoutDashboard from '../layouts/4.2/Dashboard'

export default {
    path: '/',
    childRoutes: [
        {
            component: LayoutError,
            childRoutes: [
                {
                    path: 'dashboard',
                    error_code: 404,
                    error_msg: 'Halaman yang anda kunjungi tidak ditemukan',
                    component: Error
                }
            ]
        },
        {
            component: LayoutError,
            childRoutes: [
                {
                    path: 'login',
                    component: Login
                }
            ]
        },
        {
            component: LayoutDashboard,
            childRoutes: [
                Dashboard
            ]  
        },
        {
            component: LayoutHome,
            indexRoute: {
                isRed: true,
                component: Home
            },
            childRoutes: [
                Berita,
                Categories,
                Jelajah,
                Kompetisi,
                Account,
                Pasang,
                Careers,
                Profile
            ]
        },
        {
            path: '*',
            component: LayoutError,
            indexRoute: {
                error_code: 404,
                error_msg: 'Halaman yang anda kunjungi tidak ditemukan',
                component: Error
            }
        }           
    ]
}