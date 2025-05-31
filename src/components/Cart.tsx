import React, { useState, useEffect } from 'react';
import {
  Box,
  Drawer,
  Typography,
  IconButton,
  Divider,
  List,
  ListItem,
  Badge,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardMedia,
  CardContent,
  Alert,
} from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { removeItem, updateItemSize } from '@/redux/slices/cartSlice';
import SelectDialog from './SelectDialog';
import { useRouter } from 'next/router';

interface Size {
  name: string;
  price: number;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  cart_id: string;
  first_image: string;
  has_size: boolean;
  actual_price: number;
  size?: string | null;
  sizes?: Size[];
  category: Category;
  quantity: number;
}

interface Category {
  name_mm: string;
  has_size: boolean;
  sizes: Size[];
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  updateCartItem: (cart_id: string, quantity: number) => void;
  updateInfo: Boolean
}   

const Cart: React.FC<CartDrawerProps> = ({ isOpen, onClose, cartItems, updateCartItem, updateInfo}) => {

  const router = useRouter();
  
  const handleNavigate = (targetUrl: string) => {
      router.push(targetUrl);
  };

  const dispatch = useDispatch<AppDispatch>();

  const [isSelectOpen, setSelectOpen] = useState(false);
  const [quantityError, setQuantityError] = useState<string>('');

  const {totalQuantity, totalAmount} = useSelector((state: any) => state.cart);

  const [selectedCartItem, setSelectedCartItem] = useState<any>([]);

  const [availableSizes, setAvailableSizes] = useState<any>([]);

  // Add this useEffect to handle initial size setting
  useEffect(() => {
    cartItems.forEach(product => {
      if (product.category.has_size && !product.size && product.category.sizes?.length) {
        dispatch(updateItemSize({ 
          cart_id: product.cart_id, 
          size: product.category.sizes[0]?.name 
        }));
      }
    });
  }, [cartItems]);

  // Check quantity and update error message
  useEffect(() => {
    if (cartItems.length === 0) {
      setQuantityError('');
    } else if (totalQuantity < 10) {
      setQuantityError(`အရေအတွက် ${10 - totalQuantity} ခု ထပ်ထည့်ရန် လိုအပ်ပါသည်။`);
    } else {
      setQuantityError('');
    }
  }, [totalQuantity, cartItems.length]);

  const openSelectBox = (item: CartItem) => {
    if (item.category.sizes) {
      setAvailableSizes(item.category.sizes);
      setSelectOpen(true);
      setSelectedCartItem(item);
    }
  }

  const onSelect = (selectedSize:any) => {
    dispatch(updateItemSize({ cart_id: selectedCartItem.cart_id, size: selectedSize?.name }));
  }

  const getSizeName = (size: string | null | undefined, product: CartItem): string => {
    if (!product.has_size) {
      return '';
    }

    if (!size) {
      console.log(product.category.sizes);
      return product.category.sizes[0]?.name || '';
    }

    return size;
  };

  const getTotalPrice = (item: CartItem): number => {
    return item.actual_price * item.quantity;
  };

  const handleProceed = () => {
    if (totalQuantity !== 10) {
      // Optional: You can add additional feedback here like a toast or alert
      return;
    }

    if (updateInfo) {
      onClose();
    } else {
      handleNavigate('/invoice');
    }
  };

  const isQuantityValid = totalQuantity === 10;

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': { width: { xs: '100%', sm: '500px' }, overflow: 'auto' },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <Typography variant="h6">စျေးခြင်းတောင်း</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box sx={{padding: 1.5, overflowY: 'scroll'}}>
        {cartItems.length === 0 ? (
          // If cartItems is empty, display the empty cart message
          <Typography variant="h6" color="text.secondary" align="center">
            ရွေးထားသော ပစ္စည်း မရှိသေးပါ။
          </Typography>
        ) : (
          // If cartItems has items, render the cart items
          cartItems.map((item) => (
            <Card key={item.cart_id} sx={{ display: 'flex', flexDirection: 'row', p: 2,my: 1, position: 'relative', boxShadow: 'none', border: '1px solid #000', borderRadius: 2 }}>
              <IconButton
                onClick={() => dispatch(removeItem(item.cart_id))}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  color: 'rgba(0, 0, 0, 0.54)',
                }}
              >
                <RemoveCircleIcon sx={{color: 'red'}} />
              </IconButton>
              <CardMedia
                component="div"
                sx={{ width: 100, height: 100, overflow: 'hidden', borderRadius: 1 }}
              >
                <Box 
                  component={'img'}
                  src={item.first_image}
                  alt={item.first_image} 
                  width={50} 
                  height={50} 
                  style={{
                    width: '100%',
                    height: '100px',
                    objectFit: 'cover',
                    borderRadius: '8px'
                }}
                />
              </CardMedia>
              <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, px: 2 }}>
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    အရေအတွက်: {item.quantity} ခု
                  </Typography>
                  {item.has_size && (
                    <Typography variant="body2" color="text.secondary" sx={{ py: 1 }}>
                      <strong>{getSizeName(item.size, item)}</strong>
                      <span
                        style={{
                          cursor: 'pointer',
                          marginLeft: 5,
                          marginTop: 1,
                          color: 'blue',
                        }}
                        onClick={() => openSelectBox(item)}
                      >
                        အရွယ်အစား ချိန်းမည်။
                      </span>
                    </Typography>
                  )}
                </CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => updateCartItem(item.cart_id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography variant="body2" color="text.secondary" sx={{mt: 0.8}}>
                      {getTotalPrice(item).toFixed(2)}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => updateCartItem(item.cart_id, item.quantity + 1)}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                  <Typography sx={{ textAlign: 'right' }} variant="body1">
                    {item.actual_price} ကျပ်
                  </Typography>
                </Box>
              </Box>
            </Card>
          ))
        )}
      </Box>

      <Divider sx={{m: 4}} />

      <Box sx={{ p: 2 }}>
        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
          <Box>
            <Typography variant="h6" sx={{ mb: 1, fontSize: 15 }}>
              အရေအတွက်: 
            </Typography>
            <Typography variant="h6" sx={{ mb: 1,fontSize: 15 }}>
              ကျသင့်ငွေ: 
            </Typography>
          </Box>
          <Box sx={{textAlign: 'right', my: 2}}>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 1, 
                fontSize: 15,
                color: totalQuantity === 10 ? 'success.main' : 'error.main',
                fontWeight: totalQuantity === 10 ? 'bold' : 'normal'
              }}
            >
              {totalQuantity} ခု
            </Typography>
            <Typography variant="h6" sx={{ mb: 1, fontSize: 15 }}>
              {totalAmount.toFixed(2)} ကျပ်
            </Typography>
          </Box>
        </Box>

        {/* Error message for quantity validation */}
        {quantityError && (
          <Alert 
            severity="warning" 
            sx={{ 
              mb: 2, 
              fontSize: '14px',
              '& .MuiAlert-message': {
                padding: '4px 0'
              }
            }}
          >
            {quantityError}
          </Alert>
        )}

        {cartItems.length > 0 && !updateInfo && (
          <Button
            variant="contained"
            color="primary"
            sx={{ 
              borderRadius: 10, 
              my: 1, 
              py: 2,
              opacity: isQuantityValid ? 1 : 0.6
            }}
            fullWidth
            disabled={!isQuantityValid}
            onClick={handleProceed}
          >
            အော်ဒါတင်မည်။
          </Button>
        )}

        {cartItems.length > 0 && updateInfo && (
          <Button
            variant="contained"
            color="primary"
            sx={{ 
              borderRadius: 10, 
              my: 1, 
              py: 2,
              opacity: isQuantityValid ? 1 : 0.6
            }}
            fullWidth
            disabled={!isQuantityValid}
            onClick={handleProceed}
          >
            အတည်ပြုမည်။
          </Button>
        )}
      </Box>
      <SelectDialog 
        open={isSelectOpen} 
        onClose={() => setSelectOpen(false)} 
        onSelect={onSelect} 
        items={availableSizes} 
        label="Size" 
      />
    </Drawer>
  );
};

export default Cart;