/**
 * @description function as _dashboard pages middleware
 */
export function dashboardMiddleware(req, res, next) {
  const userdata = req.session.userdata || {}

  if (Object.keys(userdata).length > 0 && userdata.id) {
    // admin and moderator cannot access _dashboard
    // if(['admin', 'moderator'].includes(userdata.level)) return res.redirect('/_super')
    // logged in Userredirect to _dashboard
    if (req.originalUrl === "/login") return res.redirect("/_dashboard")
    return next()
  } else {
    if (req.originalUrl !== "/login") return res.redirect("/login")
    return next()
  }
}

/**
 * @description function as _super pages middleware
 */
export function superMiddleware(req, res, next) {
  const userdata = req.session.userdata || {}

  // only moderator and admin can access this pages
  if (
    Object.keys(userdata).length > 0 &&
    userdata.id &&
    ["admin", "moderator"].includes(userdata.level)
  ) {
    if (req.originalUrl === "/_super") return res.redirect("/_super/_dashboard")
    return next()
  } else {
    if (req.originalUrl !== "/_super") return res.redirect("/_super")
    return next()
  }
}
