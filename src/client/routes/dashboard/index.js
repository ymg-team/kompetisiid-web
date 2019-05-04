import Loadable from "react-loadable"

// components
import Loading from "../../components/preloaders/FullPage"
import DashboardLayout from "../../layouts/DashboardLayoutV5"

const NotFound = Loadable({
  loader: () => import("../../containers/error/index"),
  loading: Loading
})

const DashboardIndex = Loadable({
  loader: () => import("../../containers/_dashboard/index"),
  loading: Loading
})

const DashboardCompetitions = Loadable({
  loader: () => import("../../containers/_super/competitions/CompetitionList"),
  loading: Loading
})

const FormCompetition = Loadable({
  loader: () => import("../../containers/_super/competitions/CompetitionForm"),
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
    },

    // competitions
    {
      path: "/dashboard/competition/create",
      extact: true,
      component: FormCompetition,
    },
    {
      path: "/dashboard/update/:id",
      extact: true,
      component: FormCompetition,
    },
    // waiting competition page
    {
      path: "/dashboard/competition/waiting",
      extact: true,
      tab_active: 1,
      status: "waiting",
      component: DashboardCompetitions
    },
    // posted competition page
    {
      path: "/dashboard/competition/posted",
      extact: true,
      tab_active: 2,
      status: "posted",
      component: DashboardCompetitions
    },
    // rejected competition page
    {
      path: "/dashboard/competition/rejected",
      extact: true,
      tab_active: 3,
      status: "reject",
      component: DashboardCompetitions
    },
    // end of competitions

    {
      path: "/dashboard/*",
      fullscreen: true,
      exact: true,
      error_code: 404,
      error_msg: "Halaman yang anda kunjungi tidak ditemukan",
      component: NotFound
    }
  ]
}
