import { useState, useMemo } from 'react';
import DataGrid from 'react-data-grid';
import {rowKeyGetter } from '../utils.js';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';

import "primereact/resources/themes/lara-light-blue/theme.css";

export default function ModifyRegulations({ rows, setRows, zone, zoneComplianceValues, regulationToEdit, setRegulationToEdit, 
                                            handleCodeRegulationZoneTypeChange, zoneRegulationZoneType, setZoneRegulationZoneType, 
                                            setNewCodeRegulationName, newCodeRegulationVal, setNewCodeRegulationVal, newCodeRegulationMinVal, 
                                            setNewCodeRegulationMinVal, newCodeRegulationMaxVal, setNewCodeRegulationMaxVal, setNoMinimum, noMinimum, 
                                            setNoMaximum, noMaximum, unit, setUnit, optionValueTypes, setRowModified }) {
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
    
    async function deleteRow(attributeName) {
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
          setRowModified(true);
          console.log(result);
        } catch (error) {
          console.log(error)
        }
    }
      
    function editRow(attributeName) {
        const minValToEdit = zoneComplianceValues[attributeName]['minVal'];
        const maxValToEdit = zoneComplianceValues[attributeName]['maxVal'];
        const unitToEdit = zoneComplianceValues[attributeName]['unit'];
      
        const data = { attributeName, minValToEdit, maxValToEdit, unitToEdit }
        console.log(unitToEdit)
        setRegulationToEdit(data)
        handleOpen(true);
    }

    function getColumns() {
        return [
          {
            key: "modify",
            name: "",
            renderCell: (props) => (
              <div >
                <Button
                  label="Edit"
                  style={{ backgroundColor: 'green', borderColor:'white'}}
                  type="submit"
                  onClick={() => editRow(props.row.attribute)}>
                </Button>
                <Button
                  label="Delete"
                  style={{ backgroundColor: '#B74C4C', borderColor: 'white'}}
                  type="submit"
                  onClick={() => deleteRow(props.row.attribute)}> 
                  
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
        ];
    }

    const columns = useMemo(() => {
        // Ensure that zoneComplianceValues is populated before calling getColumns
        if (zoneComplianceValues) {
          return getColumns();
        }
    }, [zone, zoneComplianceValues]);
    
    async function saveEditRow() {
        console.log(regulationToEdit);
        const newData = { zoneRegulationZoneType, newCodeRegulationVal, newCodeRegulationMinVal, newCodeRegulationMaxVal, unit }
        console.log(newData);

        setZoneRegulationZoneType("");
        setNewCodeRegulationVal("");
        setNewCodeRegulationMinVal("");
        setNewCodeRegulationMaxVal("");
        setUnit(null);
        handleClose();
    }
    
    return (
        <div>
            <Dialog header="Edit values" visible={open} style={{ width: '30vw' }} onHide={() => handleClose()}>
                <div style={{width: '25%', marginRight: '2%', display:'inline'}} className="flex justify-content-center">
                    <InputText style={{marginRight: '2%'}} disabled placeholder={regulationToEdit.attributeName} />
                    <InputText
                        label="Unit" 
                        group type="text"
                        placeholder='Updated Unit'
                        validate error="wrong" 
                        success="right" 
                        onChange={(e) => setUnit(e.target.value)}
                    />
                </div>
                        
                <div style={{width: '30%', marginTop: '5%', marginBottom: '5%'}} className="card flex justify-content-center">
                    <Dropdown value={zoneRegulationZoneType == optionValueTypes[0]['code'] ? optionValueTypes[0] : optionValueTypes[1]} onChange={(e) => handleCodeRegulationZoneTypeChange(e)} options={optionValueTypes} optionLabel="name"
                            placeholder="Select a value type" className="w-full md:w-14rem"  />
                </div>
                {zoneRegulationZoneType == "single" &&
                    <div style={{marginTop: '2%', marginBottom: '10%'}} className="flex align-items-center">
                        <InputText
                            label="Value"
                            placeholder='Updated Value'
                            group type="text" 
                            validate error="wrong" 
                            success="right" 
                            onChange={(e) => setNewCodeRegulationVal(e.target.value)}
                        />
                    </div>
                }
                {zoneRegulationZoneType == "range" &&
                    <div style={{marginTop: '2%', marginBottom: '2%'}} className="flex align-items-center">
                        <InputText 
                            label="Minimum Value" 
                            group type="text" 
                            validate error="wrong" 
                            success="right" 
                            onChange={(e) => setNewCodeRegulationMinVal(e.target.value)}
                            disabled={noMinimum}
                        />
                    </div>
                }
                {zoneRegulationZoneType == "range" &&
                    <div style={{marginBottom: '2%'}}className="flex align-items-center">
                        <Checkbox 
                            name='No Minimum' 
                            value=''
                            id='flexCheckMin' 
                            label='No Minimum' 
                            checked={noMinimum}
                            onChange={() => setNoMinimum(!noMinimum)}
                        />
                        <label style={{marginBottom: '0'}}htmlFor="No Minimum" className="ml-2">No Minimum</label>

                    </div>
                    
                }

                {zoneRegulationZoneType == "range" &&
                    <InputText 
                        label="Maximum Value" 
                        group type="text" 
                        validate error="wrong" 
                        success="right" 
                        onChange={(e) => setNewCodeRegulationMaxVal(e.target.value)}
                        disabled={noMaximum}
                    />
                }

                {zoneRegulationZoneType == "range" &&
                    <div style={{marginTop: '2%', marginBottom: '10%'}} className="flex align-items-center">
                        <Checkbox 
                            name='No Maximum' 
                            value='' 
                            id='flexCheckMax' 
                            label='No Maximum' 
                            checked={noMaximum}
                            onChange={() => setNoMaximum(!noMaximum)}
                        />
                         <label style={{marginBottom: '0'}}htmlFor="No Maximum" className="ml-2">No Maximum</label>

                    </div>
                }
                <div style={{width: '30%', display: 'inline', marginBottom: '5%'}} className="card flex justify-content-center">
                    <Button
                        style={{ backgroundColor: 'green', borderColor:'white'}}
                        type="submit"
                        onClick={() => saveEditRow()}>Save changes
                    </Button>
                    <Button
                        style={{ backgroundColor: '#B74C4C', borderColor:'white'}}
                        type="submit"
                        onClick={() => clearModal()}>Cancel
                    </Button>
                    
                </div>
            </Dialog>
            
            <h3 style={{ marginTop: '3%' }}> Edit / Delete existing regulations from {zone}</h3>

            <DataGrid
                style={{ height: '100%'}}
                rowKeyGetter={rowKeyGetter}
                columns={columns}
                rows={rows}
                rowHeight={45}
                onRowsChange={setRows}
                className="fill-grid"
                />
        </div>
    )
}