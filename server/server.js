const express = require("express")
const cors = require("cors")

const app = express()
const pool = require('./database')

app.use(express.json())
app.use(cors())

app.get("/getZoneCompliance/:zone", async(req, res) => {
    const zone = req.params.zone
    // Fetch all rows with matching zone name
    const zoneData = await pool.query('SELECT * FROM attributevalues WHERE zonename = $1', [zone]);

    if (zoneData.rows.length === 0) {
        return res.status(404).json({ error: "Zone not found" });
    }

    return res.json(zoneData.rows);
})

app.post("/addZoneCompliance/:zone", async(req, res) => {
    const data = req.body.data;
    const zone = data.zone;
    const unit = data.unit;
    const newCodeRegulationName = data.newCodeRegulationName;
    const noMaximum = data.noMaximum;
    const noMinimum = data.noMinimum;
    let values = []
    if (zone == null || newCodeRegulationName == null) {
        return res.status(404).json({ error: "Zone or New Development Standard Name cannot be null" });
    }
    const newCodeRegulationMinVal = (data.newCodeRegulationMinVal == -1 || noMinimum) ? 0 : data.newCodeRegulationMinVal ;
    const newCodeRegulationMaxVal = (data.newCodeRegulationMaxVal == -1 || noMaximum) ? 2147483647 : data.newCodeRegulationMaxVal;
    values = [zone, newCodeRegulationName, newCodeRegulationMinVal, newCodeRegulationMaxVal, unit];
    await pool.query(
        'INSERT INTO attributevalues(zoneName, attributeName, minVal, maxVal, unit) VALUES($1, $2, $3, $4, $5)',
        values
    );
    return res.status(200).json({ Sucess: "Added new zone code regulations" });
})

app.post("/editZoneCompliance/:zone", async(req, res) => {
    const data = req.body.data;
    const attributeName = data.attributeNameToEdit;
    const zone = data.zone;
    const unit = data.unit;
    const noMaximum = data.noMaximum;
    const noMinimum = data.noMinimum;
    const keepOriginalUnit = data.keepOriginalUnit;

    if (zone == null || attributeName == null) {
        return res.status(404).json({ error: "Zone or Development Standard Name cannot be null" });
    }

    const newCodeRegulationMinVal = (data.newCodeRegulationMinVal == -1 || noMinimum) ? 0 : data.newCodeRegulationMinVal ;
    const newCodeRegulationMaxVal = (data.newCodeRegulationMaxVal == -1 || noMaximum) ? 2147483647 : data.newCodeRegulationMaxVal;
    if (keepOriginalUnit) {
        values = [newCodeRegulationMinVal, newCodeRegulationMaxVal, zone, attributeName];
        await pool.query(
            'UPDATE attributevalues SET minVal = $1, maxVal = $2 WHERE (zoneName = $3 AND attributeName = $4)',
            values
        );
    } else {
        values = [newCodeRegulationMinVal, newCodeRegulationMaxVal, unit, zone, attributeName];
        await pool.query(
            'UPDATE attributevalues SET minVal = $1, maxVal = $2, unit = $3 WHERE (zoneName = $4 AND attributeName = $5)',
            values
        );
    }
    
    return res.status(200).json({ Sucess: "Edited zone code regulations" });
})


app.post("/deleteZoningRegulations/:zone", async(req, res) => {
    const zone = req.params.zone
    const attributeToDelete = req.body.attributeToDelete
    console.log(attributeToDelete)
    const result = await pool.query(
        `DELETE FROM attributevalues 
        WHERE zonename = $1 
        AND attributename = $2`,
        [zone, attributeToDelete]
      );
    if (result == null) {
        return res.status(404).json({ error: "Error: unable to delete zone regulations" });
    }

    return res.status(200).json({ Sucess: "Sucessfully deleted zone regulations" });
})

app.post("/addNewZone", async(req, res) => {
    const newZoneName = req.body.newZoneName
    const allZones = await pool.query(
        'SELECT * FROM zones'
    );
    console.log(allZones.rows)
    for (const zoneObj of allZones.rows) {
        if (zoneObj['zonename'].toLowerCase() == newZoneName.toLowerCase()) {
            console.log("Error: Zone already exists")
            return res.json(false);
        }
    }
    const result = await pool.query(
        'INSERT INTO zones(zoneName) VALUES($1)',
        [newZoneName]
    );
    if (result == null) {
        return res.status(404).json({ error: "Error: unable to add new zone" });
    }
    console.log("Sucessfully added new zone")
    return res.json(true);
})

app.get("/getAllZones", async(req, res) => {
    const allZones = await pool.query(
        'SELECT * FROM zones'
    );
    return res.json(allZones.rows);
})

app.post("/deleteZone", async(req, res) => {
    const zoneNameToDelete = req.body.zoneNameToDelete
    const deleteFromZonesTable = await pool.query(
        `DELETE FROM zones 
        WHERE zonename = $1`,
        [zoneNameToDelete]
      );
    const deleteFromAtrributesTable = await pool.query(
        `DELETE FROM attributevalues 
        WHERE zonename = $1`,
        [zoneNameToDelete]
      );
    if (deleteFromZonesTable == null || deleteFromAtrributesTable == null) {
        return res.status(404).json({ error: "Error: unable to delete zone" });
    }

    return res.status(200).json({ Sucess: "Sucessfully deleted zone" });
})

app.post("/editZone", async(req, res) => {
    const zoneNameToEdit = req.body.zoneNameToEdit
    const newZoneName = req.body.newZoneName;

    const zoneNameWithIds = await pool.query(
        `SELECT * FROM zones`
    );
    console.log(zoneNameWithIds.rows)
    for (const zoneObj of zoneNameWithIds.rows) {
        if (zoneObj['zonename'].toLowerCase() == newZoneName.toLowerCase()) {
            return res.json(false)
        }
    }

    const updateZonesTableResult = await pool.query(
        'UPDATE zones SET zonename = $1 WHERE zonename = $2',
        [newZoneName, zoneNameToEdit]
    );

    const result = await pool.query(
        'UPDATE attributevalues SET zonename = $1 WHERE zonename = $2',
        [newZoneName, zoneNameToEdit]
    );
    if (updateZonesTableResult == null) {
        return res.status(404).json({ error: "Error: unable to update zone" });
    }
    return res.json(true);
})

app.listen(4000, () => console.log("Server on localhost:4000"));