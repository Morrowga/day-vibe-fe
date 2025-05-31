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
            </Box>
        </Box>
    );
};

export default Home;
