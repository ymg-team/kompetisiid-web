import Competition from "../containers/competition/index"
import CompetitionLayout from "../containers/competition/Layout"

export default {
  path: "/c/:encid",
  component: CompetitionLayout,
  routes: [
    {
      path: "/c/:encid",
      exact: true,
      active_tab: 1,
      component: Competition
    }
  ]
}
