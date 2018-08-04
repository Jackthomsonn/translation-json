const request = require('request')
const UpdateDocument = require('../update-document/update-document.controller')

const { BadRequest } = require('dynamic-route-generator')

const TranslateController = (req, res, next) => {
  if (!validateJson(req.body.json)) {
    next(new BadRequest('You have supplied invalid JSON. Please check and try again'))
  }

  if (req.body.chosenLocales.length === 0) {
    next(new BadRequest('You must select at least one target locale you wish to translate to'))
  }

  let count = 0
  const localesLength = Object.keys(req.body.chosenLocales).length
  const translations = {}

  UpdateDocument(req.body.project._id, { status: 'IN_PROGRESS' })

  req.body.chosenLocales.forEach(locale => {
    createTranslatedJSON(JSON.parse(req.body.json), locale).then((translatedJson) => {
      translations[locale] = translatedJson
      count++

      if (count === localesLength) {
        UpdateDocument(req.body.project._id, { status: 'COMPLETE', translations: translations })
      }
    }).catch(() => {
      UpdateDocument(req.body.project._id, { status: 'FAILED' })
    })
  })

  next();
}

const constructURL = (words, locale) => {
  let url = `https://translate.yandex.net/api/v1.5/tr.json/translate?lang=${locale}`
  const getWords = (words) => {
    for (let key in words) {
      if (typeof words[key] === 'object') {
        getWords(words[key])
      } else {
        url += `&text=${words[key]}`
      }
    }
  }

  getWords(words)

  url += `&key=${process.env.API_KEY}`

  return url
}

const validateJson = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }

  return true;
}

const getTranslatedWords = (words, locale) => {
  return new Promise((resolve, reject) => {
    request.get({ url: constructURL(words, locale) }, (req, res, body) => {
      if (validateJson(body)) {
        const parsedBody = JSON.parse(body)
        resolve(parsedBody.text)
      } else {
        reject();
      }
    }).on('error', reject)
  })
}

const createOutput = (jsonToTranslate, output, translatedWords, iterator, pip, locale, firstIteration, cb) => {
  let length

  if (firstIteration) {
    length = Object.keys(jsonToTranslate).length
  }

  for (let key in jsonToTranslate) {
    if (typeof jsonToTranslate[key] === 'object') {
      output[key] = {}
      pip++
      createOutput(jsonToTranslate[key], output[key], translatedWords, iterator, pip, locale, false)
    } else {
      output[key] = translatedWords[iterator]
      iterator++
      pip++
    }
  }

  if (length === pip) {
    cb(output)
  }
}

const createTranslatedJSON = (jsonToTranslate, locale) => {
  let keys = Object.keys(jsonToTranslate)
  let count = 0

  return new Promise((resolve, reject) => {
    getTranslatedWords(jsonToTranslate, locale).then(translatedWords => {
      createOutput(jsonToTranslate, {}, translatedWords, 0, 0, locale, true, (translationJson) => {
        resolve(translationJson)
      })
    }).catch(err => {
      reject()
    })
  })
}

module.exports = TranslateController