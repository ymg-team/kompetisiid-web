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
const CompetitionFormLayout = Loadable({
  loader: () => import("../../containers/_super/competitions/CompetitionFormLayout"),
  loading: Loading
})
const CompetitionForm = Loadable({
  loader: () => import("../../containers/_super/competitions/CompetitionForm"),
  loading: Loading
})
const CompetitionAnnouncementForm = Loadable({
  loader: () => import("../../containers/_super/competitions/CompetitionAnnouncement"),
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
      component: CompetitionForm
    },
    {
      path: "/dashboard/competition/update/:id",
      component: CompetitionFormLayout,
      routes: [
        {
          path: "/dashboard/competition/update/:id",
          exact: true,
          component: CompetitionForm
        },
        {
          path: "/dashboard/competition/update/:id/announcements",
          exact: true,
          component: CompetitionAnnouncementForm
        },
      ]
    },
    // waiting competition page
    {
      path: "/dashboard/competition/waiting",
      extact: true,
      tab_active: 1,
      status: "waiting",
      component: DashboardCompetitions
    },
    {
      path: "/dashboard/competition/live",
      extact: true,
      tab_active: 2,
      status: "active",
      component: DashboardCompetitions
    },
    // posted competition page
    {
      path: "/dashboard/competition/posted",
      extact: true,
      tab_active: 3,
      status: "posted",
      component: DashboardCompetitions
    },
    // rejected competition page
    {
      path: "/dashboard/competition/rejected",
      extact: true,
      tab_active: 4,
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
