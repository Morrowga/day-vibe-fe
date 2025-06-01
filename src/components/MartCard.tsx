// Updated MartCard.tsx component with prominent cart indicator
import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

interface MartCardProps {
  img: { url: string }[];
  onAddToCart: () => void;
  isIncludeInCart: boolean;
}

// Create a styled Card component with Pinterest-like appearance
const PinterestCard = styled(Card)(({ theme }) => ({
  width: '100%',
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 5px',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  position: 'relative', // Add this to ensure proper positioning of absolute elements
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 5px 15px',
  },
}));

// Create a styled indicator component to make it more visible
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
  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  border: '2px solid white',
  transition: 'transform 0.2s',
  transform: 'scale(1)',
  '&:hover': {
    transform: 'scale(1.1)',
  }
}));

const TextOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: theme.spacing(1.5),
  background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
  color: '#fff',
  zIndex: 1,
}));

const MartCard: React.FC<MartCardProps> = ({ img, onAddToCart, isIncludeInCart }) => {
  return (
    <PinterestCard>
      <CardActionArea onClick={onAddToCart}>
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            image={img.length > 0 ? img[0].url : ''}
            alt="item"
            sx={{ 
              width: '100%',
              height: 'auto',
              display: 'block'
            }}
          />
          
          {/* 2x2 Text Overlay */}
          <TextOverlay>
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gridTemplateRows: 'auto auto',
              gap: 0.5 
            }}>
              {/* Bottom row */}
              <Typography variant="caption" sx={{ textAlign: 'left', fontWeight: 'bold' }}>
                2.5 x 2.5
              </Typography>
            </Box>
          </TextOverlay>
        </Box>

      </CardActionArea>
      
      {isIncludeInCart && (
        <CartIndicator>
          <CheckCircleIcon sx={{ fontSize: 20 }} />
        </CartIndicator>
      )}
    </PinterestCard>
  );
};

export default MartCard;