import { useState, useMemo, useRef, useEffect } from 'react';
import DataGrid from 'react-data-grid';
import {rowKeyGetter } from '../utils.js';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { Toast } from 'primereact/toast';

import "primereact/resources/themes/lara-light-blue/theme.css";

export default function ModifyRegulations({ rows, setRows, zone, zoneComplianceValues, regulationToEdit, setRegulationToEdit,  
                                            setNewCodeRegulationName, newCodeRegulationVal, setNewCodeRegulationVal, newCodeRegulationMinVal, 
                                            setNewCodeRegulationMinVal, newCodeRegulationMaxVal, setNewCodeRegulationMaxVal, setNoMinimum, noMinimum, 
                                            setNoMaximum, noMaximum, unit, setUnit, setRowModified, keepOriginalUnit, setKeepOriginalUnit }) {
    const [open, setOpen] = useState(false);
    const [attributeNameToEdit, setAttributeNameToEdit] = useState("");
    const [content, setContent] = useState(null)

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const toast = useRef(null);

    async function containsInvalidInputs() {
      return new Promise((resolve, reject) => {
        // Simulate asynchronous task (e.g., API call)
        setTimeout(() => {
          let containsInvalidInputs = false;
          if (unit == "" && keepOriginalUnit == false) {
            containsInvalidInputs = true;
            setContent("Unit cannot be blank. Input a value or keep original unit ")
          }
          if ((newCodeRegulationMinVal == "" || newCodeRegulationMinVal == -1) && noMinimum == false) {
            containsInvalidInputs = true;
            setContent("Minimum value cannot be blank. Input a value or select no minimum")

          }
          if (Number.isNaN(newCodeRegulationMinVal) && noMinimum == false) {
            containsInvalidInputs = true;
            setContent("Minimum value is invalid")
          }
          if ((newCodeRegulationMaxVal == "" || newCodeRegulationMaxVal == -1)  && noMaximum == false) {
            containsInvalidInputs = true;
            setContent("Maximum value cannot be blank. Input a value or select no maximum")
          }
          if (Number.isNaN(newCodeRegulationMaxVal) && noMaximum == false) {
            containsInvalidInputs = true;
            setContent("Maximum value is invalid")
          }
          resolve(containsInvalidInputs);
        }, 100);
      });
    }

    const clearModal = () => {
        setNewCodeRegulationName("");
        setNewCodeRegulationVal("");
        setNewCodeRegulationMinVal("");
        setNewCodeRegulationMaxVal("");
        setUnit("");
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
      setAttributeNameToEdit(attributeName)
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

    useEffect(() => {
      if (content != null) {
        toast.current.show({ severity: 'error', summary: 'Error', detail: content });
        setContent(null);
      }
    }, [content]);

    const columns = useMemo(() => {
        // Ensure that zoneComplianceValues is populated before calling getColumns
        if (zoneComplianceValues) {
          return getColumns();
        }
    }, [zone, zoneComplianceValues]);

    async function saveEditRow() {
      const data = { zone, attributeNameToEdit, newCodeRegulationMinVal, newCodeRegulationMaxVal, unit, noMinimum, noMaximum, keepOriginalUnit }
      console.log(data)
      const hasInvalidInputs = await containsInvalidInputs();
      if (hasInvalidInputs) {
        return;
      }
      try {
          const response = await fetch(`http://localhost:4000/editZoneCompliance/${zone}`, {
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
      setNewCodeRegulationVal("");
      setNewCodeRegulationMinVal("");
      setNewCodeRegulationMaxVal("");
      setUnit("");
      handleClose();
      setNoMaximum(false);
      setNoMinimum(false);
      setRowModified(true);
    }

    return (
        <div>
            <Dialog header="Edit values" visible={open} style={{ width: '30vw' }} onHide={() => handleClose()}>
                <div style={{width: '25%', marginRight: '2%', display:'inline'}} className="flex justify-content-center">
                    <InputText style={{marginRight: '2%', marginBottom: '2%'}} disabled placeholder={attributeNameToEdit} />
                </div>
                <div style={{width: '25%', marginRight: '2%'}} className="flex justify-content-center">

                  <InputText
                          label="Unit" 
                          group type="text"
                          placeholder='Updated Unit'
                          validate error="wrong" 
                          success="right" 
                          onChange={(e) => setUnit(e.target.value)}
                          disabled={keepOriginalUnit}
                  />
                </div>
                <div style={{marginBottom: '2%'}}className="flex align-items-center">
                  <Checkbox 
                    name='Keep Original Unit' 
                    value=''
                    id='keepOriginalUnit' 
                    label='Keep Original Unit' 
                    checked={keepOriginalUnit}
                    onChange={() => setKeepOriginalUnit(!keepOriginalUnit)}
                  />
                  <label style={{marginBottom: '0'}}htmlFor="Keep Original Unit" className="ml-2">Keep Original Unit</label>

                </div>
                <div style={{marginTop: '2%', marginBottom: '2%'}} className="flex align-items-center">
                  <InputText 
                    label="Minimum Value" 
                    group type="text"
                    placeholder="New Minimum Value"
                    validate error="wrong" 
                    success="right" 
                    onChange={(e) => setNewCodeRegulationMinVal(e.target.value)}
                    disabled={noMinimum}
                  />
                </div>
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

                <InputText 
                  label="Maximum Value" 
                  group type="text" 
                  placeholder="New Maximum Value"
                  validate error="wrong" 
                  success="right" 
                  onChange={(e) => setNewCodeRegulationMaxVal(e.target.value)}
                  disabled={noMaximum}
                />

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
            
            <h3 style={{ marginTop: '3%' }}> Edit / Delete existing development standard from {zone}</h3>

            <DataGrid
                style={{ height: '100%'}}
                rowKeyGetter={rowKeyGetter}
                columns={columns}
                rows={rows}
                rowHeight={45}
                onRowsChange={setRows}
                className="fill-grid"
                />
            <Toast ref={toast}/>
        </div>
    )
}