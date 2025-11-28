import React from 'react';
import { Github, Mail, Twitter, Code2, Database, Layout, Zap, Instagram } from 'lucide-react';

export const About: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto py-12 px-4 space-y-16">
            {/* Hero Section */}
            <section className="text-center space-y-6">
                <h1 className="text-5xl font-display font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                    About Aninfo
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Aninfo is a next-generation anime discovery platform designed for the modern web.
                    Built with a focus on aesthetics, performance, and user experience, it serves as a
                    comprehensive guide to the world of anime.
                </p>
            </section>

            {/* Features Grid */}
            <section className="grid md:grid-cols-2 gap-8">
                <div className="bg-card p-8 rounded-3xl border border-border shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                        <Layout className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Modern Design</h3>
                    <p className="text-muted-foreground">
                        Featuring a clean, lofi-inspired aesthetic with smooth Framer Motion animations
                        and a responsive interface that looks great on any device.
                    </p>
                </div>

                <div className="bg-card p-8 rounded-3xl border border-border shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                        <Zap className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
                    <p className="text-muted-foreground">
                        Powered by Vite and React, with optimized data fetching and caching strategies
                        to ensure instant page loads and seamless navigation.
                    </p>
                </div>

                <div className="bg-card p-8 rounded-3xl border border-border shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                        <Database className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Rich Data</h3>
                    <p className="text-muted-foreground">
                        Leveraging the Jikan API to provide comprehensive data including characters,
                        staff, episodes, and detailed statistics for thousands of anime.
                    </p>
                </div>

                <div className="bg-card p-8 rounded-3xl border border-border shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                        <Code2 className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Open Source</h3>
                    <p className="text-muted-foreground">
                        Built with modern technologies like TypeScript, Tailwind CSS, and TanStack Query.
                        The code is clean, typed, and available for learning.
                    </p>
                </div>
            </section>

            {/* Tech Stack */}
            <section className="bg-muted/30 p-8 rounded-3xl border border-border">
                <h2 className="text-2xl font-bold mb-6 text-center">Tech Stack</h2>
                <div className="flex flex-wrap justify-center gap-4">
                    {['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'TanStack Query', 'Zustand', 'React Router'].map((tech) => (
                        <span key={tech} className="px-4 py-2 bg-background rounded-full text-sm font-medium border border-border shadow-sm">
                            {tech}
                        </span>
                    ))}
                </div>
            </section>

            {/* Contact */}
            <section className="text-center space-y-8 pt-8 border-t border-border">
                <h2 className="text-2xl font-bold">Get in Touch</h2>
                <div className="flex justify-center space-x-6">
                    <a
                        href="https://github.com/abhijit-the-ghost"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-4 bg-muted rounded-full hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110"
                    >
                        <Github className="h-6 w-6" />
                    </a>
                    <a
                        href="mailto:abhijitgurragain546@gmail.com"
                        className="group p-4 bg-muted rounded-full hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110"
                    >
                        <Mail className="h-6 w-6" />
                    </a>
                    <a
                        href="https://www.instagram.com/ig_abhijit.4/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-4 bg-muted rounded-full hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110"
                    >
                        <Instagram className="h-6 w-6" />
                    </a>
                </div>
                <p className="text-sm text-muted-foreground">
                    Designed & Built by <span className="font-bold text-foreground">Abhijit Guragain (Ghost)</span>
                </p>
            </section>
        </div>
    );
};
