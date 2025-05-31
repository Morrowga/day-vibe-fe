// src/components/PaymentForm.tsx
import * as React from 'react';
import { Box, Card, CardContent, FormControl, Grid, IconButton, OutlinedInput, Stack, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { CloudUpload } from '@mui/icons-material';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setImage } from '@/redux/slices/checkoutSlice';

interface PaymentFormProps {
  onFileSelect: (file: File | null) => void; // Callback to pass the file back to the parent
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onFileSelect }) => {
  const [file, setFile] = React.useState<File | null>(null);  // Store the File object locally
  const dispatch = useDispatch();
  const checkoutData = useSelector((state: RootState) => state.checkout);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
    },
    onDrop: (acceptedFiles: any) => {
      const uploadedFile = acceptedFiles[0];
      if (uploadedFile) {
        const reader = new FileReader();
        reader.onloadend = () => {
          dispatch(setImage(reader.result as string));  // Image preview
        };
        reader.readAsDataURL(uploadedFile);
        setFile(uploadedFile);
        onFileSelect(uploadedFile);  
      }
    },
  });

  return (
    <Stack spacing={{ xs: 3, sm: 6 }} useFlexGap>
      <FormControl component="fieldset" fullWidth>
        <Grid container>
          <Grid lg={6} xs={12} item>
            <Box sx={{ padding: 3 }}>
              <Typography sx={{ color: 'red' }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed provident iure molestias atque consectetur possimus sint molestiae quis, debitis alias repellat repudiandae sit distinctio quisquam eum, expedita tempora in. Fugiat?
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'start', my: 2 }}>
                <Box sx={{ cursor: 'pointer' }}>
                  <Image src="/images/wave.png" width={80} height={80} alt="wave" style={{ borderRadius: 5 }} />
                </Box>
                <Box sx={{ mx: 2, cursor: 'pointer' }}>
                  <Image src="/images/kpay.png" width={80} height={80} alt="wave" style={{ borderRadius: 5 }} />
                </Box>
              </Box>
              <Box sx={{width: '100%'}}>
               <OutlinedInput
                  id="pay_no"
                  name="pay_no"
                  type="text" 
                  placeholder="xxxxxxx"
                  required
                  size="small"
                  value={''}  
                  disabled
                />
              </Box>
            </Box>
          </Grid>
          <Grid lg={6} xs={12} sx={{ px: {lg: 0,xs: 2}}} item>
            <Card sx={{ height: { lg: '100%', xs: 130 }, width: '100%', boxShadow: 'none' }}>
              <Box
                {...getRootProps()}
                sx={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: '2px dashed #ccc',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  '&:hover': {
                    borderColor: '#888',
                  },
                }}
              >
                <input {...getInputProps()} />
                {checkoutData?.image ? (
                  <Box
                    component="img"
                    src={checkoutData?.image}
                    alt="Uploaded"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />
                ) : (
                  <IconButton
                    sx={{
                      fontSize: '50px', // Adjust size of the icon
                      color: '#ccc', // Color of the icon
                    }}
                  >
                    <CloudUpload />
                  </IconButton>
                )}
              </Box>
            </Card>
          </Grid>
        </Grid>
      </FormControl>
    </Stack>
  );
};

export default PaymentForm;
