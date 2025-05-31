import React, {useState} from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { Box, Grid } from '@mui/material';
import { Product } from '@/utils/types';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
const AvatarStyle = {
    width: 90, 
    height: 90, 
    cursor: 'pointer'
  };

interface ProductCardProps {
    products: Product[];
}

const truncateDescription = (description: string, maxLength: number, isExpanded: boolean) => {
    if (isExpanded) return description;
    return description.length > maxLength ? `${description.slice(0, maxLength)}...` : description;
};

const ProductCard: React.FC<ProductCardProps> = ({ products }) => {
    const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

    const handleExpand = (id: string) => {
        setExpanded(prevState => ({
          ...prevState,
          [id]: !prevState[id],
        }));
      };
    
  return (
    <Grid spacing={2} container>
        {products.map((product) => (
         <Grid lg={4} item key={product.id}>
            <Card sx={{ maxWidth: '100%', marginTop: 4, height: 250, overflow: 'auto' }}>
            <CardHeader
                avatar={
                <Avatar sx={{ bgcolor: red[500], ...AvatarStyle }} aria-label="recipe">
                    R
                </Avatar>
                }
                title={product.name}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary" sx={{ marginTop: 2 }}>
                    {truncateDescription(product.description, 150, !!expanded[product.id])}
                    {product.description.length > 150 && (
                        <IconButton onClick={() => handleExpand(product.id)}>
                            {expanded[product.id] ? <ExpandLessIcon /> : <MoreHorizIcon />}
                        </IconButton>
                    )}
                </Typography>
            </CardContent>
            </Card>
        </Grid>
        ))}
    </Grid>
  );
}

export default ProductCard;
