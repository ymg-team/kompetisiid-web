import { requestAPIV2 } from "../helpers/apiCaller"
import Host from "../../config/host"

/**
 * @description middleware to request competition detail on server
 */
export const generateMetaCompetition = (req, res, next) => {
  return requestAPIV2("get", `/v2/competition/${req.params.id}`, {
    API_HOST: Host[process.env.NODE_ENV].api_v42
  }).then(response => {
    const competition = JSON.parse(response.body)
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
        url: `https://kompetisi.id/competition/${competition.data.id}/regulations/${competition.data.nospace_title}`,
        type: "event"
      }
    } else {
      req.meta = {
        title: competition.message,
        desc: competition.message,
        url: `https://kompetisi.id/competition/${req.params.id}/regulations/${req.params.title}`,
        type: "event"
      }
    }

    return next()

  })
}
