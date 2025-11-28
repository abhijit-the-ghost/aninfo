import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface AnimeSectionProps {
    title: string;
    linkTo?: string;
    children: React.ReactNode;
}

export const AnimeSection: React.FC<AnimeSectionProps> = ({ title, linkTo, children }) => {
    return (
        <section className="py-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display font-bold">{title}</h2>
                {linkTo && (
                    <Link
                        to={linkTo}
                        className="flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                        View All <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                )}
            </div>
            {children}
        </section>
    );
};
