const ProjectModel = require('../../models/project/project.model')
const notificationEmitter = require('../../services/notification/notification.service')

const UpdateDocument = (uid, props) => {
  ProjectModel.update({ _id: uid }, {
    $set: props
  }).then(() => {
    notificationEmitter.emit('outsideEvent', {
      name: 'documentUpdated',
      data: props.status
    })
  })
}

module.exports = UpdateDocument