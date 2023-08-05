import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function ZoneSelection() {
  const [zone, setZone] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setZone(event.target.value);
  };

  return (
      <FormControl style={{ width: '10%', marginLeft: '100px', marginTop: '50px'}}>
          <InputLabel id="demo-simple-select-label">Select Zoning</InputLabel>
          <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={zone}
              label="Zone"
              onChange={handleChange}
          >
              <MenuItem value={"Zone A"}>Zone A</MenuItem>
              <MenuItem value={"Zone B"}>Zone B</MenuItem>
              <MenuItem disabled="true" value={"Zone C"}>Zone C (Upgrade to premium)</MenuItem>
              <MenuItem disabled="true" value={"Zone C"}>Zone D (Upgrade to premium)</MenuItem>
              <MenuItem disabled="true" value={"Zone C"}>Zone E (Upgrade to premium)</MenuItem>
          </Select>
      </FormControl>
  );
}
