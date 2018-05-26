export default {
  development: {
    front: process.env.FRONT_HOST || 'https://ki.local',
    media: process.env.MEDIA_HOST || 'https://media.ki.local',
    api: process.env.API_HOST || 'https://api.ki.local',
    api_v42: process.env.API_HOST_V42 || 'https://api.ki.local'
  },
  production: {
    front: 'https://kompetisi.id',
    media: 'https://media.kompetisi.id',
    api: 'https://api.kompetisi.id',
    api_v42: 'http://159.65.1.114:18081'
  }
}
