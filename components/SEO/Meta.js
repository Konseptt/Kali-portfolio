import React from 'react'
import Head from 'next/head';

export default function Meta() {
    return (
        <Head>
           {/* Primary Meta Tags */}
            <title>Ranjan Sharma - Software Developer</title>
            <meta charSet="utf-8" />
            <meta name="title" content="Ranjan Sharma's Portfolio - Software Developer" />
            <meta name="description"
                content="Ranjan Sharma's Personal Portfolio Website. Made with Ubuntu (Linux) theme by Next.js and Tailwind CSS." />
            <meta name="author" content="Ranjan Sharma" />
            <meta name="keywords"
                content="Konseptt, Konseptt's portfolio, ubuntu portfolio, Ranjan Sharma protfolio, Ranjan Sharma computer, Ranjan Sharma, ubuntu, Ranjan Sharma ubuntu portfolio" />
            <meta name="robots" content="index, follow" />
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="language" content="English" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#E95420" />

            {/* Search Engine */}
            <meta name="image" content="images/logos/fevicon.png" />
            {/* Schema.org for Google */}
            <meta itemProp="name" content="Ranjan Sharma's Portfolio - Software Developer" />
            <meta itemProp="description"
                content="Ranjan Sharma's Personal Portfolio Website. Made with Ubuntu (Linux) theme by Next.js and Tailwind CSS." />
            <meta itemProp="image" content="images/logos/fevicon.png" />
            {/* Twitter */}
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content="Ranjan Sharma's Portfolio - Software Developer" />
            <meta name="twitter:description"
                content="Ranjan Sharma's Personal Portfolio Website. Made with Ubuntu (Linux) theme by Next.js and Tailwind CSS." />
            <meta name="twitter:site" content="@ranjansharmanp" />
            <meta name="twitter:creator" content="@ranjansharmanp" />
            <meta name="twitter:image:src" content="images/logos/logo_1024.png" />
            {/* Open Graph general (Facebook, Pinterest & Google+) */}
            <meta name="og:title" content="Ranjan Sharma's Portfolio - Software Developer" />
            <meta name="og:description"
                content="Ranjan Sharma's Personal Portfolio Website. Made with Ubuntu (Linux) theme by Next.js and Tailwind CSS." />
            <meta name="og:image" content="images/logos/logo_1200.png" />
            <meta name="og:url" content="https://konseptt.github.io/portfolio/" />
            <meta name="og:site_name" content="Ranjan Sharma's Personal Portfolio" />
            <meta name="og:locale" content="en_NP" />
            <meta name="og:type" content="website" />

            <link rel="icon" href="images/logos/ubuntu.png" />
            <link rel="apple-touch-icon" href="images/logos/logo.png" />
            <link rel="preload" href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap" as="style" />
            <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap" rel="stylesheet"></link>
        </Head>
    )
}
