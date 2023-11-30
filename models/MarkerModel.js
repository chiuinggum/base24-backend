import dbConfig from "../config/dbConfig.js";
const { db } = dbConfig;

export const createMarkerRow = async (name, place_id, lat, lng) => {
    try {
        const [markerRow] = await db.query('INSERT INTO markers (name, place_id, lat, lng) VALUES (?, ?, ?, ?)', [name, place_id, lat, lng]);
        console.log(`marker ${name} created with id ${markerRow.insertId}`);
        return markerRow;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const createMarkerInfoRow = async (map_id, marker_id, info) => {
    try {
        const [markerInfoRow] = await db.query('INSERT INTO marker_info (map_id, marker_id, info) VALUES (?, ?, ?)', [map_id, marker_id, info]);
        console.log(`marker info with marker_id: ${marker_id} created with id ${markerInfoRow.insertId}`);
        return markerInfoRow;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const getMarkersByMapId = async (map_id) => {
    try {
        const [markerRows] = await db.query('SELECT * FROM marker_info WHERE map_id = ?', [map_id]);
        console.log(`markers with map_id: ${map_id} fetched`);
        return markerRows;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const getMarkerLocationById = async (marker_id) => {
    try {
        const [markerRow] = await db.query('SELECT * FROM markers WHERE id = ?', [marker_id]);
        console.log(`marker with id: ${marker_id} fetched`);
        return markerRow;
    } catch (err) {
        console.error(err);
        throw err;
    }
};