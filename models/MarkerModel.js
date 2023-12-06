import { json } from "express";
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
        return markerRow[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const updateMarkerInfoByMarkerInfoId = async (marker_info_id, info) => {
    try {
        const [markerInfoRow] = await db.query('UPDATE marker_info SET info = ? WHERE id = ?', [info, marker_info_id]);
        if(markerInfoRow.affectedRows === 0) throw new Error(`marker info with id: ${marker_info_id} not found`);
        console.log(`marker info with id: ${marker_info_id} updated`);
        // return markerInfoRow;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const getMarkerInfoByMarkerInfoId = async (marker_info_id) => {
    try {
        const [markerInfoRow] = await db.query('SELECT * FROM marker_info WHERE id = ?', [marker_info_id]);
        console.log(`marker info with id: ${marker_info_id} fetched`);
        return markerInfoRow[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const updateMarkerMDByMarkerInfoId = async (marker_info_id, json_info) => {
    try {
        // json_info = JSON.stringify(json_info);
        // console.log(json_info);
        const [markerInfoRow] = await db.query('UPDATE marker_info SET json_info = ? WHERE id = ?', [json_info, marker_info_id]);
        if(markerInfoRow.affectedRows === 0) throw new Error(`marker info with id: ${marker_info_id} not found`);
        console.log(`marker info with id: ${marker_info_id} updated`);
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const getMarkerMDByMarkerInfoId = async (marker_info_id) => {
    try {
        const [markerInfoRow] = await db.query('SELECT json_info FROM marker_info WHERE id = ?', [marker_info_id]);
        console.log(`marker info with id: ${marker_info_id} fetched`);
        return markerInfoRow[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const createPathRow = async (map_id, path) => {
    try {
        const start_lat = path[0].lat;
        const start_lng = path[0].lng;
        const end_lat = path[1].lat;
        const end_lng = path[1].lng;
        const [pathRow] = await db.query('INSERT INTO paths (map_id, start_lat, start_lng, end_lat, end_lng) VALUES (?, ?, ?, ?, ?)', [map_id, start_lat, start_lng, end_lat, end_lng]);
        console.log(`path with map_id: ${map_id} created with id ${pathRow.insertId}`);
        return pathRow;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const createMarkerPlaceTag = async (marker_info_id, place_tag) => {
    try {
        const [markerRow] = await db.query('INSERT INTO marker_info (place_tag) VALUES (?) WHERE id = ?', [place_tag, marker_info_id]);
        console.log(`marker tag with marker_info_id: ${marker_info_id} created with id ${markerRow.insertId}`);
        return markerRow[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
}