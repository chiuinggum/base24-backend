import express from 'express';
import bodyParser from 'body-parser';
import { createMarker, createMarkerInfo, listMarkersDetails } from '../controllers/MarkerController.js';

const markerRouter = express.Router();

markerRouter.use(bodyParser.json());
markerRouter.post('/create', createMarker);
markerRouter.post('/info', createMarkerInfo);
markerRouter.get('/:map_id', listMarkersDetails);

export default markerRouter;