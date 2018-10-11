import Add from '../containers/sendCompetition/form'
import SendCompetition from '../containers/sendCompetition/index'

import EmptyLayout from '../layouts/4.2/Empty'

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
