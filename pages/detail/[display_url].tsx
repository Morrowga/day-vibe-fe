/* eslint-disable @next/next/no-img-element */
// pages/detail/[display_url].tsx

import { GetServerSideProps, NextPage } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { fetchDetail } from '@/redux/slices/detailSlice';
import { useEffect } from 'react';
import { Avatar, Box, Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { format, parseISO } from 'date-fns';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import ProductSlider from '@/components/ImageSlider';

interface DetailPageProps {
  display_url: string;
}

const slideStyle = {
   height: '100%',
   display: 'flex', 
   alignItems: 'center', 
   justifyContent: 'center',
   boxShadow: 'none', 
   background: 'transparent',
   width: '100%'
}

const ContentDetailPage: NextPage<DetailPageProps> = ({ display_url }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.detail);

  useEffect(() => {
    dispatch(fetchDetail(display_url));
  }, [dispatch, display_url]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  console.log(data)

  const AvatarStyle = {
    width: 150,
    height: 150,
    cursor: 'pointer'
  };

  return (
    <Container sx={{ my: 0 }}>
      <Box>
        <Grid container spacing={4}>
          <Grid item lg={8}>
            <Typography sx={{ fontSize: 30, lineHeight: 2 }}>{data.title}</Typography>
            <Typography sx={{ fontSize: 15, opacity: 0.5, lineHeight: 2, pt: 1 }}>
              {data.created_at && format(parseISO(data.created_at), 'MMMM d, yyyy h:mm a')}
            </Typography>
            <Box sx={{ my: 4 }}>
              <img src="/images/bagan.jpg" alt={data.title} width={'100%'} height={450} />
            </Box>
          </Grid>
          <Grid item lg={4} sx={{display: {lg: 'block', xs: 'none', sm: 'block'}}}>
            <Card sx={data.brand?.products?.length == 0 ? slideStyle : {boxShadow: 'none', width: '100%', background: 'transparent'}}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Avatar alt={data.brand?.name} src={data.brand?.slug} sx={AvatarStyle} />
                  </Box>
                  <Typography sx={{ fontSize: 25, m: 2, textAlign: 'center' }}>{data.brand?.name}</Typography>
                </CardContent>
            </Card>
            {data.brand?.products?.length > 0 && <ProductSlider items={data.brand?.products} />}
          </Grid>
        </Grid>
        <Grid container sx={{textAlign: 'left', mb: 5}}>
          <Typography>
            {data.content}
          </Typography>
        </Grid>
      </Box>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { display_url } = context.params as { display_url: string };

  return {
    props: {
      display_url,
    },
  };
};

export default ContentDetailPage;
