import React, { useState } from 'react';
import { Grid, Box, Tooltip, Avatar } from '@mui/material';
import { Brand } from '@/utils/types';

const flexStart = {
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
};

const flexCenter = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  

const AvatarStyle = {
    width: 130, 
    height: 130, 
    cursor: 'pointer'
};

interface BrandAvatarProps {
    brands: Brand[];
}

const BrandAvatar: React.FC<BrandAvatarProps> = ({ brands }) => {
  const [detailData, setDetailData] = useState({});
  const [open, setOpen] = useState(false);

  // const handleDetailModal = (brand:any) => {
  //   setDetailData(brand);
  //   setOpen(true);
  // }

  const handleCloseModal = () => {
    setOpen(false);
  }

  return (
    <Grid container spacing={2} sx={{mt: 0, ...flexStart}}>
      {brands.map((brand) => (
        <Grid item xs={6} sm={4} md={2} key={brand.id}>
          <Box sx={flexCenter}>
            <Tooltip title={brand.name}>
              <Avatar alt={brand.name} src={brand.slug} sx={AvatarStyle} />
            </Tooltip>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default BrandAvatar;
