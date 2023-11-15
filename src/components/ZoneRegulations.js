import { useMemo, useEffect, useState } from 'react';
import 'react-data-grid/lib/styles.css';
import DataGrid, { textEditor } from 'react-data-grid';
import jsPDF from "jspdf";
import "jspdf-autotable";
import Button from 'react-bootstrap/Button';
import {rowKeyGetter, getZoneComplianceValues} from '../utils.js'

function getColumns(codeCompliant, setCodeCompliant, zoneComplianceValues) {
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
      key: 'projectSpecifications',
      name: 'Project Specifications',
      frozen: true,
      resizable: false,
      renderEditCell: textEditor
    },
    {
      key: 'codeCompliant',
      name: 'Code Compliant (Y / N)',
      frozen: true,
      resizable: false,
      renderCell(props) {
        const projectSpecifications = props.row.projectSpecifications;
        const attribute = props.row.attribute
        let codeRegulationsMin = null;
        let codeRegulationsMax = null;
        if (attribute != null && zoneComplianceValues[attribute] != null) {
          codeRegulationsMin = zoneComplianceValues[attribute]['minVal'];
          codeRegulationsMax = zoneComplianceValues[attribute]['maxVal'];
        }
        if (projectSpecifications == '' || codeRegulationsMin == undefined || codeRegulationsMax == undefined) {
          return <div></div>
        }

        if (projectSpecifications < codeRegulationsMin || projectSpecifications > codeRegulationsMax) {
          if (props.row.attribute in codeCompliant) {
            // Key already exists
            setCodeCompliant((codeCompliant) => ({
              ...codeCompliant,
              [props.row.attribute]: 'N'
            }));
          } else {
            // Key doesn't exist, add a new array with the value
            setCodeCompliant((codeCompliant) => ({
              ...codeCompliant,
              [props.row.attribute]: 'N'
            }));
          }
          return <div style={{ color: 'red' }}>N</div>
        } else {
          if (props.row.attribute in codeCompliant) {
            // Key already exists
            setCodeCompliant((codeCompliant) => ({
              ...codeCompliant,
              [props.row.attribute]: 'Y',
            }));
          } else {
            // Key doesn't exist, add a new array with the value
            setCodeCompliant((codeCompliant) => ({
              ...codeCompliant,
              [props.row.attribute]: 'Y',
            }));
          }
          return <div style={{ color: 'green' }}>Y</div>
        }
      }
    },
    {
      key: 'remarks',
      name: 'Remarks',
      frozen: true,
      resizable: false,
      renderEditCell: textEditor
    }
  ];
}

export default function ZoneRegulations({ zone, projectAddress, apn, projectNumber, projectApplicant }) {
  const [rows, setRows] = useState({});
  const [codeCompliant, setCodeCompliant] = useState({});
  const [zoneComplianceValues, setZoneComplianceValues] = useState({})

  // Update rows and clear compliance state whenever the 'zone' prop changes
  useEffect(() => {
    setCodeCompliant({});
    getZoneComplianceValues(zone, setRows, setZoneComplianceValues);
  }, [zone]);

  const columns = useMemo(() => {
    // Ensure that zoneComplianceValues is populated before calling getColumns
    if (zoneComplianceValues) {
      return getColumns(codeCompliant, setCodeCompliant, zoneComplianceValues);
    }
  }, [zone, zoneComplianceValues]);

  return (
    <div>
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
        onClick={() => exportPDF(rows, codeCompliant, zone, projectAddress, apn, projectNumber, projectApplicant)}>Export to PDF
      </Button>
    </div>
    
  );
}

const exportPDF = (rows, codeCompliant, zone, projectAddress, apn, projectNumber, projectApplicant) => {
  const unit = "pt";
  const size = "A4"; // Use A1, A2, A3 or A4
  const orientation = "landscape"; // portrait or landscape

  const marginLeft = 40;
  const doc = new jsPDF(orientation, unit, size);
  doc.setLineHeightFactor(1.5);
  doc.setFontSize(11);
  const zoneText = "Zone: " + zone;
  const projectAddressText = "Project Address: " + projectAddress;
  const apnText = "APN: " + apn;
  const projectNumberText = "Project Number: " + projectNumber;
  const projectApplicantText = "Project Applicant: " + projectApplicant; 

  const text = [zoneText, projectAddressText, apnText, projectNumberText, projectApplicantText];
  const headers = [[" ", "Code Regulations", "Project Specifications", "Code Compliant (Y/N)", "Remarks"]];

  console.log(codeCompliant)
  const data = rows.map(row => [row.attribute, row.codeRegulations, row.projectSpecifications, codeCompliant[row.attribute], row.remarks])

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
