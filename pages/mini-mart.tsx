import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography} from '@mui/material';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const MiniMart: NextPage = () => {

    const router = useRouter();
    
    const handleNavigate = (targetUrl: string) => {
        router.push(targetUrl);
    };
    
    const martArray = [
        {
            name: 'Stickers',
            route: '/stickers',
            img: 'https://m.media-amazon.com/images/I/81bSo6o1P9L._AC_UF894,1000_QL80_.jpg',
            description: 'စတေကာများ စိတ်ကြိုက်ရွေးချယ်မှာယူရန်...',
            disabled: false
        },
        // {
        //     name: 'Pin Badges',
        //     route: '/badges',
        //     img: 'https://cpimg.tistatic.com/04342465/b/4/Pin-Badges.jpg',
        //     description: 'ပင်ချိတ်များကို စိတ်ကြိုက်ရွေးချယ်မှာယူရန်...',
        //     disabled: false
        // },
        {
            name: 'Posters',
            route: '/posters',
            img: 'https://m.media-amazon.com/images/I/91c-aUqIcOS._AC_SL1500_.jpg',
            description: 'နံရံကပ်ပိုစတာများ စိတ်ကြိုက်ရွေးချယ်မှာယူရန်...',
            disabled: false
        },
        // {
        //     name: 'Customize Craft',
        //     route: '/customize-crafts',
        //     img: 'https://i.pinimg.com/736x/53/2a/7a/532a7a1ea1840226834ec16619e5b574.jpg',
        //     description: 'ကိုယ်ပိုင် စိတ်ကြိုက်ဒီဇိုင်းဖြင့်မှာ ယူရန်.',
        //     disabled: false
        // },
        // {
        //     name: 'Fancy Shop',
        //     route: '/fancy-shops',
        //     img: 'https://img.freepik.com/premium-photo/diamonds-pearl-necklaces-luxurious-accessories-accompanied-by-designer-handbags-shoes_777271-11459.jpg',
        //     description: 'Selling fancy accessories to wear for everyone.',
        //     disabled: true
        // },
    ];

    return (
        <Box sx={{mx: 5, my: 5}}>
            <Grid container spacing={2}>
                    {martArray.map((mart, index) => (
                        <Grid 
                            item 
                            lg={3}
                            xs={12}
                            key={index}
                        >
                            <Box 
                                sx={{
                                    mt: {lg: '5vh',sm: '10vh', xs: '2vh'},
                                    transition: 'margin-top 1s',
                                }}
                            >
                                <Card sx={{ width: '100%', borderRadius: 5 }}>
                                    <CardMedia
                                        sx={{ height: 140, width: '100%' }}
                                        image={mart.img}
                                        title="green iguana"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                        {mart.name}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary', height: 40}}>
                                        {mart.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions sx={{display: 'flex', justifyContent: 'end'}} >
                                        <Button size="small" disabled={mart.disabled} onClick={() => handleNavigate(mart.route)} >{mart.disabled ? 'Coming Soon' : 'ကြည့်မည်။'}</Button>
                                    </CardActions>
                                    </Card>
                            </Box>
                        </Grid>
                    ))}
            </Grid>
               
        </Box>
    );
};

export default MiniMart;
