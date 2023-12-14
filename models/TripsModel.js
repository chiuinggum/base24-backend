import dbConfig from "../config/dbConfig.js";
const { db } = dbConfig;

export const createTripRow = async (name, user_id, start_date, end_date) => {
    try {
        const [tripRow] = await db.query('INSERT INTO trips (name, user_id, start_date, end_date) VALUES (?, ?, ?, ?)', [name, user_id, start_date, end_date]);
        console.log(`trip ${name} created with id ${tripRow.insertId}`);
        return tripRow;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const updateTripRowStartDate = async (id, start_date) => {
    try {
        await db.query('UPDATE trips SET start_date = ? WHERE id = ?', [start_date, id]);
        console.log(`trip ${id} updated with start date ${start_date}`);
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const updateTripRowEndDate = async (id, end_date) => {
    try {
        await db.query('UPDATE trips SET end_date = ? WHERE id = ?', [end_date, id]);
        console.log(`trip ${id} updated with end date ${end_date}`);
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const deleteTripRow = async (id) => {
    try {
        await db.query('UPDATE trips SET deleted = ? WHERE id = ?', [1, id]);
        console.log(`trip ${id} deleted`);
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const getTripRowByTripId = async (trip_id) => {
    try {
        const [tripRow] = await db.query('SELECT * FROM trips WHERE id = ? AND deleted = ?', [trip_id, 0]);
        return tripRow[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const getTripRowsByUserId = async (user_id) => {
    try {
        const [tripRows] = await db.query('SELECT * FROM trips WHERE user_id = ? AND deleted = ?', [user_id, 0]);
        return tripRows;
    } catch (err) {
        console.error(err);
        throw err;
    }
}