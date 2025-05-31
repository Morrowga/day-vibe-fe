import * as React from 'react';

import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import Image from 'next/image';

// const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
// const payments = [
//   { name: 'Card type:', detail: 'Visa' },
//   { name: 'Card holder:', detail: 'Mr. John Smith' },
//   { name: 'Card number:', detail: 'xxxx-xxxx-xxxx-1234' },
//   { name: 'Expiry date:', detail: '04/2024' },
// ];

export default function Review({checkoutData}:any) {
  return (
    <Stack spacing={2}>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Products" secondary={checkoutData?.total_quantity + ' selected'} />
          <Typography variant="body2">{checkoutData?.total_amount + ' MMK'}</Typography>
        </ListItem>
        {/* <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Shipping" secondary="Plus taxes" />
          <Typography variant="body2">$9.99</Typography>
        </ListItem> */}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {checkoutData?.total_amount} MMK
          </Typography>
        </ListItem>
      </List>
      <Divider />
      <Stack
        direction="column"
        divider={<Divider flexItem />}
        spacing={2}
        sx={{ my: 2 }}
      >
        <div>
          <Typography variant="h5" gutterBottom>
            Shipment details
          </Typography>
          <Grid sx={{my: 3}} container>
            <Grid item lg={6} xs={12}>
              <Typography gutterBottom>{checkoutData?.name}</Typography>
              <Typography>
                {checkoutData.phone_no}
              </Typography>
              <Typography gutterBottom sx={{ color: 'text.secondary' }}>
                {[
                  checkoutData.address,
                  checkoutData.city_id,
                  checkoutData.state_id,
                ]
                  .filter(Boolean) // Filter out empty values (falsey values like '', null, undefined)
                  .join(', ')} {/* Join the remaining values with a comma */}
              </Typography>
            </Grid>
            <Grid item lg={6} xs={12} sx={{textAlign: 'center'}}>
                {checkoutData?.image && 
                  <Image src={checkoutData?.image} alt="payment-img" layout="responsive"  width={200} height={200} />
                }
            </Grid>
          </Grid>
        
        </div>
      </Stack>
    </Stack>
  );
}
