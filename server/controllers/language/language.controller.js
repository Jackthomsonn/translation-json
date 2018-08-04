const request = require('request')
const { InternalServerError } = require('dynamic-route-generator')

const TranslateController = (req, res, next) => {
  const { url } = req.body

  request(url + process.env.API_KEY, (err, _response, body) => {
    const parsedBody = JSON.parse(body)

    if (err) {
      next(new InternalServerError())
    }

    if(parsedBody.code) {
      return res.status(parsedBody.code).send(parsedBody.message)
    }

    res.status(200).send(JSON.parse(body))
  })
}

module.exports = TranslateController