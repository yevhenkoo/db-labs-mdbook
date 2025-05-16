const Router = require('express')
const router = new Router()
const projectController = require('../controller/project.controller')

router.post('/project', projectController.createProject)
router.get('/project', projectController.getProjects)
router.get('/project/:id', projectController.getOneProject)
router.put('/project/:id', projectController.updateProjectName)
router.delete('/project/:id', projectController.deleteProject)

module.exports = router