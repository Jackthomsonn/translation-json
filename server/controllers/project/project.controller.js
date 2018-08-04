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
    if (req.query.q) {
      let prop = req.query.q.split('=').shift()
      let value = req.query.q.split('=').pop()

      if (value !== decodedToken.data.properties.team.link) {
        return next(new BadRequest('You are not authorised to view this teams projects'))
      }

      projectModel.find({ [prop]: value }, (err, docs) => {
        if (err) {
          next(new InternalServerError())
        }

        res.status(200).send(docs)
      })
    } else if (req.params.id) {
      next()
    } else {
      next(new BadRequest('You must be associated with a team to see projects'))
    }
  }
}

module.exports = ProjectController