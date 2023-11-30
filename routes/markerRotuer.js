import express from 'express';
import express from 'express';
import { createMarker } from '../controllers/MarkerController.js';

const markerRouter = express.Router();

markerRouter.post('/create', createMarker);
markerRouter.post('/info')