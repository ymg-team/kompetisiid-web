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
      req.meta = {
        title: competition.data.title,
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
