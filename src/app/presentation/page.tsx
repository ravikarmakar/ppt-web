'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getAllTopics, getTopicBySlug, type Topic } from '@/content/topics';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export default function PresentationPage() {
    const searchParams = useSearchParams();
    const topicSlug = searchParams.get('topic');

    const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const topics = getAllTopics();

    useEffect(() => {
        if (topicSlug) {
            const topic = getTopicBySlug(topicSlug);
            if (topic) {
                setSelectedTopic(topic);
            }
        }
    }, [topicSlug]);

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

    // Topic Selection View
    if (!selectedTopic) {
        return (
            <main className="min-h-screen py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <Link href="/" className="inline-block mb-8">
                            <Button variant="ghost" className="gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Back to Home
                            </Button>
                        </Link>

                        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            Presentation Mode
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Select a topic to start the presentation. Use fullscreen for the best experience.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {topics.map((topic) => (
                            <Card
                                key={topic.slug}
                                className="cursor-pointer hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10"
                                onClick={() => setSelectedTopic(topic)}
                            >
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-3">
                                        <span className="text-3xl">{topic.icon}</span>
                                        {topic.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{topic.description}</p>
                                    <p className="text-sm text-primary mt-2">
                                        {topic.presentationSlides.length} slides
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </main>
        );
    }

    // Presentation View
    const slide = selectedTopic.presentationSlides[currentSlide];
    const totalSlides = selectedTopic.presentationSlides.length;

    return (
        <main className="min-h-screen flex flex-col">
            {/* Header Controls */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50 py-3 px-6">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                                setSelectedTopic(null);
                                setCurrentSlide(0);
                            }}
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Topics
                        </Button>
                        <span className="text-muted-foreground">|</span>
                        <span className="font-medium">{selectedTopic.title}</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">
                            Slide {currentSlide + 1} of {totalSlides}
                        </span>
                        <Button variant="outline" size="sm" onClick={toggleFullscreen}>
                            {isFullscreen ? (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
                                </svg>
                            ) : (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                                </svg>
                            )}
                        </Button>
                    </div>
                </div>
            </header>

            {/* Slide Content */}
            <div className="flex-1 flex items-center justify-center pt-20 pb-24 px-8">
                <div className="max-w-4xl w-full text-center">
                    <h2 className="text-4xl md:text-6xl font-bold mb-12 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
                        {slide.title}
                    </h2>

                    <ul className="space-y-6">
                        {slide.points.map((point, i) => (
                            <li
                                key={i}
                                className="text-2xl md:text-3xl text-foreground/90 flex items-start gap-4 text-left max-w-3xl mx-auto"
                            >
                                <span className="flex-shrink-0 w-10 h-10 bg-primary/20 text-primary rounded-full flex items-center justify-center font-bold">
                                    {i + 1}
                                </span>
                                <span className="pt-1">{point}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Navigation Controls */}
            <footer className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-t border-border/50 py-4 px-6">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={prevSlide}
                        disabled={currentSlide === 0}
                        className="gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Previous
                    </Button>

                    {/* Progress Dots */}
                    <div className="flex gap-2">
                        {selectedTopic.presentationSlides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentSlide(i)}
                                className={`w-3 h-3 rounded-full transition-all ${i === currentSlide
                                        ? 'bg-primary scale-125'
                                        : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                                    }`}
                            />
                        ))}
                    </div>

                    <Button
                        variant="default"
                        size="lg"
                        onClick={nextSlide}
                        disabled={currentSlide === totalSlides - 1}
                        className="gap-2"
                    >
                        Next
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Button>
                </div>
            </footer>

            {/* Keyboard Hints */}
            <div className="fixed bottom-20 right-6 text-xs text-muted-foreground space-y-1">
                <p>← → Arrow keys to navigate</p>
                <p>F for fullscreen</p>
            </div>
        </main>
    );
}
