import { requestAPIV2 } from "../helpers/apiCaller"
import Host from "../../config/host"
import { requestApi } from "../../store/helpers/ApiCaller"
import {stripTags, truncate} from "string-manager"

/**
 * @description middleware to request competition detail on server
 */
export const generateMetaCompetition = (req, res, next) => {
  return requestAPIV2("get", `/v2/competition/${req.params.id}`, {
    API_HOST: Host[process.env.NODE_ENV].api_v42
  }).then(response => {
    const competition = JSON.parse(response.body)
    const url = `https://kompetisi.id/competition${req.originalUrl}`
    if(competition.status === 200) {
      let title = competition.data.title
      const urlArr = req.originalUrl.split('/')

      switch(urlArr[3]) {
        case 'regulations':
          title = `Peraturan ${title}`
          break 
        case 'prizes':
          title = `Hadiah ${title}`
          break
        case 'annoucements':
          title = `Pengumuman ${title}`
          break
        case 'discussions':
          title = `Diskusi ${title}`
          break
        case 'contacts':
          title = `Kontak ${title}`
          break
        case 'share':
          title = `Share ${title}`
          break
      }

      req.meta = {
        title,
        desc: competition.data.sort,
        image: competition.data.poster.original,
        url,
        type: "event"
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
    const url = `https://kompetisi.id/competition${req.originalUrl}`

    if(news.status == 200) {
      let desc = stripTags(news.data.content)
      desc = truncate(desc, 500, '...')

      req.meta = {
        title: news.data.title,
        desc,
        image: news.data.image.original,
        url,
        type: "news"
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
