import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid2';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';
import SelectBox from './SelectBox';
import { InputAdornment, SelectChangeEvent } from '@mui/material';

// Import actions from your redux slice
import { setName, setPhoneNo, setAddress, setStateId, setCityId } from '../redux/slices/checkoutSlice';
import { RootState } from '@/redux/store';

interface Option {
  value: string;
  label: string;
}

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function AddressForm() {
  const dispatch = useDispatch();

  const checkoutData = useSelector((state: RootState) => state.checkout);

  const stateOptions: Option[] = [
    { value: 'new_york', label: 'New York' },
    { value: 'california', label: 'California' },
    { value: 'texas', label: 'Texas' },
  ];

  const cityOptions: { [key: string]: Option[] } = {
    new_york: [
      { value: 'new_york_city', label: 'New York City' },
      { value: 'buffalo', label: 'Buffalo' },
    ],
    california: [
      { value: 'los_angeles', label: 'Los Angeles' },
      { value: 'san_francisco', label: 'San Francisco' },
    ],
    texas: [
      { value: 'houston', label: 'Houston' },
      { value: 'austin', label: 'Austin' },
    ],
  };

  const [selectedCity, setSelectedCity] = React.useState<string>('');
  const [selectedState, setSelectedState] = React.useState<string>('');
  const [error, setError] = React.useState<boolean>(false);

  const handleChange = (event: SelectChangeEvent) => {
    const cityId = event.target.value;
    
    dispatch(setCityId(cityId || null));
    setSelectedCity(cityId);
    setError(false);
  };
  
  const handleChangeState = (event: SelectChangeEvent) => {
    const stateId = event.target.value;
    
    dispatch(setStateId(stateId || null)); 
    setSelectedState(stateId);
    setError(false);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setName(event.target.value)); 
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPhoneNo(event.target.value));
  };

  // Handle change for address input
  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setAddress(event.target.value));  
  };

  React.useEffect(() => {
    setSelectedCity(checkoutData.city_id || ''); 
    setSelectedState(checkoutData.state_id || ''); 
  }, [checkoutData]); 

  return (
    <Grid container spacing={3}>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="first-name" required>
          Name
        </FormLabel>
        <OutlinedInput
          id="first-name"
          name="first-name"
          type="name"
          placeholder="John"
          autoComplete="first name"
          required
          size="small"
          value={checkoutData.name} 
          onChange={handleNameChange}
        />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="phone" required>
          Phone No.
        </FormLabel>
        <OutlinedInput
          id="phone"
          name="phone"
          type="number" // Use text instead of number
          placeholder="Enter your phone number"
          autoComplete="tel"
          required
          size="small"
          value={checkoutData.phone_no}  
          onChange={handlePhoneChange}
        />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="address1" required>
          Address line 1
        </FormLabel>
        <OutlinedInput
          id="address1"
          name="address1"
          type="text"
          placeholder="Street name and number"
          autoComplete="shipping address-line1"
          required
          size="small"
          value={checkoutData.address}  
          onChange={handleAddressChange}
        />
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="state" required>
          State
        </FormLabel>
        <SelectBox
          label="State"
          value={selectedState || checkoutData.state_id || ''}  
          onChange={handleChangeState}
          options={stateOptions}
          error={error}
          helperText={error ? 'State is required' : ''}
          required
        />
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="city" required>
          City
        </FormLabel>
        <SelectBox
          label="City"
          value={selectedCity || checkoutData.city_id || ''} 
          onChange={handleChange}
          options={selectedState ? cityOptions[selectedState] : []}
          required={!!selectedState}
        />
      </FormGrid>
    </Grid>
  );
}
