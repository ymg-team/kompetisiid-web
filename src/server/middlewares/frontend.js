import { requestAPIV2 } from "../helpers/apiCaller"
import Host from "../../config/host"
import { stripTags, truncate } from "string-manager"

/**
 * @description middleware to request competition detail on server
 */
export const generateMetaCompetition = (req, res, next) => {
  return requestAPIV2("get", `/v2/competition/${req.params.id}`, {
    API_HOST: Host[process.env.NODE_ENV].api_v42
  }).then(response => {
    const competition = JSON.parse(response.body)
    const url = `https://kompetisi.id${req.originalUrl}`
    if (competition.status === 200) {
      let title = competition.data.title
      const urlArr = req.originalUrl.split("/")

      switch (urlArr[3]) {
        case "regulations":
          title = `Peraturan ${title}`
          break
        case "prizes":
          title = `Hadiah ${title}`
          break
        case "annoucements":
          title = `Pengumuman ${title}`
          break
        case "discussions":
          title = `Diskusi ${title}`
          break
        case "contacts":
          title = `Kontak ${title}`
          break
        case "share":
          title = `Share ${title}`
          break
      }

      req.meta = {
        title,
        desc: competition.data.sort,
        image: competition.data.poster.original,
        url,
        type: "event",
        keywords: competition.data.tag,
        jsonld: `
        {
          "@context": "http://schema.org",
          "@type": "Event",
          "name": "${competition.data.title.replace(/\"/g, "")}",
          "description": "${competition.data.sort.replace(/\"/g, "")}",
          "startDate": "${new Date(
            competition.data.created_at * 1000
          ).toISOString()}",
          "endDate": "${new Date(
            competition.data.deadline_at * 1000
          ).toISOString()}",
          "url": "${url}",
          "sameAs": "${competition.data.link_source}",
          "image": {
              "@type": "ImageObject",
              "url": "${competition.data.poster.original}",
              "height": "500",
              "width": "500"
          },
          "organizer": {
            "@type": "Organization",
            "name": "${competition.data.organizer}",
            "logo": {
                "@type": "ImageObject",
                "url": "https://res.cloudinary.com/dhjkktmal/image/upload/v1528851826/kompetisi-id/email_assets/icon-512x512.png",
                "height": "500",
                "width": "500"
            }
          },
          "location": {
            "@type": "Place",
            "name": "Indonesia",
            "address": "Indonesia"
          },
          "offers": "Menangkan ${competition.data.prize.description}",
          "performers": "Warga Negara Indonesia"
          }
        `
      }
    } else {
      req.meta = {
        title: competition.message,
        desc: competition.message,
        url,
        type: "event"
      }
    }

    return next()
  })
}

export const generateMetaNews = (req, res, next) => {
  return requestAPIV2("get", `/v2/news/${req.params.id}`, {
    API_HOST: Host[process.env.NODE_ENV].api_v42
  }).then(response => {
    const news = JSON.parse(response.body)
    const url = `https://kompetisi.id${req.originalUrl}`

    if (news.status == 200) {
      let desc = stripTags(news.data.content)
      desc = truncate(desc, 500, "...")

      req.meta = {
        title: news.data.title,
        desc,
        image: news.data.image.original,
        url,
        type: "news",
        keywords: news.data.tag,
        jsonld: `
          {
            "@context": "https://schema.org",
            "@type": "Article",
            "publisher": {
                "@type": "Organization",
                "name": "Id+More",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://res.cloudinary.com/dhjkktmal/image/upload/v1528851826/kompetisi-id/email_assets/icon-512x512.png",
                    "height": "500",
                    "width": "500"
                }
            },
            "author": {
                "@type": "Person",
                "name": "${news.data.author.username}",
                "image": "https://kompetisi.id/assets/4.2/img/default-avatar.jpg",
                "url": "https://kompetisi.id/user/${news.data.author.username}",
                "sameAs": [
                    ""
                ],
                "description": "${news.data.author.moto}"
            },
            "headline": "${news.data.title}",
            "url": "${url}",
            "datePublished": "${new Date(news.data.created_at * 1000).toISOString()}",
            "dateModified": "${new Date(news.data.updated_at * 1000).toISOString()}",
            "image": {
                "@type": "ImageObject",
                "url": "${news.data.image.original}",
                "height": "500",
                "width": "500"
            },
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "${url}"
            },
            "keywords": "${news.data.tag}",
            "description": "${news.data.content}"
        }
        `
      }
    } else {
      req.meta = {
        title: news.message,
        desc: news.message,
        url,
        type: "news"
      }
    }

    return next()
  })
}
