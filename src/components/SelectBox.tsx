import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText, SelectChangeEvent } from '@mui/material';

interface SelectBoxProps {
    label: string;                // Label of the select box
    value: string;                // Selected value (string or a type representing value)
    onChange: (event: SelectChangeEvent) => void; // Change handler for selecting an option
    options: { value: string; label: string }[];   // Array of options with { value, label }
    error?: boolean;              // Optional flag for error state
    helperText?: string;          // Optional helper text for error message
    required?: boolean;           // Optional flag for marking the select as required
  }

const SelectBox: React.FC<SelectBoxProps> = ({
  label,           
  value,            
  onChange,        
  options,        
  error,            
  helperText,       
  required = false  
}) => {

  return (
    <FormControl fullWidth variant="outlined" size="small" error={error} required={required}>
      <Select
        value={value}
        onChange={onChange}
        autoComplete={label}
      >
        {/* Dynamically render MenuItem for each option */}
        {options?.map((option:any) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default SelectBox;
