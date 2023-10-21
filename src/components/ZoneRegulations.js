import { useMemo, useEffect, useState } from 'react';
import 'react-data-grid/lib/styles.css';
import DataGrid, { textEditor } from 'react-data-grid';
import jsPDF from "jspdf";
import "jspdf-autotable";
import Button from 'react-bootstrap/Button';

// const complianceValues =
//     {
//       'RLD': {
//         'Parcel Area': {
//           'min': 5000,
//           'max': Number.MAX_SAFE_INTEGER
//         },
//         'Parcel Width': {
//           'min': 50,
//           'max': Number.MAX_SAFE_INTEGER
//         },
//         'Density / Intensity' : {
//           'min': 0,
//           'max': 12
//         },
//         'Living Area': {
//           'min': 10,
//           'max': Number.MAX_SAFE_INTEGER
//         },
//         'Garage Face': {
//           'min': 23,
//           'max': Number.MAX_SAFE_INTEGER
//         },
//         'Corner Vision Triangle': {
//           'min': 12,
//           'max': Number.MAX_SAFE_INTEGER
//         },
//         'Side/Street Side': {
//           'min': 5,
//           'max': Number.MAX_SAFE_INTEGER
//         },
//         'Site Coverage': {
//           'min': 50,
//           'max': Number.MAX_SAFE_INTEGER
//         },
//         'Floor Area Ratio': {
//           'min': .55,
//           'max': Number.MAX_SAFE_INTEGER
//         },
//       },
//       'RMD-1': {
//         'Parcel Area': {
//           'min': 5000,
//           'max': Number.MAX_SAFE_INTEGER
//         },
//         'Parcel Width': {
//           'min': 50,
//           'max': Number.MAX_SAFE_INTEGER
//         },
//         'Parcel Depth': {
//           'min': 100,
//           'max': Number.MAX_SAFE_INTEGER
//         },
//         'Density / Intensity' : {
//           'min': 12,
//           'max': 15
//         },
//         'Living Area': {
//           'min': 20,
//           'max': Number.MAX_SAFE_INTEGER
//         },
//         'Corner Vision Triangle': {
//           'min': 12,
//           'max': Number.MAX_SAFE_INTEGER
//         },
//         'Side/Street Side': {
//           'min': 10,
//           'max': Number.MAX_SAFE_INTEGER
//         },
//         'Site Coverage': {
//           'min': 60,
//           'max': Number.MAX_SAFE_INTEGER
//         },
//         'Floor Area Ratio': {
//           'min': .65,
//           'max': Number.MAX_SAFE_INTEGER
//         },
//       },
//       'RMD-2': {
//         'Parcel Area': {
//           'min': 5000,
//           'max': Number.MAX_SAFE_INTEGER
//         },
//         'Parcel Width': {
//           'min': 50,
//           'max': Number.MAX_SAFE_INTEGER
//         },
//         'Parcel Depth': {
//           'min': 100,
//           'max': Number.MAX_SAFE_INTEGER
//         },
//         'Density / Intensity' : {
//           'min': 12,
//           'max': 22
//         },
//         'Living Area': {
//           'min': 20,
//           'max': Number.MAX_SAFE_INTEGER
//         },
//         'Corner Vision Triangle': {
//           'min': 12,
//           'max': Number.MAX_SAFE_INTEGER
//         },
//         'Side/Street Side': {
//           'min': 10,
//           'max': Number.MAX_SAFE_INTEGER
//         },
//         'Site Coverage': {
//           'min': 60,
//           'max': Number.MAX_SAFE_INTEGER
//         },
//         'Floor Area Ratio': {
//           'min': .65,
//           'max': Number.MAX_SAFE_INTEGER
//         },
//       },
//       'R-HD': {
//         'Parcel Area': {
//           'min': 12000,
//           'max': Number.MAX_SAFE_INTEGER
//         },
//         'Parcel Width': {
//           'min': 50,
//           'max': Number.MAX_SAFE_INTEGER
//         },
//         'Parcel Depth': {
//           'min': 240,
//           'max': Number.MAX_SAFE_INTEGER
//         },
//         'Density / Intensity' : {
//           'min': 22,
//           'max': 43
//         },
//         'Living Area': {
//           'min': 15,
//           'max': Number.MAX_SAFE_INTEGER
//         },
//         'Corner Vision Triangle': {
//           'min': 12,
//           'max': Number.MAX_SAFE_INTEGER
//         },
//         'Side/Street Side': {
//           'min': 15,
//           'max': Number.MAX_SAFE_INTEGER
//         },
//         'Site Coverage': {
//           'min': 70,
//           'max': Number.MAX_SAFE_INTEGER
//         }
//       },
//     }

function getColumns(codeCompliant, setCodeCompliant, zoneComplianceValues) {
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
        const category = props.row.category
        let codeRegulationsMin = null;
        let codeRegulationsMax = null;
        if (zoneComplianceValues != null && category != null) {
          codeRegulationsMin = zoneComplianceValues[category]['min'];
          codeRegulationsMax = zoneComplianceValues[category]['max'];
        }
        if (projectSpecifications == '' || codeRegulationsMin == undefined || codeRegulationsMax == undefined) {
          return <div></div>
        }

        if (projectSpecifications < codeRegulationsMin || projectSpecifications > codeRegulationsMax) {
          if (props.row.category in codeCompliant) {
            // Key already exists
            setCodeCompliant((codeCompliant) => ({
              ...codeCompliant,
              [props.row.category]: 'N'
            }));
          } else {
            // Key doesn't exist, add a new array with the value
            setCodeCompliant((codeCompliant) => ({
              ...codeCompliant,
              [props.row.category]: 'N'
            }));
          }
          return <div style={{ color: 'red' }}>N</div>
        } else {
          if (props.row.category in codeCompliant) {
            // Key already exists
            setCodeCompliant((codeCompliant) => ({
              ...codeCompliant,
              [props.row.category]: 'Y',
            }));
          } else {
            // Key doesn't exist, add a new array with the value
            setCodeCompliant((codeCompliant) => ({
              ...codeCompliant,
              [props.row.category]: 'Y',
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

function rowKeyGetter(row) {
  return row.id;
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
        projectSpecifications: '',
        codeCompliant: '',
        remarks: ''
      }
      rows.push(row)
    }
  }
  return rows;
}

async function getZoneComplianceValues(zone, setRows, setZoneComplianceValues) {
  try {
    const response = await fetch(`http://localhost:4000/getZoneCompliance/${zone}`)
    const zoneComplianceValues = await response.json();
    setZoneComplianceValues(zoneComplianceValues[0])
    setRows(createRows(zoneComplianceValues[0]))
  } catch (err) {
    console.error(err)
  }
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
  const data = rows.map(row => [row.category, row.codeRegulations, row.projectSpecifications, codeCompliant[row.category], row.remarks])

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
