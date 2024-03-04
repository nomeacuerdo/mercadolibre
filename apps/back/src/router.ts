import express from 'express';
import { getIndexData } from './controllers/index';
import { getAllItemsData, getSingleItemData } from './controllers/items';
import { getCategoryInfo } from './controllers/category';

const router = express.Router();

router.get('/', getIndexData);
router.route('/items').get(getAllItemsData);
router.route('/items/:item').get(getSingleItemData);
router.route('/categories/:item').get(getCategoryInfo);

export default router;
