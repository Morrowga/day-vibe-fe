// src/components/ProductSlider.tsx

import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import Image from 'next/image';

const CarouselContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  overflow: 'hidden',
  position: 'relative',
});

const SlideWrapper = styled(Box)({
  display: 'flex',
  transition: 'transform 0.5s ease-in-out',
  width: '100%',
});

const Slide = styled(Box)({
  minWidth: '100%',
  height: '325px', // Adjust height as needed
  position: 'relative',
});

const Overlay = styled(Box)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  background: '#000',
  right: 0,
  bgcolor: 'rgba(0, 0, 0, 0.5)',
  color: 'white',
  p: 2,
  textAlign: 'center',
});

interface CarouselProps {
  items: Array<{ name: string; image: string }>;
  interval?: number;
}

const ProductSlider: React.FC<CarouselProps> = ({ items, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
    }, interval);

    return () => clearInterval(slideInterval);
  }, [items.length, interval]);

  return (
    <CarouselContainer>
      <SlideWrapper style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {items.map((item, index) => (
          <Slide key={index}>
            <Box sx={{ position: 'relative', height: '100%' }}>
              <Image
                src={'/images/heniken.jpg'}
                alt={item.name}
                layout="fill"
                objectFit="cover"
                priority
              />
              <Overlay>
                <Typography variant="h6">{item.name}</Typography>
              </Overlay>
            </Box>
          </Slide>
        ))}
      </SlideWrapper>
    </CarouselContainer>
  );
};

export default ProductSlider;
