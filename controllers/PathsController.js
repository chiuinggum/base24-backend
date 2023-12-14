import {
    createPathRow,
    updatePathRowInfo,
    deletePathRow,
    getPathRowsByMapId
} from "../models/PathsModel.js";
import {
    getMarkerRowByMarkerId
} from "../models/MarkersModel.js";

export const createPath = async (req, res, next) => {
    try {
        const { map_id, start_marker_id, end_marker_id } = req.body;
        const path = await createPathRow(map_id, start_marker_id, end_marker_id);
        res.status(200).json({
            data: {
                id: path.insertId,
                map_id,
                start_marker_id,
                end_marker_id
            }
        });
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error Creating Path' });
    }
}

export const updatePathInfo = async (req, res, next) => {
    try {
        const { id, info } = req.body;
        await updatePathRowInfo(id, info);
        res.status(200).json({
            data: {
                id,
                info
            }
        });
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error Updating Path Info' });
    }
}

export const deletePath = async (req, res, next) => {
    try {
        const { id } = req.body;
        await deletePathRow(id);
        res.status(200).json({
            data: {
                id
            }
        });
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error Deleting Path' });
    }
}

export const getPathsByMapId = async (req, res, next) => {
    try {
        const { map_id } = req.params;
        const paths = await getPathRowsByMapId(map_id);
        for (let path of paths) {
            const startMarker = await getMarkerRowByMarkerId(path.start_marker_id);
            const endMarker = await getMarkerRowByMarkerId(path.end_marker_id);
            path.start_marker_lat = startMarker.lat;
            path.start_marker_lng = startMarker.lng;
            path.end_marker_lat = endMarker.lat;
            path.end_marker_lng = endMarker.lng;
        }
        res.status(200).json({
            data: {
                paths
            }
        });
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error Retrieving Paths' });
    }
}