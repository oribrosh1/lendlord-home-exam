const Router = require('koa-router')
const router = new Router()

const ctrl = require('../controllers/users')

router.get('/user/:id', ctrl.getUserById)

router.get('/users', ctrl.getAllUsers);
router.put('/user/:id', ctrl.updateUser);
router.post('/user', ctrl.createUser);
router.delete('/user/:id', ctrl.deleteUser);
router.get('/manager/:managerId', ctrl.getManagerAndEmployees);

router.allowedMethods()

module.exports = router
