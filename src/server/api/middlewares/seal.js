import sealMiddleware from '../../../client/helpers/seal'

export default(req, res, next) => {
  if(process.env.NODE_ENV === 'development') {
    next()
  } else {
    const { is_valid } = sealMiddleware.validate(req.params.seal)
    if(is_valid) {
      return next()
    }else {
      return res.status(200).json({status: 403, message: 'forbidden'})
    }

  }
}
