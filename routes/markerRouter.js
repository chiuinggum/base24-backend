import express from 'express';
import bodyParser from 'body-parser';
import { 
    createMarker,
    createMarkerInfo,
    listMarkersDetails,
    updateMarkerInfo,
    updateMarkerMarkdown
} from '../controllers/MarkerController.js';

const markerRouter = express.Router();

markerRouter.use(bodyParser.json());
markerRouter.post('/create', createMarker);
markerRouter.post('/info', createMarkerInfo);
markerRouter.get('/:map_id', listMarkersDetails);
markerRouter.put('/info/:marker_info_id', updateMarkerInfo);
markerRouter.put('/update/markdown/:marker_info_id', updateMarkerMarkdown);

export default markerRouter;