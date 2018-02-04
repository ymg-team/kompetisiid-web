export default {
  development: {
    front: process.env.FRONT_HOST || 'http://ki.local',
    media: process.env.MEDIA_HOST || 'http://media.ki.local',
    api: process.env.API_HOST || 'http://api.ki.local'
  },
  production: {
    production: 'https://kompetisi.id',
    media: 'https://media.kompetisi.id',
    api: 'https://api.kompetisi.id'
  }
}