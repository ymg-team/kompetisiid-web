import Competition from '../containers/competition/index'
import CompetitionLayout from "../containers/competition/Layout"

export default {
  path: '/competition/:encid',
  component: CompetitionLayout,
  routes: [
    {
      path: '/competition/:encid',
      exact: true,
      active_tab: 1,
      component: Competition
    },
    {
      path: '/competition/:encid/regulations/:title',
      exact: true,
      active_tab: 1,
      component: Competition
    },
    {
      path: '/competition/:encid/prizes/:title',
      exact: true,
      active_tab: 2,
      component: Competition
    },
    {
      path: '/competition/:encid/annoucements/:title',
      exact: true,
      active_tab: 3,
      component: Competition
    },
    {
      path: '/competition/:encid/discussions/:title',
      exact: true,
      active_tab: 4,
      component: Competition
    },
    {
      path: '/competition/:encid/contacts/:title',
      exact: true,
      active_tab: 5,
      component: Competition
    },
    {
      path: '/competition/:encid/share/:title',
      exact: true,
      active_tab: 6,
      component: Competition
    },
    {
      path:'/competition/:encid/*',
      exact: true,
      not_found: true
    }
  ]
}

// const old_routes = {
//     childRoutes: [
//         {
//             path: 'kompetisi',
//             childRoutes: [
//                 {
//                     path: 'peraturan/:encid(/:title)',
//                     name: 'competition_regulation',
//                     active_tab: 1,
//                     component: Competition
//                 },
//                 {
//                     path: 'detail/:encid(/:title)',
//                     name: 'competition_regulation',
//                     active_tab: 1,
//                     component: Competition
//                 },
//                 {
//                     path: 'hadiah/:encid(/:title)',
//                     active_tab: 2,
//                     component: Competition
//                 },
//                 {
//                     path: 'diskusi/:encid(/:title)',
//                     active_tab: 3,
//                     component: Competition
//                 },
//                 {
//                     path: 'pengumuman/:encid(/:title)',
//                     active_tab: 4,
//                     component: Competition
//                 },
//                 {
//                     path: 'kontak/:encid(/:title)',
//                     active_tab: 5,
//                     component: Competition
//                 },
//                 {
//                     path: 'share/:encid(/:title)',
//                     active_tab: 6,
//                     component: Competition
//                 },
//                 {
//                     path: 'sumber/:encid(/:title)',
//                     iframe_type: 'sumber',
//                     component: CompetitionIframe
//                 },
//                 {
//                     path: 'ikuti/:encid(/:title)',
//                     iframe_type: 'ikuti',
//                     component: CompetitionIframe
//                 }
//             ]
//         },
//         {
//             path: 'competition',
//             childRoutes: [
//                 {
//                     path: ':encid/regulations(/:title)',
//                     name: 'competition_regulation',
//                     active_tab: 1,
//                     component: Competition
//                 },
//                 {
//                     path: ':encid/detail(/:title)',
//                     name: 'competition_regulation',
//                     active_tab: 1,
//                     component: Competition
//                 },
//                 {
//                     path: ':encid/prizes(/:title)',
//                     active_tab: 2,
//                     component: Competition
//                 },
//                 {
//                     path: ':encid/annoucements(/:title)',
//                     active_tab: 3,
//                     component: Competition
//                 },
//                 {
//                     path: ':encid/discussions(/:title)',
//                     active_tab: 4,
//                     component: Competition
//                 },
//                 {
//                     path: ':encid/contacts(/:title)',
//                     active_tab: 5,
//                     component: Competition
//                 },
//                 {
//                     path: ':encid/share(/:title)',
//                     active_tab: 6,
//                     component: Competition
//                 },
//                 {
//                     path: ':encid/source(/:title)',
//                     iframe_type: 'sumber',
//                     component: CompetitionIframe
//                 },
//                 {
//                     path: ':encid/join(/:title)',
//                     iframe_type: 'ikuti',
//                     component: CompetitionIframe
//                 },
//                 {
//                     path: ':encid',
//                     active_tab: 1,
//                     component: Competition
//                 }
//             ]
//         }
//     ]
// }
