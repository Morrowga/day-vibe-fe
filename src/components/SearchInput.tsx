import React, { useState } from 'react';
import { InputAdornment, TextField, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchContents,fetchBrands } from '@/redux/slices/searchSlice';

interface SearchInputProps {
  onSearch: () => Promise<void>;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const { filterInitialValue,brandPagination,contentPagination, contentStatus } = useSelector((state: RootState) => state.search);

  const dispatch = useDispatch<AppDispatch>();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleKeyPress = async (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      // dispatch(fetchBrands({ ...filterInitialValue, q:query, take: 6, page: brandPagination.current_page }));
      dispatch(fetchContents({ ...filterInitialValue, q:query, take: 6, page: contentPagination.current_page }));

      await onSearch();
    }
  };

  return (
    <TextField
      placeholder="what are you looking for ...  "
      value={query}
      onChange={handleInputChange}
      onKeyPress={handleKeyPress}
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {contentStatus == 'loading' && <CircularProgress color="inherit" size={20} />}
          </InputAdornment>
        ),
        sx: { borderRadius: 20 },
      }}
    />
  );
};

export default SearchInput;
