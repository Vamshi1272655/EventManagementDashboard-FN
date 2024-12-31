// app/layout.js (Client Component)
'use client'; // This makes it a client-side component

import React from 'react';
import { Provider } from 'react-redux';
import Store from './Store';
import { metadata } from './metadata'; // Import metadata from a Server Component
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({ children }) {
  return (
    <Provider store={Store}>
      <html lang="en">
        <head>
          <meta name="description" content={metadata.description} />
          <title>Event Management Dashboard</title>
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {children}
        </body>
      </html>
    </Provider>
  );   
}
