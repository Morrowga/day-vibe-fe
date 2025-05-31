import SearchInput from '@/components/SearchInput';
import ThemeMode from '@/components/ThemeMode';
import { AppDispatch, RootState } from '@/redux/store';
import { Badge, Box, Container, IconButton, Pagination, Tooltip, Typography } from '@mui/material';
import type { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Image from 'next/image';
import BrandAvatar from '@/components/BrandAvatar';
import ContentCard from '@/components/ContentCard';
import { fetchBrands, fetchContents } from '@/redux/slices/searchSlice';
import { Brand } from '@/utils/types';
import { fetchTrends } from '@/redux/slices/trendSlice';
import TrendCard from '@/components/TrendCard';
import LoadingOverlay from '@/components/LoadingOverlay';

const flexBetween = {
    display: 'flex', 
    justifyContent: 'space-between'
}

const News: NextPage = () => {
    // const brandRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch<AppDispatch>();
    const {
        brands,
        contents,
        brandStatus,
        contentStatus,
        brandPagination,
        contentPagination,
    } = useSelector((state: RootState) => state.search);
    const {data, status, error} = useSelector((state: RootState) => state.trend);

    const handleSearch = async () => 
    {
        scrollRef(contentRef)
    };

    const scrollRef = (ref:any) => {
        setTimeout(() => {
            if (ref.current) {
                ref.current.scrollIntoView({ behavior: 'smooth' });
            }
        }, 500);
    }

    const handleContentPageChange = (event: React.ChangeEvent<unknown>, page: number) => 
    {
        event.preventDefault();
        dispatch(fetchContents({ q: '', take: 6, page }));
        scrollRef(contentRef)
    };

    useEffect(() => {
        dispatch(fetchTrends());
    }, [dispatch]);

    if (status === 'loading') {
        return (
            <LoadingOverlay />
        );
    }

    if (status === 'failed') {
        return <Box sx={{textAlign: 'center', my: 2}}>Error: {error}</Box>;
    }

    return (
        <Box>
            <Container>
                <Box 
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mt: {lg: '5vh',sm: '10vh', xs: '5vh'},
                        transition: 'margin-top 1s',
                        mx: {lg: 10, xs: 3, sm: 10}
                    }}
                >
                    <Box sx={{width: '100%', textAlign: 'left'}}>
                        <SearchInput onSearch={handleSearch} />
                    </Box>
                </Box>
            </Container>
            <Box ref={contentRef} sx={{my: 5}}></Box>
            {(contentStatus === 'succeeded') && (
                <Box sx={{ mx: 5}}>       
                    {contents.length > 0 ? 
                        <Box>   
                            <ContentCard contents={contents} />
                        </Box>
                        :
                        <Box sx={{textAlign: 'center'}}>   
                           No Data Available
                        </Box>
                    }

                    {contents.length > 0 && 
                        <Pagination
                            count={contentPagination.last_page}
                            page={contentPagination.current_page}
                            onChange={handleContentPageChange}
                            variant="outlined"
                            shape="rounded"
                            sx={{my: 5}}
                        />     
                    }
                </Box>
            )}
            <Box sx={{mx: 5, mb: 5}}>       
                <Box>   
                    <Typography sx={{fontSize: 25, my: 2}}>WHAT TRENDING IN BURMESE ?</Typography>
                    {data ? 
                    (
                        <TrendCard trends={data} />
                    ) : (
                        <TrendCard trends={[]} /> // Pass an empty array if data is null
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default News;
