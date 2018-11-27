import Loadable from "react-loadable"

// components
import Loading from "../components/preloaders/FullPage"
import DashboardLayout from '../layouts/DashboardLayoutV5'
import EmptyLayout from '../layouts/4.2/Empty' 

const DashboardIndex = Loadable({
  loader: () => import("../containers/_dashboard/dashboard/index"),
  loading: Loading
})

export default {
  path: "/dashboard",
  component: DashboardLayout,
  routes: [
    {
      path: "/dashboard",
      exact: true,
      component: DashboardIndex
    }
  ]
}
