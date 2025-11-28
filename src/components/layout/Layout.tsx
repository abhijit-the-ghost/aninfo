import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { PageTransition } from '../ui/PageTransition';

export const Layout: React.FC = () => {
    const location = useLocation();

    return (
        <div className="min-h-screen flex flex-col bg-background font-sans antialiased">
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-8">
                <AnimatePresence mode="wait">
                    <PageTransition key={location.pathname}>
                        <Outlet />
                    </PageTransition>
                </AnimatePresence>
            </main>
            <Footer />
        </div>
    );
};
