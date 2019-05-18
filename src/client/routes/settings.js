import Loadable from "react-loadable"

// components
import Loading from "../components/preloaders/FullPage"
import DashboardLayout from "../layouts/DashboardLayoutV5"

const NotFound = Loadable({
  loader: () => import("../containers/error/index"),
  loading: Loading
})

const SettingProfile = Loadable({
  loader: () => import("../containers/_settings/SettingProfile"),
  loading: Loading
})

const SettingAccount = Loadable({
  loader: () => import("../containers/_settings/SettingAccount"),
  loading: Loading
})


const SettingConnect = Loadable({
  loader: () => import("../containers/_settings/SettingConnectSocialMedia"),
  loading: Loading
})

export default {
  path: "/settings",
  component: DashboardLayout,
  routes: [
    {
      path: "/settings/profile",
      exact: true,
      component: SettingProfile
    },
    {
      path: "/settings/account",
      exact: true,
      component: SettingAccount
    },
    {
      path: "/settings/connect-social-media",
      exact: true,
      component: SettingConnect
    },
    {
      path: "/settings/*",
      exact: true,
      error_code: 404,
      error_msg: "Halaman tidak ditemukan",
      component: NotFound
    }
  ]
}
