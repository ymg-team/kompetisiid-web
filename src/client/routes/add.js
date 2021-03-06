import Add from '../pages/sendCompetition/form'
import SendCompetition from '../pages/sendCompetition/index'

import EmptyLayout from '../layouts/EmptyLayout'

export default {
  path: '/add',
  component: EmptyLayout,
  routes: [
    {
      path: '/add',
      exact: true,
      component: Add
    },
    {
      path: '/add/send',
      exact: true,
      component: SendCompetition
    }
  ]
}

// const old = {
//     childRoutes: [
//         {
//             path: 'add',
//             indexRoute: {
//                 component: Add
//             },
//             childRoutes: [
//                 {
//                     path: 'send',
//                     component: SendCompetition
//                 }
//             ]
//         },
//         {
//             path: 'pasang',
//             indexRoute: {
//                 component: Add
//             }           
//         }
//     ]
// }
