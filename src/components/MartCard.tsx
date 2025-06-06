// MartCard.tsx - Optimized for production with better performance
import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { styled } from '@mui/material/styles';
import { useState, useCallback } from 'react';

interface MartCardProps {
  img: { url: string }[];
  onAddToCart: () => void;
  isIncludeInCart: boolean;
}

// Optimized styled components with better performance
const PinterestCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'isIncludeInCart',
})<{ isIncludeInCart?: boolean }>(({ theme, isIncludeInCart }) => ({
  width: '100%',
  background: '#e5e5e5',
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  boxShadow: 'none',
  transition: 'transform 0.2s ease-in-out',
  position: 'relative',
  cursor: 'pointer',
  // Reduce layout shift during hover
  willChange: 'transform',
  '&:hover': {
    transform: 'translateY(-2px)',
  },
  // Add subtle border when item is in cart
  ...(isIncludeInCart && {
    border: `2px solid ${theme.palette.primary.main}`,
  }),
}));

const CartIndicator = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 8,
  right: 8,
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  borderRadius: '50%',
  padding: 4,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 2,
  border: '2px solid white',
  transition: 'all 0.2s ease-in-out',
  transform: 'scale(1)',
  opacity: 1,
  // Smooth animation
  animation: 'cartIndicatorAppear 0.3s ease-in-out',
  '@keyframes cartIndicatorAppear': {
    '0%': {
      transform: 'scale(0)',
      opacity: 0,
    },
    '50%': {
      transform: 'scale(1.2)',
    },
    '100%': {
      transform: 'scale(1)',
      opacity: 1,
    },
  },
}));

// Optimized image component with lazy loading and error handling
const OptimizedImage = React.memo(({ 
  src, 
  alt, 
  onLoad 
}: { 
  src: string; 
  alt: string; 
  onLoad?: () => void;
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  if (imageError) {
    return (
      <Box
        sx={{
          width: '100%',
          height: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
          color: '#999',
        }}
      >
        ပုံမတွေ့ပါ
      </Box>
    );
  }

  return (
    <>
      {/* Placeholder while loading */}
      {!imageLoaded && (
        <Box
          sx={{
            width: '100%',
            height: 200,
            backgroundColor: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: imageLoaded ? 'absolute' : 'static',
            top: 0,
            left: 0,
            zIndex: imageLoaded ? -1 : 1,
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: 'linear-gradient(45deg, #ddd 25%, transparent 25%), linear-gradient(-45deg, #ddd 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ddd 75%), linear-gradient(-45deg, transparent 75%, #ddd 75%)',
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
              animation: 'loading 1.2s linear infinite',
            }}
          />
          <style jsx>{`
            @keyframes loading {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </Box>
      )}
      
      <CardMedia
        component="img"
        image={src}
        alt={alt}
        loading="lazy" // Native lazy loading
        onLoad={handleImageLoad}
        onError={handleImageError}
        sx={{ 
          width: '100%',
          height: 'auto',
          display: 'block',
          objectFit: 'cover',
          opacity: imageLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
        }}
      />
    </>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

const MartCard: React.FC<MartCardProps> = ({ 
  img, 
  onAddToCart, 
  isIncludeInCart 
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = useCallback(() => {
    setIsPressed(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsPressed(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsPressed(false);
  }, []);

  const handleClick = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onAddToCart();
  }, [onAddToCart]);

  const imageUrl = img && img.length > 0 ? img[0].url : '';

  return (
    <PinterestCard 
      isIncludeInCart={isIncludeInCart}
      sx={{
        transform: isPressed ? 'scale(0.98)' : 'scale(1)',
        transition: 'transform 0.1s ease-in-out',
      }}
    >
      <CardActionArea 
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        sx={{
          '&:focus': {
            outline: '2px solid',
            outlineColor: 'primary.main',
            outlineOffset: 2,
          }
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <OptimizedImage
            src={imageUrl}
            alt="Product item"
          />
        </Box>
      </CardActionArea>
      
      {/* Animated cart indicator */}
      {isIncludeInCart && (
        <CartIndicator>
          <CheckCircleIcon sx={{ fontSize: 20 }} />
        </CartIndicator>
      )}
    </PinterestCard>
  );
};

// Use React.memo with custom comparison for better performance
export default React.memo(MartCard, (prevProps, nextProps) => {
  return (
    prevProps.isIncludeInCart === nextProps.isIncludeInCart &&
    prevProps.img === nextProps.img && // Shallow comparison should be fine here
    prevProps.onAddToCart === nextProps.onAddToCart
  );
});