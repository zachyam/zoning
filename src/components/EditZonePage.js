import { useEffect, useState } from 'react';
import {getZoneComplianceValues} from '../utils.js'
import { Nav } from "tabler-react";
import ZoneSelection from './ZoneSelection.js'
import AddNewRegulation from './AddNewRegulation.js';
import ModifyRegulations from './ModifyRegulations.js';

export default function EditZonePage() {
    const [zoneComplianceValues, setZoneComplianceValues] = useState({});
    const [zone, setZone] = useState('RLD');
    const [rows, setRows] = useState({});
    const [zoneRegulationZoneType, setZoneRegulationZoneType] = useState("");
    const [newCodeRegulationName, setNewCodeRegulationName] = useState("");
    const [newCodeRegulationVal, setNewCodeRegulationVal] = useState(-1);
    const [newCodeRegulationMinVal, setNewCodeRegulationMinVal] = useState(-1);
    const [newCodeRegulationMaxVal, setNewCodeRegulationMaxVal] = useState(-1);
    const [noMinimum, setNoMinimum] = useState(false);
    const [noMaximum, setNoMaximum] = useState(false);
    const [unit, setUnit] = useState(null);
    const [regulationToEdit, setRegulationToEdit] = useState({});

    useEffect(() => {
        getZoneComplianceValues(zone, setRows, setZoneComplianceValues);
      }, [zone]);

    const handleCodeRegulationZoneTypeChange = (event) => {
      setZoneRegulationZoneType(event.target.value);
    };

    return (
        <div style={{ marginLeft: '2%', marginRight: '2%'}}>
            <Nav>
              <Nav.Item to="/" icon="home">
                Home
              </Nav.Item>
              <Nav.Item to="/EditZonePage" icon="grid">
                Edit Zones
              </Nav.Item>
            </Nav>
            <ZoneSelection 
                zone={zone}
                setZone={setZone}
            />
            <ModifyRegulations
              rows={rows}
              setRow={setRows}
              zone={zone}
              zoneComplianceValues={zoneComplianceValues}
              regulationToEdit={regulationToEdit}
              setRegulationToEdit={setRegulationToEdit}
              handleCodeRegulationZoneTypeChange={handleCodeRegulationZoneTypeChange}
              zoneRegulationZoneType={zoneRegulationZoneType}
              setZoneRegulationZoneType={setZoneRegulationZoneType}
              newCodeRegulationName={newCodeRegulationName}
              setNewCodeRegulationName={setNewCodeRegulationName}
              newCodeRegulationVal={newCodeRegulationVal}
              setNewCodeRegulationVal={setNewCodeRegulationVal}
              newCodeRegulationMinVal={newCodeRegulationMinVal}
              setNewCodeRegulationMinVal={setNewCodeRegulationMinVal}
              newCodeRegulationMaxVal={newCodeRegulationMaxVal}
              setNewCodeRegulationMaxVal={setNewCodeRegulationMaxVal}
              noMinimum={noMinimum}
              setNoMinimum={setNoMinimum}
              noMaximum={noMaximum}
              setNoMaximum={setNoMaximum}
              unit={unit}
              setUnit={setUnit}
            />

            <AddNewRegulation
              zone={zone}
              handleCodeRegulationZoneTypeChange={handleCodeRegulationZoneTypeChange}
              zoneRegulationZoneType={zoneRegulationZoneType}
              setZoneRegulationZoneType={setZoneRegulationZoneType}
              newCodeRegulationName={newCodeRegulationName}
              setNewCodeRegulationName={setNewCodeRegulationName}
              newCodeRegulationVal={newCodeRegulationVal}
              setNewCodeRegulationVal={setNewCodeRegulationVal}
              newCodeRegulationMinVal={newCodeRegulationMinVal}
              setNewCodeRegulationMinVal={setNewCodeRegulationMinVal}
              newCodeRegulationMaxVal={newCodeRegulationMaxVal}
              setNewCodeRegulationMaxVal={setNewCodeRegulationMaxVal}
              noMinimum={noMinimum}
              setNoMinimum={setNoMinimum}
              noMaximum={noMaximum}
              setNoMaximum={setNoMaximum}
              unit={unit}
              setUnit={setUnit}
            />
        </div>
        
    )
}