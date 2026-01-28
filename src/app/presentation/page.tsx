'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getAllTopics, getTopicBySlug, type Topic } from '@/content/topics';
import { Button } from '@/components/ui/button';
import NoiseOverlay from '@/components/hero/NoiseOverlay';

// Dynamic import for the heavy 3D background
// const DigitalTunnel = dynamic(() => import('@/components/hero/DigitalTunnel'), { ssr: false });

function PresentationContent() {
    const searchParams = useSearchParams();
    const topicSlug = searchParams.get('topic');

    const [selectedTopic, setSelectedTopic] = useState<Topic | null>(() => {
        return topicSlug ? (getTopicBySlug(topicSlug) ?? null) : null;
    });
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const topics = getAllTopics();

    // Reset slide count if topic changes
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCurrentSlide(0);
    }, [selectedTopic]);

    // Keep state in sync if URL changes externally
    useEffect(() => {
        if (topicSlug) {
            const topic = getTopicBySlug(topicSlug) ?? null;
            if (topic && topic.slug !== selectedTopic?.slug) {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setSelectedTopic(topic);
            }
        }
    }, [topicSlug, selectedTopic]);

    const toggleFullscreen = useCallback(() => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    }, []);

    const nextSlide = useCallback(() => {
        if (selectedTopic && currentSlide < selectedTopic.presentationSlides.length - 1) {
            setCurrentSlide(prev => prev + 1);
        }
    }, [selectedTopic, currentSlide]);

    const prevSlide = useCallback(() => {
        if (currentSlide > 0) {
            setCurrentSlide(prev => prev - 1);
        }
    }, [currentSlide]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === ' ') {
                nextSlide();
            } else if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'f') {
                toggleFullscreen();
            } else if (e.key === 'Escape') {
                if (isFullscreen) {
                    document.exitFullscreen();
                    setIsFullscreen(false);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [nextSlide, prevSlide, toggleFullscreen, isFullscreen]);

    // Topic Selection View (Data Pad Grid)
    if (!selectedTopic) {
        return (
            <main className="min-h-screen relative overflow-hidden bg-black text-white selection:bg-blue-500/30">
                {/* Static Background for Presentation Page */}
                <div className="absolute inset-0 bg-[#050505] z-0">
                    {/* Grid Pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
                    {/* Deep Radial Glow */}
                    <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-radial from-blue-900/20 to-transparent opacity-50 blur-[100px]" />
                </div>

                <NoiseOverlay />
                <div className="absolute inset-0 bg-black/60 z-[1] pointer-events-none" />

                <div className="relative z-10 container mx-auto px-4 py-20 min-h-screen flex flex-col justify-center">
                    <div className="max-w-5xl mx-auto w-full">
                        {/* Header */}
                        <div className="text-center mb-16 relative">
                            <Link href="/">
                                <Button
                                    variant="outline"
                                    className="mb-8 border-blue-500/30 bg-blue-500/10 text-blue-200 hover:bg-blue-500/20 hover:text-white backdrop-blur-md transition-all"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    RETURN TO SYSTEM
                                </Button>
                            </Link>

                            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                                DATA MODULES
                            </h1>
                            <p className="text-xl text-blue-300/60 font-mono tracking-widest uppercase">
                                Select Data Stream to Decrypt
                            </p>
                        </div>

                        {/* Grid */}
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Manual Card for Memory Management */}
                            <Link href="/memory-management" className="group relative cursor-pointer">
                                {/* Hover Glow */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-20 group-hover:opacity-70 blur-md transition-opacity duration-500" />

                                {/* Card Body */}
                                <div className="relative h-full bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-xl overflow-hidden transition-all duration-300 group-hover:border-white/30 group-hover:translate-y-[-2px]">
                                    {/* Scanline Effect */}
                                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-10 pointer-events-none" />

                                    <div className="flex items-start gap-6">
                                        <div className="text-4xl p-4 bg-white/5 rounded-lg border border-white/10 text-blue-400 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300">
                                            🧠
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-cyan-300 transition-colors">
                                                Memory Management (3D)
                                            </h3>
                                            <p className="text-gray-400 group-hover:text-gray-300 leading-relaxed mb-4">
                                                An interactive 3D journey through Operating System Memory Management.
                                            </p>
                                            <div className="flex items-center gap-2 text-xs font-mono text-blue-400/80">
                                                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                                INTERACTIVE SCENE
                                            </div>
                                        </div>
                                    </div>

                                    {/* Corner Accents */}
                                    <div className="absolute top-0 right-0 p-2 opacity-30">
                                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>

                            {topics.map((topic) => (
                                <div
                                    key={topic.slug}
                                    onClick={() => setSelectedTopic(topic)}
                                    className="group relative cursor-pointer"
                                >
                                    {/* Hover Glow */}
                                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-20 group-hover:opacity-70 blur-md transition-opacity duration-500" />

                                    {/* Card Body */}
                                    <div className="relative h-full bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-xl overflow-hidden transition-all duration-300 group-hover:border-white/30 group-hover:translate-y-[-2px]">
                                        {/* Scanline Effect */}
                                        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-10 pointer-events-none" />

                                        <div className="flex items-start gap-6">
                                            <div className="text-4xl p-4 bg-white/5 rounded-lg border border-white/10 text-blue-400 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300">
                                                {topic.icon}
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-cyan-300 transition-colors">
                                                    {topic.title}
                                                </h3>
                                                <p className="text-gray-400 group-hover:text-gray-300 leading-relaxed mb-4">
                                                    {topic.description}
                                                </p>
                                                <div className="flex items-center gap-2 text-xs font-mono text-blue-400/80">
                                                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                                    {topic.presentationSlides.length} SLIDES DETECTED
                                                </div>
                                            </div>
                                        </div>

                                        {/* Corner Accents */}
                                        <div className="absolute top-0 right-0 p-2 opacity-30">
                                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    // Presentation HUD View
    const slide = selectedTopic.presentationSlides[currentSlide];
    const totalSlides = selectedTopic.presentationSlides.length;

    return (
        <main className="min-h-screen relative overflow-hidden bg-black text-white flex flex-col">
            {/* Ambient Background (Static) */}
            <div className="absolute inset-0 bg-[#050505] z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
            </div>
            <NoiseOverlay />
            <div className="absolute inset-0 bg-black/80 z-[1] pointer-events-none" />

            {/* Header HUD */}
            <header className="fixed top-0 left-0 right-0 z-50 py-4 px-6 border-b border-white/5 bg-black/20 backdrop-blur-md">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <div className="flex items-center gap-6">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-white/60 hover:text-white hover:bg-white/10"
                            onClick={() => {
                                setSelectedTopic(null);
                                setCurrentSlide(0);
                            }}
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                            </svg>
                            TERMINATE SESSION
                        </Button>
                        <div className="h-4 w-px bg-white/10" />
                        <span className="font-mono text-sm tracking-widest text-cyan-400">
                            {selectedTopic.title.toUpperCase()}
                        </span>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="font-mono text-xs text-blue-300/50">
                            FRAME {currentSlide + 1} / {totalSlides}
                        </div>
                        <Button variant="ghost" size="icon" onClick={toggleFullscreen} className="text-white/60 hover:text-white hover:bg-white/10">
                            {isFullscreen ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                </svg>
                            )}
                        </Button>
                    </div>
                </div>
            </header>

            {/* Slide Content Display */}
            <div className="relative z-10 flex-1 flex items-center justify-center pt-20 pb-24 px-8">
                {/* Holographic Container */}
                <div className="max-w-5xl w-full p-12 relative rounded-3xl border border-white/5 bg-white/5 backdrop-blur-sm shadow-[0_0_100px_rgba(0,0,0,0.5)]">
                    {/* Decorative HUD Elements */}
                    <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-cyan-500/30 rounded-tl-3xl" />
                    <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-purple-500/30 rounded-br-3xl" />

                    <h2 className="text-4xl md:text-6xl font-black mb-16 text-center tracking-tight bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                        {slide.title}
                    </h2>

                    <ul className="space-y-8">
                        {slide.points.map((point, i) => (
                            <li
                                key={i}
                                className="text-xl md:text-3xl text-gray-200 flex items-start gap-6 font-light leading-relaxed group"
                            >
                                <span className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 border border-blue-500/40 text-blue-300 rounded flex items-center justify-center font-mono text-sm md:text-base group-hover:bg-blue-500/20 group-hover:border-blue-400 transition-all">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <span className="pt-1 group-hover:text-white transition-colors">{point}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Footer Navigation */}
            <footer className="fixed bottom-0 left-0 right-0 z-50 py-6 px-12 border-t border-white/5 bg-black/40 backdrop-blur-md">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <Button
                        variant="ghost"
                        size="lg"
                        onClick={prevSlide}
                        disabled={currentSlide === 0}
                        className="text-white/60 hover:text-white hover:bg-white/10 font-mono tracking-widest"
                    >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        PREV
                    </Button>

                    <div className="flex gap-3">
                        {selectedTopic.presentationSlides.map((_, i) => (
                            <div
                                key={i}
                                onClick={() => setCurrentSlide(i)}
                                className={`h-1 cursor-pointer transition-all duration-300 rounded-full ${i === currentSlide
                                    ? 'w-12 bg-gradient-to-r from-cyan-500 to-blue-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]'
                                    : 'w-2 bg-white/20 hover:bg-white/40'
                                    }`}
                            />
                        ))}
                    </div>

                    <Button
                        variant="ghost"
                        size="lg"
                        onClick={nextSlide}
                        disabled={currentSlide === totalSlides - 1}
                        className="text-white/60 hover:text-white hover:bg-white/10 font-mono tracking-widest"
                    >
                        NEXT
                        <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Button>
                </div>
            </footer>
        </main>
    );
}

export default function PresentationPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-black flex items-center justify-center text-blue-500 font-mono tracking-widest animate-pulse">
                INITIALIZING_SYSTEM...
            </div>
        }>
            <PresentationContent />
        </Suspense>
    );
}
