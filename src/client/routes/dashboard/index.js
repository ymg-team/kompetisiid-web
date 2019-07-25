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
const DashboardOtherCompetitions = Loadable({
  loader: () =>
    import("../../containers/_super/competitions/OtherCompetitionList"),
  loading: Loading
})
const CompetitionFormLayout = Loadable({
  loader: () =>
    import("../../containers/_super/competitions/CompetitionFormLayout"),
  loading: Loading
})
const CompetitionForm = Loadable({
  loader: () => import("../../containers/_super/competitions/CompetitionForm"),
  loading: Loading
})
const CompetitionAnnouncementForm = Loadable({
  loader: () =>
    import("../../containers/_super/competitions/CompetitionAnnouncement"),
  loading: Loading
})

export default {
  path: "/_dashboard",
  component: DashboardLayout,
  routes: [
    {
      path: "/_dashboard",
      exact: true,
      type: "_dashboard",
      component: DashboardIndex
    },

    // competitions
    {
      path: "/_dashboard/competition/create",
      extact: true,
      type: "_dashboard",
      component: CompetitionForm
    },
    {
      path: "/_dashboard/competition/update/:id",
      component: CompetitionFormLayout,
      routes: [
        {
          path: "/_dashboard/competition/update/:id",
          exact: true,
          type: "_dashboard",
          component: CompetitionForm
        },
        {
          path: "/_dashboard/competition/update/:id/announcements",
          exact: true,
          type: "_dashboard",
          component: CompetitionAnnouncementForm
        }
      ]
    },
    // waiting competition page
    {
      path: "/_dashboard/competition/waiting",
      extact: true,
      type: "_dashboard",
      tab_active: 1,
      status: "waiting",
      component: DashboardCompetitions
    },
    {
      path: "/_dashboard/competition/live",
      extact: true,
      type: "_dashboard",
      tab_active: 2,
      status: "active",
      component: DashboardCompetitions
    },
    // posted competition page
    {
      path: "/_dashboard/competition/posted",
      extact: true,
      type: "_dashboard",
      tab_active: 3,
      status: "posted",
      component: DashboardCompetitions
    },
    // rejected competition page
    {
      path: "/_dashboard/competition/rejected",
      extact: true,
      type: "_dashboard",
      tab_active: 4,
      status: "reject",
      component: DashboardCompetitions
    },
    // end of competitions
    {
      path: "/_dashboard/competition/liked",
      extact: true,
      type: "_dashboard",
      type: "_dashboard",
      type: "liked",
      component: DashboardOtherCompetitions
    },
    {
      path: "/_dashboard/*",
      fullscreen: true,
      type: "_dashboard",
      exact: true,
      error_code: 404,
      error_msg: "Halaman yang anda kunjungi tidak ditemukan",
      component: NotFound
    }
  ]
}
