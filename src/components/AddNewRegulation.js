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
  
export default function AddNewRegulation({ zone, handleCodeRegulationZoneTypeChange, zoneRegulationZoneType, setZoneRegulationZoneType, newCodeRegulationName, setNewCodeRegulationName, newCodeRegulationVal, setNewCodeRegulationVal, newCodeRegulationMinVal, setNewCodeRegulationMinVal, newCodeRegulationMaxVal, setNewCodeRegulationMaxVal, setNoMinimum, noMinimum, setNoMaximum, noMaximum, unit, setUnit }) {
    
    
    async function addNewRegulation() {
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
            setZoneRegulationZoneType("");
            setNewCodeRegulationName("");
            setNewCodeRegulationVal("");
            setNewCodeRegulationMinVal("");
            setNewCodeRegulationMaxVal("");
            setUnit(null);
            setNoMinimum(false);
            setNoMaximum(false);
            console.log(responseData);
        } catch (error) {
            console.error(error);
        }
    }
    
    return (
        <div>
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
                onClick={() => addNewRegulation()}>Add New Regulation
            </Button>
        </div>
    )

}
