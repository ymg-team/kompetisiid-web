export default {
  development: {
    front: process.env.FRONT_HOST || "http://localhost:1470",
    media: process.env.MEDIA_HOST || "http://media.ki.local",
    api: process.env.API_HOST || "http://api.ki.local",
    api_v42: process.env.API_HOST_V42 || "http://api.ki.local"
  },
  production: {
    front: "https://kompetisi.id",
    media: "https://media.kompetisi.id",
    api: "https://api.kompetisi.id",
    api_v42: "http://159.65.1.114:18081"
  }
}
