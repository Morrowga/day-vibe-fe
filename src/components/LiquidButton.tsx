import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { css } from '@emotion/react';
import { useThemeContext } from '@/app/ThemeContext';

interface LiquidButtonProps {
    text: string;
    onClick?: () => void; // The onClick handler prop (optional)
}

const LiquidButton: React.FC<LiquidButtonProps> = ({ text, onClick }) => {

  const {mode} = useThemeContext();
  
  return (
     <>
      <Button
        onClick={onClick} 
        sx={{
          position: 'relative',
          padding: '20px 50px',
          mx: 1,
          border: '1px solid rgb(0,0,0,0.1)',
          display: 'block',
          textDecoration: 'none',
          textTransform: 'uppercase',
          width: '200px',
          overflow: 'hidden',
          borderRadius: '30px',
          color: '#fff',
          fontFamily: 'Arial',
          fontSize: '20px',
          letterSpacing: '8px',
          zIndex: 1,
          '& span': {
            zIndex: 1,
          },
          '&:hover .liquid': {
            top: '-120px',
          },
        }}
        disableRipple
      >
        <Typography sx={{ color: '#000', position: 'relative', zIndex: 2 }}>
            {text}
        </Typography>
        <Box
          className="liquid"
          sx={{
            position: 'absolute',
            top: '-80px',
            left: '0',
            width: '200px',
            height: '200px',
            backgroundColor: '#efdecd',
            boxShadow: 'inset 0 0 50px rgba(0, 0, 0, .5)',
            transition: '0.5s',
            '&::after, &::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '50%',
              width: '200%',
              height: '200%',
              transform: 'translate(-30%, -75%)',
              backgroundColor: '#000',
            },
            '&::before': {
              borderRadius: '40%',
              backgroundColor: '#fff',
              animation: 'animate 5s linear infinite',
            },
            '&::after': {
              borderRadius: '35%',
              backgroundColor: '#fff',
              animation: 'animate 10s linear infinite',
            },
          }}
        />
      </Button>

      <style>
        {`
          @keyframes animate {
            0% {
              transform: translate(-50%, -75%) rotate(0deg);
            }
            100% {
              transform: translate(-50%, -75%) rotate(360deg);
            }
          }
        `}
      </style>
    </>
  );
};

export default LiquidButton;
