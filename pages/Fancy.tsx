import MartCard from '@/components/MartCard';
import { Badge, Box, Container, Grid, IconButton, TextField } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState } from 'react';
import Cart from '@/components/Cart';
import { addItem, removeItem, updateQuantity } from '@/redux/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { RootState } from '@reduxjs/toolkit/query';
import ProductEssential from '@/components/ProductEssential';

const Fancy = () => {
    return (
        <Box>
           <ProductEssential category='Fancy' />
        </Box>
    );
};

export default Fancy;
