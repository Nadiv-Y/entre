import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

const TeamSelect = ({ teams, selectedTeamId, onSelect }) => {
  return (
    <Box sx={{ minWidth: 120, mb: 3 }}>
      <FormControl fullWidth>
        <InputLabel id="team-select-label">Select Development Team</InputLabel>
        <Select
          labelId="team-select-label"
          id="team-select"
          value={selectedTeamId}
          label="Select Development Team"
          onChange={(e) => onSelect(e.target.value)}
        >
          {teams.map((team) => (
            <MenuItem key={team.id} value={team.id}>
              {team.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default TeamSelect;
