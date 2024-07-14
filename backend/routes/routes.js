const Router = require('koa-router')
const router = new Router()

const ctrl = require('../controllers/users')

router.get('/user/:id', ctrl.getUserById);
router.get('/users', ctrl.getAllUsers);
router.put('/user/:id', ctrl.updateUser);
router.post('/user', ctrl.createUser);
router.delete('/user/:id', ctrl.deleteUser);
router.get('/manager/:managerId', ctrl.getManagerAndEmployees);

// to get all mangers for the add of new user ,to select the manager of the user 
router.get('/managers', ctrl.getAllManagers);

router.allowedMethods()

module.exports = router
