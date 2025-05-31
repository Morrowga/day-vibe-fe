// components/MainLayout.tsx
import { ReactNode } from 'react';
import { Container } from '@mui/material';
import NavBar from '@/components/NavBar';

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <>
            <NavBar />
            {children}
        </>
    );
};

export default MainLayout;
