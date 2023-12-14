import dbConfig from "../config/dbConfig.js";
const { db } = dbConfig;

export const createDatePathRow = async (date, path_id) => {
    try {
        const [datePathRow] = await db.query('INSERT INTO date_paths (date, path_id) VALUES (?, ?)', [date, path_id]);
        console.log(`date path created with id ${datePathRow.insertId}`);
        return datePathRow;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const createDateMarkerRow = async (date, marker_id) => {
    try {
        const [dateMarkerRow] = await db.query('INSERT INTO date_markers (date, marker_id) VALUES (?, ?)', [date, marker_id]);
        console.log(`date marker created with id ${dateMarkerRow.insertId}`);
        return dateMarkerRow;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const deleteDatePathRow = async (date, path_id) => {
    try {
        await db.query('UPDATE date_paths SET deleted = ? WHERE date = ? AND path_id = ?', [1, date, path_id]);
        console.log(`date path deleted with date ${date} and path_id ${path_id}`);
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const deleteDateMarkerRow = async (date, marker_id) => {
    try {
        await db.query('UPDATE date_markers SET deleted = ? WHERE date = ? AND marker_id = ?', [1, date, marker_id]);
        console.log(`date marker deleted with date ${date} and marker_id ${marker_id}`);
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const undeleteDatePathRow = async (date, path_id) => {
    try {
        await db.query('UPDATE date_paths SET deleted = ? WHERE date = ? AND path_id = ?', [0, date, path_id]);
        console.log(`date path undeleted with date ${date} and path_id ${path_id}`);
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const undeleteDateMarkerRow = async (date, marker_id) => {
    try {
        await db.query('UPDATE date_markers SET deleted = ? WHERE date = ? AND marker_id = ?', [0, date, marker_id]);
        console.log(`date marker undeleted with date ${date} and marker_id ${marker_id}`);
    } catch (err) {
        console.error(err);
        throw err;
    }
}

//

export const checkIfDateMarkerRowExists = async (date, marker_id) => {
    try {
        const [dateMarkerRow] = await db.query('SELECT * FROM date_markers WHERE date = ? AND marker_id = ?', [date, marker_id]);
        if (dateMarkerRow.length === 0) {
            return false;
        }
        return true;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const getDateMarkerRowByDateAndMarkerId = async (date, marker_id) => {
    try {
        const [dateMarkerRow] = await db.query('SELECT * FROM date_markers WHERE date = ? AND marker_id = ?', [date, marker_id]);
        if (dateMarkerRow.length === 0) {
            return false;
        }
        return dateMarkerRow[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const getDatesRowOfMarker = async (marker_id) => {
    try {
        const [dateMarkerRow] = await db.query('SELECT * FROM date_markers WHERE marker_id = ? AND deleted = ?', [marker_id, 0]);
        return dateMarkerRow;
    } catch (err) {
        console.error(err);
        throw err;
    }
}