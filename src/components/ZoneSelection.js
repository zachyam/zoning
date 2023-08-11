import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function ZoneSelection({ zone, setZone}) {
  const handleChange = (event) => {
    setZone(event.target.value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '20px', marginBottom: '20px'}}>
      <FormControl style={{ width: '10%', marginTop: '20px', marginBottom: '20px'}}>
          <InputLabel id="demo-simple-select-label">Select Zoning</InputLabel>
          <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={zone}
              label="Zone"
              onChange={handleChange}
          >
              <MenuItem value={"RLD"}>Zone R-LD</MenuItem>
              <MenuItem value={"RMD-1"}>Zone R-MD-1</MenuItem>
              <MenuItem disabled="true" value={"R-HD"}>Zone R-MD-2 (Stay tuned!)</MenuItem>
              <MenuItem disabled="true" value={"Zone UHD"}>Zone R-UHD (Stay tuned!)</MenuItem>
          </Select>
      </FormControl>
      <p style={{ fontSize: '16px', textIndent: '4px' }}>{zone} Zoning Regulations</p>
    </div>
      

  );
}
