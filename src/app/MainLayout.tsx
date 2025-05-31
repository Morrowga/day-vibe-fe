// components/MainLayout.tsx
import { ReactNode } from 'react';
import { Box, Container } from '@mui/material';
import NavBar from '@/components/NavBar';

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <>
            <NavBar />
            <Box mb={10}>
                {children}
            </Box>
        </>
    );
};

export default MainLayout;
