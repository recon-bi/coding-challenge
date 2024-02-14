import express from 'express';
import Controller from './hotels.controller';

const router = express.Router();
const controller = new Controller();

router.get('/', controller.getAll);
router.get('/paged-items', controller.getPagedItems);
router.get('/paged-items-count', controller.getPagedItemCount);
router.get('/search-options', controller.getSearchOptions);
router.get('/search', controller.getSearchResults)

module.exports = router;
