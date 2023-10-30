import { useEffect, useState, useMemo } from 'react';
import { Nav } from "tabler-react";
import DataGrid, { textEditor } from 'react-data-grid';
import {
    MDBRow,
    MDBCol,
    MDBInput
  } from "mdb-react-ui-kit"

import ZoneSelection from './ZoneSelection';

function getColumns(zoneComplianceValues) {
    return [
        {
          key: 'category',
          name: '',
          frozen: true,
          resizable: false,
          renderCell(props) {
            const category = props.row.category
            const rowName = zoneComplianceValues[category]['name']
            return <div>{rowName}</div>
          }
        },
        {
          key: 'codeRegulations',
          name: 'Code Regulations',
          frozen: true,
          resizable: false
        },
        {
          key: 'newValue',
          name: 'New Code Regulation',
          frozen: true,
          resizable: false,
          renderEditCell: textEditor
        }
      ];
}

function getCodeRegulations(categoryValues, unit) {
    if (categoryValues != null) {
      // if there is min and max
      if (categoryValues['min'] != null && categoryValues['max'] != Number.MAX_SAFE_INTEGER) {
        return '' + categoryValues['min'] + ' to ' + categoryValues['max'] + ' ' + (unit != null ? unit : '')
      }
      // there is only min
      else {
        return categoryValues['min'] + ' ' + (unit != null ? unit : '')     
      }
    }
    console.log("Error: no category " + categoryValues['name'] + " found")
  }

function createRows(zoneComplianceValues) {
    const rows = []
    for (const key in zoneComplianceValues) {
      if (zoneComplianceValues.hasOwnProperty(key) && key != 'zone') {
        const row = {
          category: key,
          codeRegulations: getCodeRegulations(zoneComplianceValues[key], zoneComplianceValues[key]['unit']),
          newValue: ''
        }
        rows.push(row)
      }
    }
    console.log(rows)
    return rows;
}

function rowKeyGetter(row) {
    return row.id;
}


async function getZoneComplianceValues(zone, setRows, setZoneComplianceValues) {
    try {
      const response = await fetch(`http://localhost:4000/getZoneCompliance/${zone}`)
      const callback = await response.json();
      setZoneComplianceValues(callback[0]);
      localStorage.setItem('zoneComplianceValues', JSON.stringify(callback[0]));
      setRows(createRows(callback[0]))
    } catch (err) {
      console.error(err)
    }
  }

export default function EditZonePage() {
    const [zoneComplianceValues, setZoneComplianceValues] = useState({});
    const [zone, setZone] = useState('RLD');
    const [rows, setRows] = useState({});

    useEffect(() => {
        const values = JSON.parse(localStorage.getItem('zoneComplianceValues'));
        if (values) {
            // Access and use the data
            setZoneComplianceValues(values)
            setRows(createRows(values))
        } else {
            getZoneComplianceValues(zone, setRows, setZoneComplianceValues);
        }
      }, [zone]);
    
    const columns = useMemo(() => {
        // Ensure that zoneComplianceValues is populated before calling getColumns
        if (zoneComplianceValues) {
          return getColumns(zoneComplianceValues);
        }
    }, [zone, zoneComplianceValues]);

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
        </div>
        
    )
}