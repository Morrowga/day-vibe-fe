import React from 'react';
import { Grid, Box } from '@mui/material';
import Image from 'next/image';

const HomeCover = () => {

  const images = [
    'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmI4eWs1cTZ2NTRncml5ejJtM2x2b2RzZnh3eWlyaXJoODk3dnVoMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT9DPtTwoIqLfu5qgw/giphy.webp',
    'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbjZ4aW5yMWQ0MnB3bm56YnVwaWk0NzYyMTFhZWF1ZGJmdXR1ZW4xZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3og0IS3PKTeU9B34MU/giphy.webp',
    'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2R2NGd4b3R0cWN5bWU4ZHh0bzdwOWl6dTVmNTM4MXQ5YWIzd2dsbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l4Fsy3bOORF1iu7JK/giphy.webp',
    'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXZyZ2d3ZGk0cTF1d2RoMmh2azhhMTZ0M2YzM2Fjbmlvd3JqOGZnNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xvTlWFkGDF0Q/giphy.webp'
  ];
  return (
    <Box
    sx={{
      display: 'flex',
      paddingX: {lg: 10, xs: 5},
      paddingBottom: 5,
      paddingTop: 5,
      width: '100%',
      height: '65vh', 
      overflow: 'hidden',
    }}
  >
    {images.map((image, index) => (
      <Box
        key={index}
        sx={{
          flex: 1,
          borderRadius: 8,
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100%',
          transform: 'rotate(2deg)', // Apply skewY to lean the image down
          transformOrigin: 'top left', // Makes the rotation appear from the top left corner
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', // Keeps the image in a rectangular area
          marginLeft: `-${index * 10}px`, // Slightly adjust margins to avoid any unwanted gaps
        }}
      />
    ))}
  </Box>
  );
};

export default HomeCover;
