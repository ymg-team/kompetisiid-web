import Competition from "../pages/competition/index"
import CompetitionLayout from "../pages/competition/Layout"

export default {
  path: "/competition/:encid",
  component: CompetitionLayout,
  routes: [
    {
      path: "/competition/:encid",
      exact: true,
      active_tab: 2,
      component: Competition
    },
    {
      path: "/competition/:encid/regulations/:title",
      exact: true,
      active_tab: 2,
      component: Competition
    },
    {
      path: "/competition/:encid/prizes/:title",
      exact: true,
      active_tab: 1,
      component: Competition
    },
    {
      path: "/competition/:encid/annoucements/:title",
      exact: true,
      active_tab: 3,
      component: Competition
    },
    {
      path: "/competition/:encid/discussions/:title",
      exact: true,
      active_tab: 4,
      component: Competition
    },
    {
      path: "/competition/:encid/contacts/:title",
      exact: true,
      active_tab: 5,
      component: Competition
    },
    {
      path: "/competition/:encid/share/:title",
      exact: true,
      active_tab: 6,
      component: Competition
    },
    {
      path: "/competition/:encid/*",
      exact: true,
      not_found: true
    }
  ]
}
