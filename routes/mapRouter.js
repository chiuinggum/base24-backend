import express from 'express';
import bodyParser from 'body-parser';
import {
    createMap,
    getMap
} from '../controllers/MapController.js';

const mapRouter = express.Router();

mapRouter.use(bodyParser.json());
mapRouter.post('/create', createMap);
mapRouter.get('/:id', getMap);

export default mapRouter;