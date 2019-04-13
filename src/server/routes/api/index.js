import express from "express"

const router = express.Router()

router.use("/kompetisi", require("./kompetisi"))
router.use("/jelajah", require("./jelajah"))
router.use("/news", require("./news"))
router.use("/request", require("./request"))
router.use("/user", require("./user"))
router.use("/stats", require("./stats"))
router.use("/counter", require("./counter"))

router.use("*", (req, res) => {
  res.json({
    status: 404,
    message: "endpoint not found"
  })
})

export default router
