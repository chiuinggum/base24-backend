import {
    createMarkerRow,
    updateMarkerRowName,
    updateMarkerRowInfo,
    updateMarkerRowPlaceTag,
    deleteMarkerRow,
    getMarkerRowsByMapId
} from "../models/MarkersModel.js";

export const createMarker = async (req, res, next) => {
    try {
        const { map_id, name, place_id, lat, lng } = req.body;
        const marker = await createMarkerRow(map_id, name, place_id, lat, lng);
        res.status(200).json({
            data: {
                id: marker.insertId,
                map_id,
                name,
                place_id,
                lat,
                lng,
                place_tag: 'other',
                info: null,
                deleted: 0
            }
        });
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error Creating Marker' });
    }
}

export const updateMarkerName = async (req, res, next) => {
    try {
        const { id, name } = req.body;
        await updateMarkerRowName(id, name);
        res.status(200).json({
            data: {
                id,
                name
            }
        });
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error Updating Marker Name' });
    }
}

export const updateMarkerInfo = async (req, res, next) => {
    try {
        const { id, info } = req.body;
        await updateMarkerRowInfo(id, info);
        res.status(200).json({
            data: {
                id,
                info
            }
        });
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error Updating Marker Info' });
    }
}

export const updateMarkerPlaceTag = async (req, res, next) => {
    try {
        const { id, place_tag } = req.body;
        await updateMarkerRowPlaceTag(id, place_tag);
        res.status(200).json({
            data: {
                id,
                place_tag
            }
        });
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error Updating Marker Place Tag' });
    }
}

export const deleteMarker = async (req, res, next) => {
    try {
        const { id } = req.body;
        await deleteMarkerRow(id);
        res.status(200).json({
            data: {
                id
            }
        });
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error Deleting Marker' });
    }
}

export const getMarkersByMapId = async (req, res, next) => {
    try {
        const { map_id } = req.params;
        const markers = await getMarkerRowsByMapId(map_id);
        res.status(200).json({
            markers
        });
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error Retrieving Markers' });
    }
}