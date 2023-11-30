import express from 'express';
import express from 'express';
import { createMarker, createMarkerInfo } from '../controllers/MarkerController.js';

const markerRouter = express.Router();

markerRouter.post('/create', createMarker);
markerRouter.post('/info', createMarkerInfo);
markerRouter.get('/:map_id', );