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
    let values = []
    if (zone == null || newCodeRegulationName == null) {
        return req.status(404).json({ error: "Zone or New Code Regulation Name cannot be null" });
    }
    const zoneRegulationZoneType = data.zoneRegulationZoneType;
    console.log(zoneRegulationZoneType)
    if (zoneRegulationZoneType == "single") {
        const newCodeRegulationVal = data.newCodeRegulationVal;
        values = [zone, newCodeRegulationName, newCodeRegulationVal, 2147483647, unit]
        
    } else {
        const newCodeRegulationMinVal = data.newCodeRegulationMinVal == -1 ? 0 : data.newCodeRegulationMinVal ;
        const newCodeRegulationMaxVal = data.newCodeRegulationMaxVal == -1 ? 2147483647 : data.newCodeRegulationMaxVal;
        values = [zone, newCodeRegulationName, newCodeRegulationMinVal, newCodeRegulationMaxVal, unit]
    }
    const newZoneRegulationData = await pool.query(
        'INSERT INTO attributevalues(zoneName, attributeName, minVal, maxVal, unit) VALUES($1, $2, $3, $4, $5)',
        values
    );
    console.log(newZoneRegulationData)

})

app.listen(4000, () => console.log("Server on localhost:4000"));