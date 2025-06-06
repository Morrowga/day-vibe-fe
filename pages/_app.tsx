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

    const siteUrl = 'https://thedayvibe.com';
    const siteName = 'Day Vibes';
    const defaultTitle = 'Day Vibes - Premium Stickers & Mini Mart';
    const defaultDescription = 'Discover premium stickers, decals, and mini mart essentials at Day Vibes. High-quality designs for personalizing your space. Fast shipping & great prices.';
    const defaultImage = `${siteUrl}/images/og-image.png`; // Add this image

    return (
        <Provider store={store}>
            <ThemeContextProvider>
                <CssBaseline />
                <Head>
                    {/* Basic Meta Tags */}
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta name="description" content={defaultDescription} />
                    <meta name="keywords" content="stickers, decals, premium stickers, custom stickers, mini mart, day vibes, vinyl stickers, laptop stickers, wall decals" />
                    <meta name="author" content="Day Vibes" />
                    <meta name="robots" content="index, follow" />
                    <meta name="language" content="Myanmar" />
                    <meta name="revisit-after" content="7 days" />
                    
                    {/* Title */}
                    <title>{defaultTitle}</title>
                    
                    {/* Canonical URL */}
                    <link rel="canonical" href={siteUrl} />
                    
                    {/* Favicon */}
                    <link rel="icon" href="/images/favicon.ico" />
                    <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
                    
                    {/* Open Graph / Facebook */}
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content={siteUrl} />
                    <meta property="og:title" content={defaultTitle} />
                    <meta property="og:description" content={defaultDescription} />
                    <meta property="og:image" content={defaultImage} />
                    <meta property="og:image:width" content="1200" />
                    <meta property="og:image:height" content="630" />
                    <meta property="og:site_name" content={siteName} />
                    <meta property="og:locale" content="en_US" />
                    
                    {/* Twitter */}
                    <meta property="twitter:card" content="summary_large_image" />
                    <meta property="twitter:url" content={siteUrl} />
                    <meta property="twitter:title" content={defaultTitle} />
                    <meta property="twitter:description" content={defaultDescription} />
                    <meta property="twitter:image" content={defaultImage} />
                    <meta property="twitter:creator" content="@dayvibes" /> {/* Replace with your Twitter handle */}
                    
                    {/* Additional SEO Meta Tags */}
                    <meta name="theme-color" content="#053020" />
                    <meta name="msapplication-TileColor" content="#ffffff" />
                    <meta name="format-detection" content="telephone=no" />
                    
                    {/* Business Schema.org Structured Data */}
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                "@context": "https://schema.org",
                                "@type": "Organization",
                                "name": "Day Vibes",
                                "url": siteUrl,
                                "logo": `${siteUrl}/images/logo.png`,
                                "description": defaultDescription,
                                "address": {
                                    "@type": "PostalAddress",
                                    "streetAddress": "Mya Street", // Replace with actual address
                                    "addressLocality": "Yangon",
                                    "addressRegion": "Yangon",
                                    "postalCode": "11201",
                                    "addressCountry": "MM"
                                },
                                "contactPoint": {
                                    "@type": "ContactPoint",
                                    "telephone": "+959767834959", // Replace with actual phone
                                    "contactType": "Service"
                                },
                                "sameAs": [
                                    "https://web.facebook.com/stickerstoreyangon/",
                                    "https://www.tiktok.com/@jellycoffee4",
                                    "https://t.me/thedayvibe"
                                ]
                            })
                        }}
                    />
                    
                    {/* Website Schema */}
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                "@context": "https://schema.org",
                                "@type": "WebSite",
                                "name": siteName,
                                "url": siteUrl,
                                "description": defaultDescription,
                                "potentialAction": {
                                    "@type": "SearchAction",
                                    "target": `${siteUrl}/search?q={search_term_string}`,
                                    "query-input": "required name=search_term_string"
                                }
                            })
                        }}
                    />
                </Head>
                {getLayout(<Component {...pageProps} />)}
            </ThemeContextProvider>
        </Provider>
    );
}

export default MyApp;