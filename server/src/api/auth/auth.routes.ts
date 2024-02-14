import express from 'express';
import Controller from './auth.controller';

const router = express.Router();
const controller = new Controller();

router.post('/', controller.login);
router.post('/logout', controller.logout);
router.post('/change-password', controller.changePassword);
router.post('/forgotten-password', controller.forgottenPassword);
router.post('/validate-token', controller.validateToken);

module.exports = router;
