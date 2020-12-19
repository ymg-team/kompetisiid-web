import React from "react"

// components
import Sidebar from "../Sidebar"

export default props => {
  const stats =
    props.stats && props.stats.status === 200
      ? props.stats
      : { request: {}, competition: {}, news: {}, members: {} }

  const Menus = [
    {
      title: "Dashboard",
      to: "/dashboard"
    },
    {
      title: "Kompetisi Saya",
      child: [
        {
          title: "Kirim Kompetisi",
          icon: "fas fa-plus",
          to: "/dashboard/competition/create"
        },
        {
          title: "Kompetisi Menunggu",
          to: "/dashboard/competition/waiting",
          hide: !stats.competition.waiting,
          label: {
            color: "red",
            text: stats.competition.waiting
          }
        },
        {
          title: "Kompetisi Berlangsung",
          to: "/dashboard/competition/live",
          label: {
            color: "blue",
            text: stats.competition.live
          }
        },
        {
          title: "Kompetisi Terpublish",
          to: "/dashboard/competition/posted",
          label: {
            color: "blue",
            text: stats.competition.posted
          }
        },
        {
          title: "Kompetisi Ditolak",
          to: "/dashboard/competition/rejected",
          label: {
            color: "blue",
            text: stats.competition.rejected
          }
        }
      ]
    },
    {
      title: "Kompetisi Lainnya",
      child: [
        {
          title: "Kompetisi di Subscribe",
          to: "/dashboard/competition/subscribed"
        },
        {
          title: "Kompetisi di Disukai",
          to: "/dashboard/competition/liked"
        }
      ]
    },
    {
      title: "Pengaturan",
      child: [
        {
          title: "Pengaturan Profil",
          to: "/settings/profile"
        },
        {
          title: "Pengaturan Akun",
          to: "/settings/account"
        },
        {
          title: "Logout",
          to: "#",
          onClick: () => {
            props.handleLogout()
          }
        }
      ]
    }
  ]

  return <Sidebar menus={Menus} />
}
