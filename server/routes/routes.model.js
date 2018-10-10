const ProjectModel = require('../models/project/project.model')
const TranslateModel = require('../models/tranlsate/translate.model')
const LanguageModel = require('../models/language/language.model')
const UserModel = require('../models/user/user.model')
const TeamModel = require('../models/team/team.model')

const ProjectController = require('../controllers/project/project.controller')
const TranslateController = require('../controllers/translate/translate.controller')
const LanguageController = require('../controllers/language/language.controller')
const UserController = require('../controllers/user/user.controller')

const { CheckAuthentication } = require('x-auth-plugin')

const routes = [{
  uri: '/projects',
  model: ProjectModel,
  methods: [{
    name: 'get',
    handlers: [CheckAuthentication, ProjectController],
  }, {
    name: 'post',
    handlers: [CheckAuthentication, ProjectController],
  }]
}, {
  uri: '/teams',
  model: TeamModel,
  methods: [{
    name: 'get'
  }, {
    name: 'post',
    handlers: [CheckAuthentication]
  }]
}, {
  uri: '/translate',
  model: TranslateModel,
  methods: [{
    name: 'post',
    handlers: [CheckAuthentication, TranslateController]
  }]
}, {
  uri: '/languages',
  model: LanguageModel,
  methods: [{
    name: 'post',
    handlers: [CheckAuthentication, LanguageController]
  }]
}, {
  uri: '/user',
  model: UserModel,
  methods: [{
    name: 'get',
    handlers: [CheckAuthentication, UserController]
  }]
}]

module.exports = routes