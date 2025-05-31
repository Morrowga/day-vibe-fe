import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';

interface Item {
  id: string;
  name: string;
}

interface SelectDialogProps {
  open: boolean;
  onClose: () => void;
  onSelect: (item: Item) => void; 
  label: string;
  items: Item[];
}

const SelectDialog: React.FC<SelectDialogProps> = ({ open, onClose, onSelect, items, label }) => {
  const [selectedSize, setSelectedSize] = useState<string>(items[0]?.id.toString() || '');  

  const handleSizeChange = (event: SelectChangeEvent) => {
    setSelectedSize(event.target.value);  
  };

  const handleSave = () => {
    const selectedItem = items.find(item => item.id === selectedSize); 
    if (selectedItem) {
      onSelect(selectedItem); 
    }
    onClose();  
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Select {label}</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <Select
            labelId="select-size-label"
            value={selectedSize}
            onChange={handleSizeChange} 
            fullWidth
          >
            {items.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SelectDialog;
