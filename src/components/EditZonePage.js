import { useEffect, useState, useMemo } from 'react';
import { Nav } from "tabler-react";
import DataGrid, { textEditor } from 'react-data-grid';
import {createRows, rowKeyGetter, getZoneComplianceValues} from '../utils.js'
import jsPDF from "jspdf";
import "jspdf-autotable";
import Button from 'react-bootstrap/Button';
import {
    MDBRow,
    MDBCol,
    MDBInput
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
            <Button
              style={{ marginTop: '2%'}}
              type="submit"
              onClick={() => exportPDF(rows, zone)}>Export to PDF
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