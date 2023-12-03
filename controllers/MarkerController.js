import {
    createMarkerRow,
    createMarkerInfoRow,
    getMarkersByMapId,
    getMarkerLocationById,
    updateMarkerInfoByMarkerInfoId,
    getMarkerInfoByMarkerInfoId
} from '../models/MarkerModel.js';

export const createMarker = async (req, res, next) => {
    try {
        const { name, place_id, lat, lng } = req.body;
        const marker = await createMarkerRow(name, place_id, lat, lng);
        res.status(200).json({
            data: {
                id: marker.insertId,
                name,
                place_id,
                lat,
                lng
            }
        });
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error Creating Marker' });
    }
};
export const createMarkerInfo = async (req, res, next) => {
    try {
        const { map_id, marker_id } = req.body;
        const info = req.body.info || '';
        const markerInfo = await createMarkerInfoRow(map_id, marker_id, info);
        res.status(200).json({
            data: {
                id: markerInfo.insertId,
                map_id,
                marker_id,
                info
            }
        });
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error Creating Marker Info' });
    }
};
// have problems
// export const getMarkers = async (req, res, next) => {
//     try {
//         const { map_id } = req.params;
//         const markers = await getMarkersByMapId(map_id);
//         res.status(200).json({ data: markers });
//         next();
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Error Fetching Markers' });
//     }
// };
export const listMarkersDetails = async (req, res, next) => {
    try {
        const { map_id } = req.params;
        const markers = await getMarkersByMapId(map_id);
        let markersWithLocation = [];
        for (let marker of markers) {
            const markerLocation = await getMarkerLocationById(marker.marker_id);
            const data = {
                id: marker.id,
                name: markerLocation.name,
                place_id: markerLocation.place_id,
                lat: markerLocation.lat,
                lng: markerLocation.lng,
                info: marker.info
            };
            markersWithLocation.push(data);
        }
        res.status(200).json({ data: markersWithLocation });
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error Fetching Markers' });
    }
};

export const updateMarkerInfo = async (req, res, next) => {
    try {
        const { marker_info_id } = req.params;
        const { info } = req.body;
        await updateMarkerInfoByMarkerInfoId(marker_info_id, info);
        const markerInfo = await getMarkerInfoByMarkerInfoId(marker_info_id);
        res.status(200). json({
            data: {
                id: markerInfo.id,
                map_id: markerInfo.map_id,
                marker_id: markerInfo.marker_id,
                new_info: markerInfo.info
            }
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error Updating Marker Info' });
    }
}