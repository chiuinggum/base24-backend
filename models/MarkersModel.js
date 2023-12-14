import dbConfig from "../config/dbConfig.js";
const { db } = dbConfig;

export const createMarkerRow = async (map_id, name, place_id, lat, lng) => {
    try {
        const [markerRow] = await db.query('INSERT INTO markers (map_id, name, place_id, lat, lng) VALUES (?, ?, ?, ?, ?)', [map_id, name, place_id, lat, lng]);
        console.log(`marker ${name} created with id ${markerRow.insertId}`);
        return markerRow;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const updateMarkerRowName = async (id, name) => {
    try {
        await db.query('UPDATE markers SET name = ? WHERE id = ?', [name, id]);
        console.log(`marker ${id} updated with name ${name}`);
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const updateMarkerRowInfo = async (id, info) => {
    try {
        // const jsonString = JSON.stringify(info);
        // console.log('jsonString', jsonString);
        // console.log('info', info);
        await db.query('UPDATE markers SET info = ? WHERE id = ?', [info, id]);
        console.log(`marker ${id} updated with info ${info}`);
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const updateMarkerRowPlaceTag = async (id, place_tag) => {
    try {
        await db.query('UPDATE markers SET place_tag = ? WHERE id = ?', [place_tag, id]);
        console.log(`marker ${id} updated with place_tag ${place_tag}`);
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const deleteMarkerRow = async (id) => {
    try {
        await db.query('UPDATE markers SET deleted = ? WHERE id = ?', [1, id]);
        console.log(`marker ${id} deleted`);
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const getMarkerRowsByMapId = async (map_id) => {
    try {
        const [markerRows] = await db.query('SELECT * FROM markers WHERE map_id = ? AND deleted = ?', [map_id, 0]);
        console.log(`markers of map ${map_id} retrieved`);
        return markerRows;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const getMarkerRowByMarkerId = async (marker_id) => {
    try {
        const [markerRow] = await db.query('SELECT * FROM markers WHERE id = ?', [marker_id]);
        console.log(`marker ${marker_id} retrieved`);
        return markerRow[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
}