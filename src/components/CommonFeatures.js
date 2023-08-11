import { cloneElement, useMemo, useEffect, useState } from 'react';
import 'react-data-grid/lib/styles.css';
import DataGrid, { textEditor } from 'react-data-grid';
import { exportToPdf } from '../exportUtils';

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

function getColumns(zone) {
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
          return <div style={{ color: 'red' }}>N</div>
        }
         return <div style={{ color: 'green' }}>Y</div>
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

function determineCompliance(regulation, project) {
  if (regulation > project) {
    <div style={{color: 'green'}}>Y</div>
  } else {
    return <div style={{color: 'red'}}>N</div>
  }
}

function createRows(zone) {
  const rows = [
    {
      category: 'Parcel Area',
      codeRegulations: complianceValues[zone]['Parcel Area'] ? complianceValues[zone]['Parcel Area'] + ' sqft' : '',
      projectSpecifications: '',
      codeCompliant: 'Y',
      remarks: ''
    },
    {
      category: 'Parcel Width',
      codeRegulations: complianceValues[zone]['Parcel Width'] ? complianceValues[zone]['Parcel Width'] + ' sqft' : '',
      projectSpecifications: '',
      codeCompliant: 'Y',
      remarks: ''
    },
    {
      category: 'Parcel Depth',
      codeRegulations: '',
      projectSpecifications: '',
      codeCompliant: 'Y',
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
      codeCompliant: 'Y',
      remarks: ''
    },
    {
      category: 'Garage Face',
      codeRegulations: complianceValues[zone]['Garage Face'] ? complianceValues[zone]['Garage Face'] + ' sqft' : '',
      projectSpecifications: '',
      codeCompliance: 'Y',
      remarks: ''
    },
    {
      category: 'Corner Vision Triangle',
      codeRegulations: complianceValues[zone]['Corner Vision Triangle'] ? complianceValues[zone]['Corner Vision Triangle'] + ' sqft' : '',
      projectSpecifications: '',
      codeCompliant: 'Y',
      remarks: ''
    },
    {
      category: 'Side / Street',
      codeRegulations: complianceValues[zone]['Side / Street'] ? complianceValues[zone]['Side / Street'] + ' sqft' : '',
      projectSpecifications: '',
      codeCompliant: 'Y',
      remarks: ''
    },
    {
      category: 'Site Coverage',
      codeRegulations: complianceValues[zone]['Site Coverage'] ? complianceValues[zone]['Site Coverage'] + ' sqft' : '',
      projectSpecifications: '',
      codeCompliance: 'Y',
      remarks: ''
    },
    {
      category: 'Floor Area Ratio',
      codeRegulations: complianceValues[zone]['Floor Area Ratio'] ? complianceValues[zone]['Floor Area Ratio'] + ' sqft' : '',
      projectSpecifications: '',
      codeCompliant: 'Y',
      remarks: ''
    }
    
  ];

  return rows;
}


export default function CommonFeatures({ zone }) {
  const [rows, setRows] = useState(createRows(zone));

  // Update rows whenever the 'zone' prop changes
  useEffect(() => {
    setRows(createRows(zone));
  }, [zone]);

  const columns = useMemo(() => getColumns(zone), [zone]);
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
      <ExportButton onExport={() => exportToPdf(gridElement, 'CommonFeatures.pdf')}>Export to PDF</ExportButton>
    </div>
    
  );
}

function ExportButton({
  onExport,
  children
}) {
  const [exporting, setExporting] = useState(false);
  return (
    <button
      style={{ marginTop: '20px'}}
      type="button"
      disabled={exporting}
      onClick={async () => {
        setExporting(true);
        await onExport();
        setExporting(false);
      }}
    >
      {exporting ? 'Exporting' : children}
    </button>
  );
}

