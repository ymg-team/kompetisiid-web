/**
 * بِسْمِ اللهِ الرَّحْمنِ الرَّحِيمِ
 * Created by yussan on 06/10/16.
 */

import React from 'react'
import { Redirect } from 'react-router-dom'

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
import Super from './super/index'

// containers
import Login from '../containers/auth/Login'
import Home from '../containers/home/index'
import Error from '../containers/error/index'
import RedirectContainer from '../containers/Redirect'

// layouts
import LayoutRoot from '../layouts/4.2/Root'
import LayoutHome from '../layouts/4.2/Home'
import LayoutHomeV5 from '../layouts/HomeLayoutV5'
import LayoutError from '../layouts/4.2/Error'

export default [
  {
    component: LayoutRoot,
    routes: [
      {
        component: LayoutHomeV5,
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
          Careers,
          {
            path: '/login',
            fullscreen: true,
            exact: true,
            component: Login
          },
          {
            path: '/super',
            fullscreen: true,
            exact: true,
            component: Login
          },
          Super,
          // redirect
          {
            path: '/berita/baca/:encid/:title',
            fullscreen: true,
            exact: true,
            component: props => {
              if (typeof window != 'undefined')
                return (
                  <Redirect
                    to={`/news/${props.match.params.encid}/${
                      props.match.params.title
                    }`}
                  />
                )
              return null
            }
          },
          {
            path: '/exit',
            fullscreen: true,
            exact: true,
            component: RedirectContainer
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
//                 careers,
//                 Profile
//             ]
//         },
//     ]
// }
