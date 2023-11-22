import { useState, useMemo } from 'react';
import DataGrid from 'react-data-grid';
import {rowKeyGetter } from '../utils.js'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Modal from '@mui/material/Modal';
import { styled, Box } from '@mui/system';
import Backdrop from '@mui/material/Backdrop';
import Button from 'react-bootstrap/Button';

import {
    MDBRow,
    MDBCol,
    MDBInput,
    MDBCheckbox
  } from "mdb-react-ui-kit"

const ModalContent = styled(Box)(
    ({ theme }) => `
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#FFF'};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 4px 12px ${
      theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.20)'
    };
    padding: 1rem;
    color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};
    font-family: IBM Plex Sans, sans-serif;
    font-weight: 500;
    text-align: start;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); /* Center the modal */
    width: 70%; /* Adjust the width to fill 70% of the screen */
    max-width: 800px; /* Set a maximum width if needed */
    height: 70%; /* Adjust the height to fill 70% of the screen */
    max-height: 600px; /* Set a maximum height if needed */
  
    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-right: 0.5rem;
    }
  
    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
    }
    `,
  );
  
  const StyledBackdrop = styled(Backdrop)`
    z-index: -1;
    position: fixed;
    inset: 0;
    background-color: rgb(0 0 0 / 0.5);
    -webkit-tap-highlight-color: transparent;
  `;
  
  const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
  };

  const style = {
    alignItems: 'center',
    justifyContent: 'center',
    width: 600,
  };

export default function ModifyRegulations({ rows, setRows, zone, zoneComplianceValues, regulationToEdit, setRegulationToEdit, handleCodeRegulationZoneTypeChange, zoneRegulationZoneType, setZoneRegulationZoneType, newCodeRegulationName, setNewCodeRegulationName, newCodeRegulationVal, setNewCodeRegulationVal, newCodeRegulationMinVal, setNewCodeRegulationMinVal, newCodeRegulationMaxVal, setNewCodeRegulationMaxVal, setNoMinimum, noMinimum, setNoMaximum, noMaximum, unit, setUnit }) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const clearModal = () => {
        setZoneRegulationZoneType("");
        setNewCodeRegulationName("");
        setNewCodeRegulationVal("");
        setNewCodeRegulationMinVal("");
        setNewCodeRegulationMaxVal("");
        setUnit(null);
        setNoMinimum(false);
        setNoMaximum(false);
        handleClose();
      }

    function getColumns() {
        return [
              // {
              //   field: "confirmed",
              //   headerName: "Confirmed",
              //   renderCell: (props) => (
              //     <Checkbox
              //       checked={props.checked}
              //       onChange={(e) => e.target.checked && addToSelectedRows(props.row.attribute, selectedRows, setSelectedRows)}
              //     />
              //   )
              // },
          {
            key: "modify",
            name: "",
            renderCell: (props) => (
              <div>
                <Button
                  style={{ backgroundColor: 'green'}}
                  type="submit"
                  onClick={() => editRow(props.row.attribute, zoneComplianceValues, setRegulationToEdit, handleOpen)}>Edit
                </Button>
                <Button
                  style={{ backgroundColor: '#B74C4C'}}
                  type="submit"
                  onClick={() => deleteRow(zone, props.row.attribute)}>Delete
                </Button>
              </div>
                  
            )
          },
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
          }
          // {
          //   key: 'newCodeRegulations',
          //   name: 'New Code Regulation',
          //   frozen: true,
          //   resizable: false,
          //   renderEditCell: textEditor
          // }
        ];
    }

    async function deleteRow(zone, attributeName) {
        try {
          const data = { attributeName }
          const response = await fetch(`http://localhost:4000/deleteZoningRegulations/${zone}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data }),
          });
          const result = await response.json();
          console.log(result);
        } catch (error) {
          console.log(error)
        }
    }
      
    function editRow(attributeName, zoneComplianceValues, setRegulationToEdit, handleOpen) {
        const minValToEdit = zoneComplianceValues[attributeName]['minVal'];
        const maxValToEdit = zoneComplianceValues[attributeName]['maxVal'];
        const unitToEdit = zoneComplianceValues[attributeName]['unit'];
      
        const data = { attributeName, minValToEdit, maxValToEdit, unitToEdit }
        console.log(unitToEdit)
        setRegulationToEdit(data)
        handleOpen(true);
    }

    const columns = useMemo(() => {
        // Ensure that zoneComplianceValues is populated before calling getColumns
        if (zoneComplianceValues) {
          return getColumns();
        }
    }, [zone, zoneComplianceValues]);
    
    async function saveEditRow(regulationToEdit, setZoneRegulationZoneType, zoneRegulationZoneType, setNewCodeRegulationVal, newCodeRegulationVal,
        setNewCodeRegulationMinVal, setNewCodeRegulationMaxVal, newCodeRegulationMinVal, newCodeRegulationMaxVal, setUnit, unit) {
        console.log(regulationToEdit);
        const newData = { zoneRegulationZoneType, newCodeRegulationVal, newCodeRegulationMinVal, newCodeRegulationMaxVal, unit }
        console.log(newData);

        setZoneRegulationZoneType("");
        setNewCodeRegulationVal("");
        setNewCodeRegulationMinVal("");
        setNewCodeRegulationMaxVal("");
        setUnit(null);
    }

    return (
        <div>
            <Modal
              aria-labelledby="unstyled-modal-title"
              aria-describedby="unstyled-modal-description"
              open={open}
              onClose={handleClose}
              slots={{ backdrop: StyledBackdrop }}
            >
              <ModalContent sx={style}>
                <h3 id="unstyled-modal-title" className="modal-title">
                Edit {regulationToEdit.attributeName} regulations
                </h3>
                <MDBRow>
                  <MDBCol md="6">
                      <form>
                          <div style={{ fontSize: '14px'}} className="grey-text">
                              <MDBInput 
                                label="Regulation Name" 
                                group type="text" 
                                validate error="wrong" 
                                value={regulationToEdit.attributeName} 
                                disabled={true}
                                />
                              
                          </div>
                      </form>
                      <FormControl style={{ width: '100%', marginTop: '20px', marginBottom: '20px'}}>
                        <InputLabel id="demo-simple-select-label">Value Type</InputLabel>
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
                  <MDBCol md="3">
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
                  style={{ backgroundColor: 'green'}}
                  type="submit"
                  onClick={() => saveEditRow(regulationToEdit, setZoneRegulationZoneType, zoneRegulationZoneType, setNewCodeRegulationVal,
                                             newCodeRegulationVal, setNewCodeRegulationMinVal, setNewCodeRegulationMaxVal, newCodeRegulationMinVal,
                                             newCodeRegulationMaxVal, setUnit, unit)}>Save changes
                </Button>
                <Button
                  style={{ backgroundColor: '#B74C4C'}}
                  type="submit"
                  onClick={() => clearModal()}>Cancel
                </Button>
              </ModalContent>
            </Modal>
            
            <h3 style={{ marginTop: '3%' }}> Edit / Delete existing regulations from {zone}</h3>

            <DataGrid
                style={{ height: '100%'}}
                rowKeyGetter={rowKeyGetter}
                columns={columns}
                rows={rows}
                onRowsChange={setRows}
                className="fill-grid"
                />

            {/* <Button
              style={{ marginTop: '2%', backgroundColor: '#B74C4C'}}
              type="submit"
              onClick={() => deleteSelectedRows(zone, selectedRows)}>Delete Existing Regulations
            </Button> */}
        </div>
    )
}