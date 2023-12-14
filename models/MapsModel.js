import dbConfig from "../config/dbConfig.js";
const { db } = dbConfig;

export const createMapRow = async (trip_id, location, center_lat, center_lng, name, start_date, end_date) => {
    try {
        const [mapRow] = await db.query('INSERT INTO maps (trip_id, location, center_lat, center_lng, name, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?, ?)', [trip_id, location, center_lat, center_lng, name, start_date, end_date]);
        console.log(`map ${name} created with id ${mapRow.insertId}`);
        return mapRow;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const updateMapRowName = async (id, name) => {
    try {
        await db.query('UPDATE maps SET name = ? WHERE id = ?', [name, id]);
        console.log(`map ${id} updated with name ${name}`);
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const updateMapRowCenter = async (id, center_lat, center_lng) => {
    try {
        await db.query('UPDATE maps SET center_lat = ?, center_lng = ? WHERE id = ?', [center_lat, center_lng, id]);
        console.log(`map ${id} updated with center_lat ${center_lat} and center_lng ${center_lng}`);
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const updateMapRowZoom = async (id, zoom) => {
    try {
        await db.query('UPDATE maps SET zoom = ? WHERE id = ?', [zoom, id]);
        console.log(`map ${id} updated with zoom ${zoom}`);
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const deleteMapRow = async (id) => {
    try {
        await db.query('UPDATE maps SET deleted = ? WHERE id = ?', [1, id]);
        console.log(`map ${id} deleted`);
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const getMapRowsByTripId = async (trip_id) => {
    try {
        const [mapRows] = await db.query('SELECT * FROM maps WHERE trip_id = ? AND deleted = ?', [trip_id, 0]);
        console.log(`maps for trip ${trip_id} retrieved`);
        return mapRows;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const getMapRowByMapId = async (id) => {
    try {
        const [mapRow] = await db.query('SELECT * FROM maps WHERE id = ? AND deleted = ?', [id, 0]);
        console.log(`map ${id} retrieved`);
        return mapRow[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
}