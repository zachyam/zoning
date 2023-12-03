import { useEffect, useState } from 'react';
import {getZoneComplianceValues} from '../utils.js'
import { Nav } from "tabler-react";
import ZoneSelection from './ZoneSelection.js'
import AddNewRegulation from './AddNewRegulation.js';
import ModifyRegulations from './ModifyRegulations.js';
import { SelectButton } from 'primereact/selectbutton';
import "primereact/resources/themes/lara-light-blue/theme.css";

export default function EditCodeRegulationsPage() {
    const [zoneComplianceValues, setZoneComplianceValues] = useState({});
    const [zone, setZone] = useState('RLD');
    const [rows, setRows] = useState({});
    const [newCodeRegulationName, setNewCodeRegulationName] = useState("");
    const [newCodeRegulationVal, setNewCodeRegulationVal] = useState(-1);
    const [newCodeRegulationMinVal, setNewCodeRegulationMinVal] = useState(-1);
    const [newCodeRegulationMaxVal, setNewCodeRegulationMaxVal] = useState(-1);
    const [noMinimum, setNoMinimum] = useState(false);
    const [noMaximum, setNoMaximum] = useState(false);
    const [keepOriginalUnit, setKeepOriginalUnit] = useState(false);
    const [unit, setUnit] = useState("");
    const [rowModified, setRowModified] = useState(false);
    const [regulationToEdit, setRegulationToEdit] = useState({});
    const [viewAddRegulation, setViewAddRegulation] = useState(true);
    const [viewModifyRegulation, setViewModifyRegulation] = useState(false);
    const options = ['Add New Development Standard to ' + zone, 'Edit / Delete Existing Development Standard in ' + zone];
    const [value, setValue] = useState(options[0]);

    useEffect(() => {
        getZoneComplianceValues(zone, setRows, setZoneComplianceValues, setRowModified);
      }, [zone, rowModified]);

    function setView(value) {
      setValue(value)
      if (value == options[0]) {
        setViewAddRegulation(true)
        setViewModifyRegulation(false)
      } else {
        setViewModifyRegulation(true)
        setViewAddRegulation(false)
      }
      setNewCodeRegulationName("");
      setNewCodeRegulationVal(-1);
      setNewCodeRegulationMinVal(-1);
      setNewCodeRegulationMaxVal(-1);
      setNoMinimum(false);
      setNoMaximum(false);
      setUnit("");
      setRegulationToEdit({})
    }
    return (
        <div style={{ marginLeft: '2%', marginRight: '2%'}}>
            <Nav>
              <Nav.Item to="/" icon="home">
                Home
              </Nav.Item>
              <Nav.Item to="/EditCodeRegulationsPage" icon="grid">
                Edit Code Regulations
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
                setRowModified={setRowModified}
                keepOriginalUnit={keepOriginalUnit}
                setKeepOriginalUnit={setKeepOriginalUnit}
              />
            }

            {viewAddRegulation &&
              <AddNewRegulation
                zone={zone}
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
                setRowModified={setRowModified}
              />
            }
        </div>
        
    )
}