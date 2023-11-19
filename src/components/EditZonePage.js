import { useEffect, useState, useMemo } from 'react';
import { Nav } from "tabler-react";
import DataGrid, { textEditor } from 'react-data-grid';
import {createRows, rowKeyGetter, getZoneComplianceValues} from '../utils.js'
import jsPDF from "jspdf";
import "jspdf-autotable";
import Button from 'react-bootstrap/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';


import {
    MDBRow,
    MDBCol,
    MDBInput,
    MDBCheckbox
  } from "mdb-react-ui-kit"

import ZoneSelection from './ZoneSelection';

function getColumns(zoneComplianceValues) {
    return [
        {
          key: 'attribute',
          name: '',
          frozen: true,
          resizable: false,
          renderCell(props) {
            return <div>{props.row.attribute}</div>
          }
        },
        {
          key: 'codeRegulations',
          name: 'Code Regulations',
          frozen: true,
          resizable: false
        },
        {
          key: 'newCodeRegulations',
          name: 'New Code Regulation',
          frozen: true,
          resizable: false,
          renderEditCell: textEditor
        }
      ];
}

async function addNewRegulation(zone, zoneRegulationZoneType, newCodeRegulationName, newCodeRegulationVal, newCodeRegulationMinVal, newCodeRegulationMaxVal, unit) {
  console.log(newCodeRegulationName)
  console.log(newCodeRegulationVal)
  console.log(newCodeRegulationMinVal)
  console.log(newCodeRegulationMaxVal)


  try {
    const data = { zone, zoneRegulationZoneType, newCodeRegulationName, newCodeRegulationVal, newCodeRegulationMinVal, newCodeRegulationMaxVal, unit }
    const response = await fetch(`http://localhost:4000/addZoneCompliance/${zone}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    });

    const responseData = await response.json();
    console.log(responseData);
  } catch (error) {
    console.error(error);
  }
}


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
    const [unit, setUnit] = useState(null)

    useEffect(() => {
        // const values = JSON.parse(localStorage.getItem('zoneComplianceValues'));
        // if (values) {
        //     // Access and use the data
        //     setZoneComplianceValues(values)
        //     setRows(createRows(values))
        // } else {
        //     getZoneComplianceValues(zone, setRows, setZoneComplianceValues);
        // }
        getZoneComplianceValues(zone, setRows, setZoneComplianceValues);
      }, [zone]);
    
    const columns = useMemo(() => {
        // Ensure that zoneComplianceValues is populated before calling getColumns
        if (zoneComplianceValues) {
          return getColumns(zoneComplianceValues);
        }
    }, [zone, zoneComplianceValues]);

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
            <h3> Edit {zone} Zone Regulations</h3>
            <DataGrid
                style={{ height: '100%'}}
                rowKeyGetter={rowKeyGetter}
                columns={columns}
                rows={rows}
                onRowsChange={setRows}
                className="fill-grid"
            />
            <h3 style={{ marginTop: '3%' }}> Add New Zone Regulations to {zone}</h3>
            <MDBRow>
                <MDBCol md="3">
                    <form>
                        <div style={{ fontSize: '14px'}} className="grey-text">
                            <MDBInput 
                              label="New Regulation" 
                              group type="text" 
                              validate error="wrong" 
                              success="right" 
                              onChange={(e) => setNewCodeRegulationName(e.target.value)}
                               />
                            
                        </div>
                    </form>
                    <FormControl style={{ width: '50%', marginTop: '20px', marginBottom: '20px'}}>
                      <InputLabel id="demo-simple-select-label">Code Regulation Value Type</InputLabel>
                      <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Select Property"
                          onChange={handleCodeRegulationZoneTypeChange}
                      >
                        <MenuItem value={"single"}>Single value</MenuItem>
                        <MenuItem value={"range"}>Range</MenuItem>
                      </Select>

                    </FormControl>

                    {zoneRegulationZoneType == "single" && 
                    <MDBInput 
                      label="Value" 
                      group type="text" 
                      validate error="wrong" 
                      success="right" 
                      onChange={(e) => setNewCodeRegulationVal(e.target.value)}
                    />
                    }

                    {zoneRegulationZoneType == "range" && 
                    <MDBInput 
                      label="Minimum Value" 
                      group type="text" 
                      validate error="wrong" 
                      success="right" 
                      onChange={(e) => setNewCodeRegulationMinVal(e.target.value)}
                      disabled={noMinimum}
                    />
                    }

                    {zoneRegulationZoneType == "range" &&
                      <MDBCheckbox 
                        name='No Minimum' 
                        value='' 
                        id='flexCheckMin' 
                        label='No Minimum' 
                        checked={noMinimum}
                        onChange={() => setNoMinimum(!noMinimum)}
                      />
                    }

                    {zoneRegulationZoneType == "range" &&
                    <MDBInput 
                      label="Maximum Value" 
                      group type="text" 
                      validate error="wrong" 
                      success="right" 
                      onChange={(e) => setNewCodeRegulationMaxVal(e.target.value)}
                      disabled={noMaximum}
                    />
                    }

                    {zoneRegulationZoneType == "range" &&
                      <MDBCheckbox 
                        name='No Maximum' 
                        value='' 
                        id='flexCheckMax' 
                        label='No Maximum' 
                        checked={noMaximum}
                        onChange={() => setNoMaximum(!noMaximum)}
                      />
                    }
                    
                </MDBCol>
                <MDBCol md="1">
                  <form>
                    <div style={{ fontSize: '14px'}} className="grey-text">
                      <MDBInput 
                        label="Unit" 
                        group type="text" 
                        validate error="wrong" 
                        success="right" 
                        onChange={(e) => setUnit(e.target.value)}
                       />            
                    </div>
                  </form>
                </MDBCol>
                
            </MDBRow>

            <Button
              style={{ marginTop: '2%'}}
              type="submit"
              onClick={() => addNewRegulation(zone, zoneRegulationZoneType, newCodeRegulationName, newCodeRegulationVal, newCodeRegulationMinVal, newCodeRegulationMaxVal, unit)}>Add New Regulation
            </Button>
        </div>
        
    )
}

const exportPDF = (rows, zone, projectNumber) => {
  const unit = "pt";
  const size = "A4"; // Use A1, A2, A3 or A4
  const orientation = "landscape"; // portrait or landscape

  const marginLeft = 40;
  const doc = new jsPDF(orientation, unit, size);
  doc.setLineHeightFactor(1.5);
  doc.setFontSize(11);
  const zoneText = "Zone: " + zone;

  const text = [zoneText];
  const headers = [[" ", "Code Regulations", "New Code Regulations"]];

  const data = rows.map(row => [row.attribute, row.codeRegulations, row.newCodeRegulations])

  let content = {
    startY: 125,
    head: headers,  
    body: data
  };

  doc.text(text, marginLeft, 40);
  doc.autoTable(content);
  const fileName = projectNumber == '' ? "report.pdf" : projectNumber + "_report.pdf"
  doc.save(fileName)
}