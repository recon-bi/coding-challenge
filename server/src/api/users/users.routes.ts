import express from 'express';
import Controller from './users.controller';

const router = express.Router();
const controller = new Controller();

router.get('/', controller.getPagedItems);
router.get('/paged-items', controller.getPagedItems);
router.get('/paged-items-count', controller.getPagedItemCount);
router.get('/roles', controller.getRoles);
router.get('/:id', controller.findOne);
router.post('/', controller.createUser);
router.put('/', controller.updateUser);
router.delete('/', controller.deleteUser);

module.exports = router;
