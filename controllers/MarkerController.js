import {
    createMarker,
    createMarkerInfo,
    getMarkersByMapId
} from '../models/MarkerModel.js';

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
            const { map_id, marker_id, info } = req.body;
            const markerInfo = await createMarkerInfo(map_id, marker_id, info);
            res.status(200).json({ data: markerInfo });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error Creating Marker Info' });
        }
    };
    static async getMarkers(req, res, next) {
        try {
            const { map_id } = req.params;
            const markers = await getMarkersByMapId(map_id);
            res.status(200).json({ data: markers });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error Fetching Markers' });
        }
    }
};

export default MarkerController;