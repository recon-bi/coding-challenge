import express from 'express';
import Controller from './bookings.controller';

const router = express.Router();
const controller = new Controller();

router.get('/', controller.getAll);
router.get('/paged-items', controller.getPagedItems);
router.get('/paged-items-count', controller.getPagedItemCount);
router.post('/', controller.create)

module.exports = router;
