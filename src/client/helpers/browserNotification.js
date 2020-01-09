/**
 * @desc function to generate browser notification
 * @param {string} title
 * @param {string} options.body text body
 * @param {string} options.icon icon if notification
 */
export default (title = "", options = {}) => {
 options.icon = "https://kompetisi.id/assets/images/small-red-logo-transparent.png"
 new Notification(
  title, options
 )
}