import { createMarker, createMarkerInfo } from '../models/MarkerModel.js';

class MarkerController {
    static async createMarker(req, res, next) {
        try {
            const { name, place_id, lat, lng } = req.body;
            const marker = await createMarker(name, place_id, lat, lng);
            res.status(200).json({ data: marker });
            next();
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error Creating Marker' });
        }
    };
    static async createMarkerInfo(req, res, next) {
        try {
            const { marker_id, info } = req.body;
            const markerInfo = await createMarkerInfo(marker_id, info);
            res.status(200).json({ data: markerInfo });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error Creating Marker Info' });
        }
    }
};

export default MarkerController;