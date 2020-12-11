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
      to: "/super/dashboard"
    },
    {
      title: "Kompetisi",
      child: [
        {
          title: "Tambah Kompetisi",
          to: "/super/competition/create",
          icon: "fas fa-plus"
        },
        {
          title: "Menunggu",
          hide: !stats.competition.waiting,
          to: "/super/competition/waiting",
          label: {
            color: "red",
            text: stats.competition.waiting
          }
        },
        {
          title: "Berlansung",
          to: "/super/competition/live",
          label: {
            color: "blue",
            text: stats.competition.live
          }
        },
        {
          title: "Dipublikasi",
          to: "/super/competition/posted",
          label: {
            color: "blue",
            text: stats.competition.posted
          }
        }
      ]
    },
    {
      title: "Request",
      child: [
        {
          title: "Request Menunggu",
          to: "/super/requests/waiting",
          hide: !stats.request.waiting,
          label: {
            color: "blue",
            text: stats.request.waiting
          }
        },
        {
          title: "Request Diterima",
          to: "/super/requests/posted",
          label: {
            color: "blue",
            text: stats.request.accept
          }
        },
        {
          title: "Request Ditolak",
          to: "/super/requests/reject",
          label: {
            color: "blue",
            text: stats.request.reject
          }
        }
      ]
    },
    {
      title: "Kabar",
      child: [
        {
          title: "Tambah Kabar",
          icon: "fas fa-plus",
          to: "/super/news/create"
        },
        {
          title: "Diposting",
          to: "/super/news/posted",
          label: {
            color: "blue",
            text: stats.news.posted
          }
        },
        {
          title: "Draft",
          to: "/super/news/draft",
          label: {
            color: "blue",
            text: stats.news.draft
          }
        }
      ]
    },
    {
      title: "Users",
      child: [
        {
          title: "Telah Konfirmasi",
          to: "/super/users/confirmed",
          label: {
            text: stats.members.verified
          }
        },
        {
          title: "Belum Konfirmas",
          to: "/super/users/unconfirmed",
          label: {
            text: stats.members.unverified
          }
        },
        {
          title: "Banned",
          to: "/super/users/banned",
          label: {
            color: "red",
            text: stats.members.banned
          }
        }
      ]
    },
    {
      title: "Akun",
      child: [
        {
          title: "Logout",
          to: "#",
          onClick: () => props.handleLogout()
        }
      ]
    }
  ]

  return <Sidebar menus={Menus} />
}
