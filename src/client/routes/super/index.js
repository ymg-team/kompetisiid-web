import Loadable from "react-loadable"

// layouts
import SuperLayout from "../../layouts/SuperLayoutV5"

// components
import Loading from "../../components/preloaders/GlobalLoader"
import ContentLoading from "../../components/preloaders/FullContentLoader"

// pages
const SuperDashboard = Loadable({
  loader: () => import("../../pages/_super/index"),
  loading: ContentLoading
})
const NotFound = Loadable({
  loader: () => import("../../pages/error/index"),
  loading: Loading
})
// request pages
const Request = Loadable({
  loader: () => import("../../pages/_super/requests/index"),
  loading: Loading
})
// competition pages
const CompetitionList = Loadable({
  loader: () => import("../../pages/_super/competitions/CompetitionList"),
  loading: Loading
})
const CompetitionFormLayout = Loadable({
  loader: () =>
    import("../../pages/_super/competitions/CompetitionFormLayout"),
  loading: Loading
})
const CompetitionForm = Loadable({
  loader: () => import("../../pages/_super/competitions/CompetitionForm"),
  loading: Loading
})
const CompetitionAnnouncementForm = Loadable({
  loader: () =>
    import("../../pages/_super/competitions/CompetitionAnnouncement"),
  loading: Loading
})
const NewsList = Loadable({
  loader: () => import("../../pages/_super/news/NewsList"),
  loading: Loading
})
const NewsForm = Loadable({
  loader: () => import("../../pages/_super/news/NewsForm"),
  loading: Loading
})
const UserList = Loadable({
  loader: () => import("../../pages/_super/users/index"),
  loading: Loading
})

export default {
  path: "/super",
  component: SuperLayout,
  routes: [
    {
      path: "/super/dashboard",
      exact: true,
      type: "super",
      component: SuperDashboard
    },

    // data competition
    {
      path: "/super/competition",
      exact: true,
      tab_active: 2,
      status: "active",
      type: "super",
      component: CompetitionList
    },
    {
      path: "/super/competition/waiting",
      exact: true,
      tab_active: 1,
      // status to request api
      status: "waiting",
      type: "super",
      component: CompetitionList
    },
    {
      path: "/super/competition/live",
      exact: true,
      tab_active: 2,
      // status to request api
      status: "active",
      type: "super",
      component: CompetitionList
    },
    {
      path: "/super/competition/posted",
      exact: true,
      tab_active: 3,
      // status to request api
      status: "all",
      type: "super",
      component: CompetitionList
    },

    // form competition
    {
      path: "/super/competition/create",
      exact: true,
      type: "super",
      component: CompetitionForm
    },
    {
      path: "/super/competition/update/:id",
      component: CompetitionFormLayout,
      routes: [
        {
          path: "/super/competition/update/:id",
          exact: true,
          type: "super",
          component: CompetitionForm
        },
        {
          path: "/super/competition/update/:id/announcements",
          exact: true,
          type: "super",
          component: CompetitionAnnouncementForm
        }
      ]
    },

    // request send competition
    {
      path: "/super/requests",
      status: "waiting",
      exact: true,
      type: "super",
      component: Request
    },
    {
      path: "/super/requests/waiting",
      status: "waiting",
      exact: true,
      type: "super",
      component: Request
    },
    {
      path: "/super/requests/posted",
      status: "posted",
      exact: true,
      type: "super",
      component: Request
    },
    {
      path: "/super/requests/reject",
      status: "reject",
      exact: true,
      type: "super",
      component: Request
    },

    // news routes
    {
      path: "/super/news",
      exact: true,
      component: NewsList
    },
    {
      path: "/super/news/create",
      exact: true,
      component: NewsForm
    },
    {
      path: "/super/news/posted",
      tab_active: 1,
      exact: true,
      type: "super",
      component: NewsList
    },
    {
      path: "/super/news/draft",
      tab_active: 2,
      exact: true,
      component: NewsList
    },
    {
      path: "/super/news/:id",
      exact: true,
      component: NewsForm
    },

    // user routes
    {
      path: "/super/users/:type",
      exact: true,
      component: UserList
    },

    // 404
    {
      path: "/super/*",
      fullscreen: true,
      exact: true,
      type: "super",
      error_code: 404,
      error_msg: "Halaman yang anda kunjungi tidak ditemukan",
      component: NotFound
    }
  ]
}
