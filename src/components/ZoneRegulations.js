import { cloneElement, useMemo, useEffect, useState } from 'react';
import 'react-data-grid/lib/styles.css';
import DataGrid, { textEditor } from 'react-data-grid';
import jsPDF from "jspdf";
import "jspdf-autotable";

const complianceValues =
    {
      'RLD': {
        'Parcel Area': 5000,
        'Parcel Width': 50,
        'Density / Intensity' : 12,
        'Living Area': 10,
        'Garage Face': 23,
        'Corner Vision Triangle': 12,
        'Side / Street': 5,
        'Site Coverage': 50,
        'Floor Area Ratio': .55
      },
      'RMD-1': {
        'Parcel Area': 5000,
        'Parcel Width': 50,
        'Parcel Depth': 100,
        'Density / Intensity' : 15,
        'Living Area': 20,
        'Corner Vision Triangle': 12,
        'Side / Street': 10,
        'Site Coverage': 60,
        'Floor Area Ratio': .65
      }
    }

function getColumns(codeCompliant, setCodeCompliant, zone) {
  return [
    {
      key: 'category',
      name: '',
      frozen: true,
      resizable: false
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
        const codeRegulations = complianceValues[zone][props.row.category];
        const projectSpecifications = props.row.projectSpecifications;
        if (projectSpecifications == '' || codeRegulations == undefined) {
          return <div></div>
        }
        if (projectSpecifications > codeRegulations) {
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

function createRows(zone) {
  const rows = [
    {
      category: 'Parcel Area',
      codeRegulations: complianceValues[zone]['Parcel Area'] ? complianceValues[zone]['Parcel Area'] + ' sqft' : '',
      projectSpecifications: '',
      codeCompliant: '',
      remarks: ''
    },
    {
      category: 'Parcel Width',
      codeRegulations: complianceValues[zone]['Parcel Width'] ? complianceValues[zone]['Parcel Width'] + ' sqft' : '',
      projectSpecifications: '',
      codeCompliant: '',
      remarks: ''
    },
    {
      category: 'Parcel Depth',
      codeRegulations: '',
      projectSpecifications: '',
      codeCompliant: '',
      remarks: ''
    },
    {
      category: 'Density / Intensity',
      codeRegulations: complianceValues[zone]['Density / Intensity'] ? complianceValues[zone]['Density / Intensity'] + ' sqft' : '',
      projectSpecifications: '',
      codeCompliant: '',
      remarks: ''
    },
    {
      category: 'Setbacks'
    },
    {
      category: 'Living Area',
      codeRegulations: complianceValues[zone]['Living Area'] ? complianceValues[zone]['Living Area'] + ' sqft' : '',
      projectSpecifications: '',
      codeCompliant: '',
      remarks: ''
    },
    {
      category: 'Garage Face',
      codeRegulations: complianceValues[zone]['Garage Face'] ? complianceValues[zone]['Garage Face'] + ' sqft' : '',
      projectSpecifications: '',
      codeCompliant: '',
      remarks: ''
    },
    {
      category: 'Corner Vision Triangle',
      codeRegulations: complianceValues[zone]['Corner Vision Triangle'] ? complianceValues[zone]['Corner Vision Triangle'] + ' sqft' : '',
      projectSpecifications: '',
      codeCompliant: '',
      remarks: ''
    },
    {
      category: 'Side / Street',
      codeRegulations: complianceValues[zone]['Side / Street'] ? complianceValues[zone]['Side / Street'] + ' sqft' : '',
      projectSpecifications: '',
      codeCompliant: '',
      remarks: ''
    },
    {
      category: 'Site Coverage',
      codeRegulations: complianceValues[zone]['Site Coverage'] ? complianceValues[zone]['Site Coverage'] + ' sqft' : '',
      projectSpecifications: '',
      codeCompliant: '',
      remarks: ''
    },
    {
      category: 'Floor Area Ratio',
      codeRegulations: complianceValues[zone]['Floor Area Ratio'] ? complianceValues[zone]['Floor Area Ratio'] + ' sqft' : '',
      projectSpecifications: '',
      codeCompliant: '',
      remarks: ''
    }
    
  ];

  return rows;
}


export default function ZoneRegulations({ zone, projectAddress, apn, projectNumber, projectApplicant }) {
  const [rows, setRows] = useState(createRows(zone));
  const [codeCompliant, setCodeCompliant] = useState({});

  // Update rows whenever the 'zone' prop changes
  useEffect(() => {
    setRows(createRows(zone));
  }, [zone]);

  const columns = useMemo(() => getColumns(codeCompliant, setCodeCompliant, zone), [zone]);
  const gridElement = (
    <DataGrid
        rowKeyGetter={rowKeyGetter}
        columns={columns}
        rows={rows}
        onRowsChange={setRows}
        className="fill-grid"
      />
  )
  // const columns = useMemo(() => getColumns(zone), []);
  return (
    <div>
      {gridElement}
      <button onClick={() => exportPDF(rows, codeCompliant, zone, projectAddress, apn, projectNumber, projectApplicant)}>Export to PDF</button>
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

  const data = rows.map(row => [row.category, row.codeRegulations, row.projectSpecifications, codeCompliant[row.category], row.remarks])

  let content = {
    startY: 130,
    head: headers,  
    body: data
  };

  doc.text(text, marginLeft, 40);
  doc.autoTable(content);
  const fileName = projectNumber + "_report.pdf"
  doc.save(fileName)
}
