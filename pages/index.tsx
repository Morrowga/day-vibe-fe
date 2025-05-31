import HomeCover from '@/components/HomeCover';
import LiquidButton from '@/components/LiquidButton';
import { Box, Container} from '@mui/material';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Home: NextPage = () => {

    const router = useRouter();
    
    const handleNavigate = (targetUrl: string) => {
        router.push(targetUrl);
    };

    useEffect(() => {
        handleNavigate('/mini-mart');
    })

    return (
        <Box
        >
            <Box 
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    transition: 'margin-top 1s',
                }}
            >
                {/* <HomeCover /> */}
            </Box>
            {/* <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', mt: {lg: 20, xs: 0 }, padding: {lg: 0, xs: 3}}}> */}
                {/* <LiquidButton onClick={() => handleNavigate('/mini-mart')} text={'Store'} /> */}
                {/* <LiquidButton onClick={() => handleNavigate('/news')} text={'News'} /> */}
            {/* </Box> */}
        </Box>
    );
};

export default Home;
