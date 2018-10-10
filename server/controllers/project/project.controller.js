const projectModel = require('../../models/project/project.model');
const jwt = require('jsonwebtoken')

const { BadRequest, InternalServerError } = require('dynamic-route-generator')

const ProjectController = (req, res, next) => {
  const token = req.headers.authorization.split(' ').pop()
  const decodedToken = jwt.decode(token)

  if (req.method === 'POST') {
    if (!req.body.name) {
      next(new BadRequest('You must give your project a name'))
    }

    if (!req.body.baseLocale) {
      next(new BadRequest('You must supply at lease one base locale'))
    }

    if (!req.body.team) {
      next(new BadRequest('A project must be assigned to a team'))
    }

    next()
  }

  if (req.method === 'GET') {
    if (req.params.id) {
      projectModel.findOne({ 'team.link': decodedToken.data.properties.team.link, _id: req.params.id }, (err, doc) => {
        if (err) {
          return next(new InternalServerError())
        }

        if (doc) {
          res.status(200).send(doc)
        } else {
          res.status(200).send({})
        }
      })
    } else {
      projectModel.find({ 'team.link': decodedToken.data.properties.team.link }, (err, docs) => {
        if (err) {
          next(new InternalServerError())
        }

        res.status(200).send(docs)
      })
    }
  }
}

module.exports = ProjectController