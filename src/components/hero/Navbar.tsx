'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Hide Navbar on presentation page
    if (pathname?.startsWith('/presentation')) {
        return null;
    }

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Memory (3D)', href: '/memory-management' },
        { name: 'Presentation', href: '/presentation' },
        { name: 'Topics', href: '/topics' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/50 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="group flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover:shadow-[0_0_25px_rgba(59,130,246,0.8)] transition-all">
                        R
                    </div>
                    <span className="font-mono font-bold text-lg tracking-widest text-white group-hover:text-blue-300 transition-colors">
                        RAVI<span className="text-blue-500">.</span>DEV
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`relative text-sm font-medium tracking-wide transition-colors ${pathname === link.href ? 'text-white' : 'text-white/60 hover:text-white'
                                }`}
                        >
                            {link.name}
                            {pathname === link.href && (
                                <span className="absolute -bottom-1 left-0 right-0 h-px bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
                            )}
                        </Link>
                    ))}
                </div>

                {/* System Status / Right Action */}
                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-blue-200/80">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        SYS_READY
                    </div>
                </div>
            </div>
        </nav>
    );
}
