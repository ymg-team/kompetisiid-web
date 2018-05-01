/**
 * بِسْمِ اللهِ الرَّحْمنِ الرَّحِيمِ
 * Created by yussan on 06/10/16.
 */

import React from 'react'

//  routes
import News from './berita'
import Categories from './categories'
import Browse from './browse'
import Competition from './competition'
import Account from './account'
import Add from './add'
import User from './user'
import Dashboard from './dashboard'
import Careers from './careers'

// containers
import Login from '../containers/4.2/Login'
import Home from '../containers/home/index'
import Error from '../containers/4.2/Error'

// layouts
import LayoutRoot from '../layouts/4.2/Root'
import LayoutHome from '../layouts/4.2/Home'
import LayoutError from '../layouts/4.2/Error'
import LayoutDashboard from '../layouts/4.2/Dashboard'

export default [
  {
    component: LayoutRoot,
    routes: [
      {
        component: LayoutHome,
        routes: [
          {
            path: '/',
            exact: true,
            component: Home
          },
          News,
          Browse,
          Competition,
          Add,
          Categories,
          User,
          {
            path: '/login',
            fullscreen: true,
            exact: true,
            component: Login
          },
          {
            fullscreen: true,
            path: '*',
            error_code: 404,
            error_msg: 'Halaman yang anda kunjungi tidak ditemukan',
            component: Error
          }
        ]
      }
    ]
  }
]

// const old_routes =  {
//     path: '/',
//     childRoutes: [
//         {
//             component: LayoutError,
//             childRoutes: [
//                 {
//                     path: 'dashboard',
//                     error_code: 404,
//                     error_msg: 'Halaman yang anda kunjungi tidak ditemukan',
//                     component: Error
//                 }
//             ]
//         },
//         {
//             component: LayoutError,
//             childRoutes: [
//                 {
//                     path: 'login',
//                     component: Login
//                 }
//             ]
//         },
//         {
//             component: LayoutDashboard,
//             childRoutes: [
//                 Dashboard
//             ]
//         },
//         {
//             component: LayoutHome,
//             indexRoute: {
//                 isRed: true,
//                 component: Home
//             },
//             childRoutes: [
//                 Berita,
//                 Categories,
//                 Jelajah,
//                 Kompetisi,
//                 Account,
//                 Pasang,
//                 Careers,
//                 Profile
//             ]
//         },
//     ]
// }
