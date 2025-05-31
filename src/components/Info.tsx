import * as React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { Badge, Box, IconButton } from '@mui/material';
import { ShoppingCartOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuantity } from '@/redux/slices/cartSlice';
import Cart from './Cart';
import { AppDispatch } from '@/redux/store';

const products = [
  {
    name: 'Professional plan',
    desc: 'Monthly subscription',
    price: '$15.00',
  },
  {
    name: 'Dedicated support',
    desc: 'Included in the Professional plan',
    price: 'Free',
  },
  {
    name: 'Hardware',
    desc: 'Devices needed for development',
    price: '$69.99',
  },
  {
    name: 'Landing page template',
    desc: 'License',
    price: '$49.99',
  },
];

interface InfoProps {
  totalPrice: string;
  totalQuantity: number;
}

export default function Info({ totalPrice,totalQuantity }: InfoProps) {
  const dispatch = useDispatch<AppDispatch>();

  const [isCartOpen, setCartOpen] = React.useState(false);

  const cartItems = useSelector((state: any) => state.cart.items);

  const toggleCart = () => setCartOpen((prev:any) => !prev);

  return (
    <React.Fragment>
      <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
        Total
      </Typography>
      <Typography variant="h4" gutterBottom>
        {totalPrice}
      </Typography>
      {/* <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
        Quantity
      </Typography>
      <Typography variant="h4" gutterBottom>
        {totalQuantity}
      </Typography> */}
      <Box sx={{ mx: 2, my: 5, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh' }}>
          <Badge badgeContent={cartItems.length} color="error">
            <ShoppingCartOutlined onClick={toggleCart} sx={{fontSize: 100, color: '#053020'}} />
          </Badge>
      </Box>
      
      <Cart isOpen={isCartOpen} updateInfo={true} onClose={toggleCart} cartItems={cartItems} updateCartItem={(cart_id, quantity) => dispatch(updateQuantity({ cart_id, quantity }))} />
      {/* <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText
              sx={{ mr: 2 }}
              primary={product.name}
              secondary={product.desc}
            />
            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
              {product.price}
            </Typography>
          </ListItem>
        ))}
      </List> */}
    </React.Fragment>
  );
}
