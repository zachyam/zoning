import { useEffect, useState } from 'react';
import {getZoneComplianceValues} from '../utils.js'
import { Nav } from "tabler-react";
import ZoneSelection from './ZoneSelection.js'
import AddNewRegulation from './AddNewRegulation.js';
import ModifyRegulations from './ModifyRegulations.js';
import { SelectButton } from 'primereact/selectbutton';
import "primereact/resources/themes/lara-light-blue/theme.css";

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
    const [viewAddRegulation, setViewAddRegulation] = useState(true);
    const [viewModifyRegulation, setViewModifyRegulation] = useState(false);
    const options = ['Add New Regulation to ' + zone, 'Edit / Delete Existing Regulation in ' + zone];
    const [value, setValue] = useState(options[0]);


    useEffect(() => {
        getZoneComplianceValues(zone, setRows, setZoneComplianceValues);
      }, [zone]);

    const handleCodeRegulationZoneTypeChange = (event) => {
      setZoneRegulationZoneType(event.target.value);
    };

    function setView(value) {
      setValue(value)
      if (value == options[0]) {
        console.log('add')
        setViewAddRegulation(true)
        setViewModifyRegulation(false)
      } else {
        setViewModifyRegulation(true)
        setViewAddRegulation(false)
      }
      console.log('view add is ' + viewAddRegulation)
      console.log('view mod is ' + viewModifyRegulation)
    }
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
            <div>
              <SelectButton style={{display: 'inline-flex'}} value={value} onChange={(e) => setView(e.value)} options={options} />
            </div>

            {viewModifyRegulation &&
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
            />}

            {viewAddRegulation &&
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
            />}
        </div>
        
    )
}