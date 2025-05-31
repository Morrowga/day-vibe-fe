// pages/_app.tsx
import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider,createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '../src/styles/global.css';
import MainLayout from '@/app/MainLayout';
import { ThemeContextProvider } from '@/app/ThemeContext';
import store from '@/redux/store';
import { Provider } from 'react-redux';
import Head from 'next/head';

type NextPageWithLayout = AppProps & {
    Component: AppProps['Component'] & {
        getLayout?: (page: React.ReactElement) => React.ReactNode;
    };
};

function MyApp({ Component, pageProps }: NextPageWithLayout) {
    const getLayout = Component.getLayout || ((page) => <MainLayout>{page}</MainLayout>);

    return (
        <Provider store={store}>
            <ThemeContextProvider>
                <CssBaseline />
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta name="description" content="Day Vibes - Sticker Store" />
                    <title>Day Vibes - Sticker Store</title>
                </Head>
                {getLayout(<Component {...pageProps} />)}
            </ThemeContextProvider>
        </Provider>
    );
}

export default MyApp;
