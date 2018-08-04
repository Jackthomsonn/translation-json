const jwt = require('jsonwebtoken')

const UserController = (req, res) => {
  const token = req.headers.authorization.split(' ').pop()

  const decoded = jwt.decode(token)

  res.status(200).send({
    username: decoded.data.username,
    permissions: decoded.data.permissions,
    properties: decoded.data.properties
  })
}

module.exports = UserController