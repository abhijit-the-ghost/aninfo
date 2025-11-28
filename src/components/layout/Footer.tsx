import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="w-full py-6 mt-auto bg-card border-t border-border">
            <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                <p>Abhijit Guragain (Ghost) &copy; {new Date().getFullYear()}</p>
            </div>
        </footer>
    );
};
