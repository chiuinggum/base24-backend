import {
    createDatePathRow,
    createDateMarkerRow,
    deleteDatePathRow,
    deleteDateMarkerRow,
    undeleteDatePathRow,
    undeleteDateMarkerRow,
    checkIfDateMarkerRowExists,
    getDateMarkerRowByDateAndMarkerId,
    getDatePathRowByDateAndPathId,
    getDatesRowOfMarker,
    getDatesRowOfPath,
} from "../models/DatesModel.js";

// export const createDatePath = async (req, res, next) => {
//     try {
//         const { date, path_id } = req.body;
//         const datePathRow = await createDatePathRow(date_id, path_id);
//         res.status(200).json({
//             data: {
                
//             }
//         });
//         next();
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Error Creating Date Path' });
//     }
// }

// export const createDateMarker = async (req, res, next) => {
//     try {
//         const { date_id, marker_id } = req.body;
//         const dateMarkerRow = await createDateMarkerRow(date_id, marker_id);
//         res.status(200).json({
//             data: {
//                 date_id,
//                 marker_id
//             }
//         });
//         next();
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Error Creating Date Marker' });
//     }
// }

// export const deleteDatePath = async (req, res, next) => {
//     try {
//         const { date_id, path_id } = req.body;
//         await deleteDatePathRow(date_id, path_id);
//         res.status(200).json({
//             data: {
//                 date_id,
//                 path_id
//             }
//         });
//         next();
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Error Deleting Date Path' });
//     }
// }

// export const deleteDateMarker = async (req, res, next) => {
//     try {
//         const { date_id, marker_id } = req.body;
//         await deleteDateMarkerRow(date_id, marker_id);
//         res.status(200).json({
//             data: {
//                 date_id,
//                 marker_id
//             }
//         });
//         next();
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Error Deleting Date Marker' });
//     }
// }

export const updateDateMarkers = async (req, res, next) => {
    try {
        const { dates, dateName, marker_id } = req.body;
        console.log(dates, dateName, marker_id);
        
        for (let date of dates) {
            const dateMarkerRow = await getDateMarkerRowByDateAndMarkerId(date, marker_id);

            // add
            if (dateName.includes(date)) {
                if (dateMarkerRow && dateMarkerRow.deleted === 1) {
                    await undeleteDateMarkerRow(date, marker_id);
                } else if (!dateMarkerRow){
                    await createDateMarkerRow(date, marker_id);
                }
                
            } else {
                // remove
                if (dateMarkerRow && dateMarkerRow.deleted === 0) {
                    await deleteDateMarkerRow(date, marker_id);
                }
            }
        }
        res.status(200).json({ ok: true });
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error Updating Date Markers' });
    }
}

export const updateDatePaths = async (req, res, next) => {
    try {
        const { dates, dateName, path_id } = req.body;
        console.log(dates, dateName, path_id);

        for (let date of dates) {
            const datePathRow = await getDatePathRowByDateAndPathId(date, path_id);

            // add
            if (dateName.includes(date)) {
                if (datePathRow && datePathRow.deleted === 1) {
                    await undeleteDatePathRow(date, path_id);
                } else if (!datePathRow){
                    await createDatePathRow(date, path_id);
                }
                
            } else {
                // remove
                if (datePathRow && datePathRow.deleted === 0) {
                    await deleteDatePathRow(date, path_id);
                }
            }
        }
        res.status(200).json({ ok: true });
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error Updating Date Paths' });
    }
}

export const getDatesByMarkerId = async (req, res, next) => {
    try {
        const { marker_id } = req.params;
        const dates = await getDatesRowOfMarker(marker_id);
        let data = [];
        for (let date of dates) {
            data.push(date.date);
        }
        res.status(200).json({
            data
        });
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error Getting Dates By Marker Id' });
    }
}

export const getDatesByPathId = async (req, res, next) => {
    try {
        const { path_id } = req.params;
        const dates = await getDatesRowOfPath(path_id);
        let data = [];
        for (let date of dates) {
            data.push(date.date);
        }
        res.status(200).json({
            data
        });
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error Getting Dates By Path Id' });
    }
}