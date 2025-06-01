// ProductEssential.tsx - Using CSS columns for a true Pinterest layout with infinite scroll
import MartCard from '@/components/MartCard';
import { Badge, Box, Container, IconButton, TextField, Typography, InputAdornment, CircularProgress } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState, useRef, useCallback } from 'react';
import Cart from '@/components/Cart';
import { addItem, updateQuantity, removeItem } from '@/redux/slices/cartSlice'; // Added removeItem
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchProducts, resetProducts } from '@/redux/slices/productSlice';
import LoadingOverlay from './LoadingOverlay';

const ProductEssential = ({ category }: any) => {
    const [isCartOpen, setCartOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const cartItems = useSelector((state: any) => state.cart.items);
    const { 
        data: productsResponse, 
        status, 
        allProducts, 
        currentPage,
        hasMore,
        loadingMore
    } = useSelector((state: RootState) => state.product);
    
    // Reference to observe for infinite scroll
    const observerRef = useRef<IntersectionObserver | null>(null);
    const loadingRef = useRef<HTMLDivElement>(null);

    const toggleCart = () => setCartOpen((prev) => !prev);

    const generateCartId = (productId: number): string => {
        return `${productId}_${Date.now()}`;
    };

    // Updated function to toggle cart item (add/remove)
    const toggleCartItem = (item: any) => {
        const isInCart = cartItems.some((cartItem: any) => cartItem.id === item.id);
        
        if (isInCart) {
            // Remove from cart - find the cart item and remove it
            const cartItem = cartItems.find((cartItem: any) => cartItem.id === item.id);
            if (cartItem) {
                dispatch(removeItem(cartItem.cart_id));
            }
        } else {
            // Add to cart
            const cartId = generateCartId(item.id);
            dispatch(addItem({
                ...item,
                cart_id: cartId,
                quantity: 1,
                size: null
            }));
        }
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleSearch = () => {
        // Reset products when performing a new search
        dispatch(resetProducts());
        dispatch(fetchProducts({ category, q: searchQuery, page: 1 }));
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    // Function to load more products - FIXED
    const loadMoreProducts = useCallback(() => {
        console.log('Load more triggered:', { hasMore, loadingMore, currentPage });
        
        if (hasMore && !loadingMore) {
            console.log('Fetching next page:', currentPage + 1);
            
            // Change here - we need to match the exact parameter format checked in the reducer
            dispatch(fetchProducts({ 
                category, 
                q: searchQuery, 
                page: currentPage + 1,
                isLoadingMore: true  // This is correct, keep it
            }));
        }
    }, [dispatch, category, searchQuery, currentPage, hasMore, loadingMore]);

    // Setup intersection observer for infinite scroll - FIXED
    useEffect(() => {
        // Wait a bit to ensure the DOM is fully rendered
        const timer = setTimeout(() => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
            
            if (loadingRef.current) {
                console.log('Setting up observer with loading ref:', loadingRef.current);
                
                const options = {
                    root: null,
                    rootMargin: '0px', // Increase even more
                    threshold: 0.1
                };

                observerRef.current = new IntersectionObserver(entries => {
                    console.log('Observer triggered, entries:', entries.map(e => e.isIntersecting));
                    if (entries[0].isIntersecting) {
                        console.log('Loading indicator is visible');
                        loadMoreProducts();
                    }
                }, options);

                observerRef.current.observe(loadingRef.current);
                console.log('Observer attached to loading element');
            } else {
                console.error('Loading ref not available');
            }
        }, 500); // Short delay to ensure DOM elements are ready

        return () => {
            clearTimeout(timer);
            if (observerRef.current) {
                observerRef.current.disconnect();
                console.log('Observer detached');
            }
        };
    }, [loadMoreProducts, hasMore]);

    // Initial load of products
   useEffect(() => {
        console.log('Initial load for category:', category);
        dispatch(resetProducts());
        dispatch(fetchProducts({ category, page: 1 }));
    }, [dispatch, category]);

    useEffect(() => {
        console.log('Current Redux state:', { 
            currentPage, 
            hasMore, 
            loadingMore, 
            productsCount: allProducts.length 
        });
    }, [currentPage, hasMore, loadingMore, allProducts.length]);

    if (status === 'loading') {
        return <LoadingOverlay />;
    }

    if (status === 'failed') {
        return <div>Error loading products</div>;
    }

    if (allProducts.length === 0) {
        return (
            <>
                {/* Search header */}
                <Container>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            mt: { lg: '5vh', sm: '10vh', xs: '5vh' },
                            transition: 'margin-top 1s',
                            mx: { lg: 10, xs: 3, sm: 10 },
                        }}
                    >
                        <TextField
                            placeholder="ရှာရန်..."
                            fullWidth
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onKeyPress={handleKeyPress}
                            InputProps={{
                                sx: {
                                    borderRadius: 20,
                                },
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleSearch}
                                            edge="end"
                                            sx={{ mr: 0.5 }}
                                        >
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Box sx={{ mx: 2 }}>
                            <Badge badgeContent={cartItems.length} color="primary">
                                <IconButton color="info" onClick={toggleCart}>
                                    <ShoppingCartIcon />
                                </IconButton>
                            </Badge>
                        </Box>
                    </Box>
                </Container>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="80vh"
                >
                    <Typography variant="h6" color="textSecondary">
                        မရှိသေးပါ။
                    </Typography>
                </Box>
            </>
        );
    }

    return (
        <Box>
            {/* Search header */}
            <Container>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mt: { lg: '5vh', sm: '10vh', xs: '5vh' },
                        transition: 'margin-top 1s',
                        mx: { lg: 10, xs: 3, sm: 10 },
                        mb: 3,
                    }}
                >
                    <TextField
                        placeholder="ရှာရန်..."
                        fullWidth
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onKeyPress={handleKeyPress}
                        InputProps={{
                            sx: {
                                borderRadius: 20,
                            },
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleSearch}
                                        edge="end"
                                        sx={{ mr: 0.5 }}
                                    >
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Box sx={{ mx: 2 }}>
                        <Badge badgeContent={cartItems.length} color="primary">
                            <IconButton color="info" onClick={toggleCart}>
                                <ShoppingCartIcon />
                            </IconButton>
                        </Badge>
                    </Box>
                </Box>
            </Container>

            {/* Pinterest-style layout using CSS columns */}
            <Box>
                <Box
                    sx={{
                        mx: { lg: 2, xs: 1, sm: 3 },
                    }}
                >
                    <Box
                        className="pinterest-container"
                        sx={{
                            columnCount: {
                                xs: 2, 
                                sm: 3,  
                                md: 4,   
                                lg: 5   
                            },
                            columnGap: '16px',
                            width: '100%',
                            '& > *': {
                                breakInside: 'avoid',
                                marginBottom: '16px',
                                display: 'block',
                                width: '100%'
                            }
                        }}
                    >
                        {allProducts.map((item: any) => {
                            const isIncludeInCart = cartItems.some((cartItem: any) => cartItem.id === item.id);
                            
                            return (
                                 <div key={item.id}>
                                    <MartCard
                                        img={item.image_urls}
                                        isIncludeInCart={isIncludeInCart}
                                        onAddToCart={() => toggleCartItem(item)} // Changed from addToCart to toggleCartItem
                                    />
                                </div>
                            );
                        })}
                    </Box>
                    
                    {/* Loading indicator for infinite scroll - FIXED */}
                   <Box 
                        ref={loadingRef}
                        sx={{ 
                            display: 'flex', 
                            justifyContent: 'center', 
                            my: 3, 
                            py: 2,
                            width: '100%',
                            height: '50px',  // Shorter height
                            clear: 'both',
                            marginTop: '20px',
                            position: 'relative', // Add this
                            zIndex: 1,           // Add this
                        }}
                    >
                        {loadingMore ? (
                            <CircularProgress size={40} />
                        ) : hasMore ? (
                            // Visible placeholder even when not loading
                            <Box width="100%" height="40px" display="flex" justifyContent="center">
                                <Typography variant="body2" color="text.secondary">
                                    အောက်ကိုဆွဲကြည့်ပါ
                                </Typography>
                            </Box>
                        ) : (
                            <Typography variant="body2" color="text.secondary">
                                ...
                            </Typography>
                        )}
                    </Box>
                </Box>
            </Box>
            
            <Cart 
                isOpen={isCartOpen} 
                updateInfo={false} 
                onClose={toggleCart} 
                cartItems={cartItems} 
                updateCartItem={(cart_id, quantity) => dispatch(updateQuantity({ cart_id, quantity }))} 
            />
        </Box>
    );
};

export default ProductEssential;