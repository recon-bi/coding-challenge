import express from 'express';
import Controller from './example.controller';

const router = express.Router();
const controller = new Controller();

router.get('/', controller.getAll);
router.get('/paged-items', controller.getPagedItems);
router.get('/paged-items-count', controller.getPagedItemCount);
router.get('/find-by-query', controller.find);
router.get('/:id', controller.findOne);
router.post('/', controller.createOne);
router.put('/:id', controller.updateOne);

module.exports = router;
