const {validationResult} = require('express-validator');


exports.runValidation = (req, res, next) => {
  const errors = validationResult(req)
  // if there is error
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    })
  }
  next()
}