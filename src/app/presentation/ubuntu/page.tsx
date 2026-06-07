'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Sparkles,
  MonitorPlay,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import NoiseOverlay from '@/components/hero/NoiseOverlay';
import { slides } from './data';
import WhatIsUbuntuVisual from './components/WhatIsUbuntuVisual';
import BootInstallVisual from './components/BootInstallVisual';
import TerminalVisual from './components/TerminalVisual';
import ArchitectureVisual from './components/ArchitectureVisual';
import FileSystemVisual from './components/FileSystemVisual';

interface CrossBrowserHTMLElement extends HTMLElement {
  webkitRequestFullscreen?: () => Promise<void>;
  mozRequestFullScreen?: () => Promise<void>;
  msRequestFullscreen?: () => Promise<void>;
}

interface CrossBrowserDocument extends Document {
  webkitExitFullscreen?: () => Promise<void>;
  mozCancelFullScreen?: () => Promise<void>;
  msExitFullscreen?: () => Promise<void>;
  webkitFullscreenElement?: Element;
  mozFullScreenElement?: Element;
  msFullscreenElement?: Element;
}

// Cross-browser Fullscreen Helpers
const enterFullscreen = (element: HTMLElement) => {
  const el = element as CrossBrowserHTMLElement;
  if (el.requestFullscreen) {
    el.requestFullscreen().catch(() => {});
  } else if (el.webkitRequestFullscreen) {
    el.webkitRequestFullscreen();
  } else if (el.mozRequestFullScreen) {
    el.mozRequestFullScreen();
  } else if (el.msRequestFullscreen) {
    el.msRequestFullscreen();
  }
};

const exitFullscreen = () => {
  const doc = document as CrossBrowserDocument;
  if (doc.exitFullscreen) {
    doc.exitFullscreen().catch(() => {});
  } else if (doc.webkitExitFullscreen) {
    doc.webkitExitFullscreen();
  } else if (doc.mozCancelFullScreen) {
    doc.mozCancelFullScreen();
  } else if (doc.msExitFullscreen) {
    doc.msExitFullscreen();
  }
};

const isCurrentlyFullscreen = () => {
  if (typeof document === 'undefined') return false;
  const doc = document as CrossBrowserDocument;
  return !!(
    doc.fullscreenElement ||
    doc.webkitFullscreenElement ||
    doc.mozFullScreenElement ||
    doc.msFullscreenElement
  );
};

// -------------------------------------------------------------
// Interactive Right Panel Components
// -------------------------------------------------------------



// -------------------------------------------------------------
// Main Scrollytelling Presentation Component
// -------------------------------------------------------------

export default function UbuntuPresentation() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const slideRefs = useRef<HTMLDivElement[]>([]);

  // Fullscreen toggle handler
  const toggleFullscreen = () => {
    if (!isCurrentlyFullscreen()) {
      enterFullscreen(document.documentElement);
    } else {
      exitFullscreen();
    }
  };

  // Sync fullscreen change with state (ESC key / browser buttons support)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(isCurrentlyFullscreen());
    };
    const events = [
      'fullscreenchange',
      'webkitfullscreenchange',
      'mozfullscreenchange',
      'MSFullscreenChange',
    ];
    events.forEach((evt) =>
      document.addEventListener(evt, handleFullscreenChange)
    );
    return () => {
      events.forEach((evt) =>
        document.removeEventListener(evt, handleFullscreenChange)
      );
    };
  }, []);

  // Monitor scroll positioning to update active visual
  useEffect(() => {
    if (isPresentationMode) return;

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0.1,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = slideRefs.current.indexOf(
            entry.target as HTMLDivElement
          );
          if (index !== -1) {
            setActiveSlide(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );
    slideRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, [isPresentationMode]);

  // Handle keyboard shortcuts (P/F/Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle fullscreen mode with F key
      if (e.key === 'f' || e.key === 'F') {
        if (
          !e.ctrlKey &&
          !e.metaKey &&
          !e.altKey &&
          document.activeElement?.tagName !== 'INPUT'
        ) {
          e.preventDefault();
          toggleFullscreen();
        }
      }

      // Toggle presentation mode with P key
      if (e.key === 'p' || e.key === 'P') {
        if (
          !e.ctrlKey &&
          !e.metaKey &&
          !e.altKey &&
          document.activeElement?.tagName !== 'INPUT'
        ) {
          e.preventDefault();
          if (!isPresentationMode) {
            setCurrentSlide(activeSlide);
            setIsPresentationMode(true);
            if (!isCurrentlyFullscreen()) {
              enterFullscreen(document.documentElement);
            }
          } else {
            setActiveSlide(currentSlide);
            setIsPresentationMode(false);
            if (isCurrentlyFullscreen()) {
              exitFullscreen();
            }
            setTimeout(() => {
              slideRefs.current[currentSlide]?.scrollIntoView({
                behavior: 'smooth',
              });
            }, 100);
          }
        }
      }

      // Handle slide navigation if in presentation mode
      if (isPresentationMode) {
        if (e.key === 'ArrowRight' || e.key === ' ') {
          e.preventDefault();
          setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          setCurrentSlide((prev) => Math.max(0, prev - 1));
        } else if (e.key === 'Escape') {
          setActiveSlide(currentSlide);
          setIsPresentationMode(false);
          if (isCurrentlyFullscreen()) {
            exitFullscreen();
          }
          setTimeout(() => {
            slideRefs.current[currentSlide]?.scrollIntoView({
              behavior: 'smooth',
            });
          }, 100);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPresentationMode, activeSlide, currentSlide]);



  // -------------------------------------------------------------
  // Full-focused Presentation Mode View
  // -------------------------------------------------------------
  if (isPresentationMode) {
    const slide = slides[currentSlide];
    return (
      <main className="h-screen w-screen bg-[#060006] text-white overflow-hidden relative flex flex-col justify-between selection:bg-orange-500/30 p-6 sm:p-8">
        {/* Dynamic Ambient Background Glows */}
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-purple-950/15 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="absolute bottom-1/4 right-1/4 w-[45vw] h-[45vw] bg-orange-950/10 rounded-full blur-[140px] pointer-events-none z-0" />
        <NoiseOverlay />

        {/* Scanline pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.4)_50%)] bg-size-[100%_4px] opacity-15 z-0 pointer-events-none" />

        {/* Header HUD */}
        <header className="z-10 flex items-center justify-between border-b border-white/5 bg-[#0d010d]/40 backdrop-blur-md px-6 py-4 rounded-2xl">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setActiveSlide(currentSlide);
                setIsPresentationMode(false);
                if (isCurrentlyFullscreen()) {
                  exitFullscreen();
                }
                setTimeout(() => {
                  slideRefs.current[currentSlide]?.scrollIntoView({
                    behavior: 'smooth',
                  });
                }, 100);
              }}
              className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-all hover:-translate-x-1 duration-200 cursor-pointer border border-white/10 rounded-full px-4 py-1.5 bg-white/5"
              title="Exit Deck Mode (P)"
            >
              <ArrowLeft className="w-4 h-4" />
              EXIT DECK MODE [P]
            </button>

            {/* Manual Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white cursor-pointer border border-white/10 rounded-full px-4 py-1.5 bg-white/5 transition-all"
              title="Toggle Fullscreen (F)"
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
                  <span>EXIT FULLSCREEN [F]</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5 text-orange-400" />
                  <span>FULLSCREEN [F]</span>
                </>
              )}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
            <span className="font-mono text-xs text-orange-450 tracking-[0.2em] uppercase">
              DECK MODE ACTIVE • SLIDE {currentSlide + 1} OF {slides.length}
            </span>
          </div>
        </header>

        {/* Slide Canvas (Middle Area) */}
        <div className="z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 my-6 items-center overflow-hidden">
          {/* Slide Content */}
          <div className="lg:col-span-5 flex flex-col justify-center h-full p-4 sm:p-6 overflow-y-auto max-h-full">
            <div className="font-mono text-[10px] sm:text-xs text-orange-450 tracking-[0.25em] uppercase mb-4 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              STAGE {String(currentSlide + 1).padStart(2, '0')} •{' '}
              {slide.subtitle}
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-8 bg-linear-to-r from-white via-white to-slate-400 bg-clip-text text-transparent">
              {slide.title}
            </h2>
            <div className="space-y-6 text-slate-300 text-sm sm:text-base leading-relaxed font-light font-sans">
              {slide.paragraphs.map((para, index) => (
                <p key={index} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2.5 shrink-0" />
                  <span>
                    {para.includes(':') ? (
                      <>
                        <strong className="text-orange-400 font-semibold">
                          {para.split(':')[0]}:
                        </strong>
                        {para.substring(para.indexOf(':') + 1)}
                      </>
                    ) : (
                      para
                    )}
                  </span>
                </p>
              ))}
            </div>
          </div>

          {/* Interactive Graphic Module */}
          <div className="lg:col-span-7 h-full flex items-center justify-center p-4">
            <div className="w-full h-full max-h-[60vh] lg:max-h-full border border-white/10 bg-[#0d010d]/60 backdrop-blur-md rounded-3xl overflow-hidden relative shadow-[0_0_80px_rgba(233,84,32,0.1)] flex flex-col justify-between">
              {/* Top HUD Frame */}
              <div className="border-b border-white/5 bg-[#150315]/50 px-6 py-3 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-500" />
                  <span>DECRYPTING COMPONENT 0{currentSlide + 1}</span>
                </div>
                <span className="tracking-widest">LIVE_PREVIEW_STREAM</span>
              </div>

              {/* Visual Workspace */}
              <div className="flex-1 overflow-hidden relative">
                <div className={currentSlide === 0 ? "h-full w-full" : "hidden"}>
                  <WhatIsUbuntuVisual />
                </div>
                <div className={currentSlide === 1 ? "h-full w-full" : "hidden"}>
                  <BootInstallVisual />
                </div>
                <div className={currentSlide === 2 ? "h-full w-full" : "hidden"}>
                  <TerminalVisual />
                </div>
                <div className={currentSlide === 3 ? "h-full w-full" : "hidden"}>
                  <ArchitectureVisual />
                </div>
                <div className={currentSlide === 4 ? "h-full w-full" : "hidden"}>
                  <FileSystemVisual />
                </div>
              </div>

              {/* Bottom HUD Frame */}
              <div className="border-t border-white/5 bg-[#150315]/50 px-6 py-3 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>BUFFER_STATUS: MONITORING</span>
                <span>INTERACTIVE LAB</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Deck Navigation Controls */}
        <footer className="z-10 py-4 px-6 border-t border-white/5 bg-[#0d010d]/40 backdrop-blur-md rounded-2xl flex items-center justify-between">
          <button
            onClick={() => setCurrentSlide((prev) => Math.max(0, prev - 1))}
            disabled={currentSlide === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs border transition-all ${
              currentSlide === 0
                ? 'border-white/5 text-slate-650 cursor-not-allowed'
                : 'border-white/10 hover:border-orange-500/55 hover:bg-orange-500/10 text-slate-300 hover:text-white cursor-pointer'
            }`}
          >
            PREVIOUS
          </button>

          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-8 h-2 rounded-full transition-all duration-350 ${
                  currentSlide === i
                    ? 'bg-orange-500 w-12 shadow-[0_0_8px_rgba(233,84,32,0.8)]'
                    : 'bg-white/10 hover:bg-white/30'
                }`}
                title={`Jump to Slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() =>
              setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1))
            }
            disabled={currentSlide === slides.length - 1}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs border transition-all ${
              currentSlide === slides.length - 1
                ? 'border-white/5 text-slate-650 cursor-not-allowed'
                : 'border-white/10 hover:border-orange-500/55 hover:bg-orange-500/10 text-slate-300 hover:text-white cursor-pointer'
            }`}
          >
            NEXT
          </button>
        </footer>
      </main>
    );
  }

  // -------------------------------------------------------------
  // Default Scrollytelling View
  // -------------------------------------------------------------
  return (
    <main className="min-h-screen bg-[#070007] text-white overflow-x-clip relative selection:bg-orange-500/30">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-purple-950/15 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[45vw] h-[45vw] bg-orange-950/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <NoiseOverlay />

      {/* Scanline pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.4)_50%)] bg-size-[100%_4px] opacity-15 z-0 pointer-events-none" />

      {/* Header HUD */}
      <header className="fixed top-0 left-0 right-0 z-50 py-4 px-6 border-b border-white/5 bg-[#0d010d]/40 backdrop-blur-md">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link href="/presentation">
            <button className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-all hover:-translate-x-1 duration-200 cursor-pointer">
              <ArrowLeft className="w-4 h-4" />
              BACK TO MODULES
            </button>
          </Link>

          <div className="flex items-center gap-4">
            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:border-white/25 cursor-pointer transition-all duration-300"
              title="Toggle Fullscreen (F)"
            >
              {isFullscreen ? (
                <Minimize2 className="w-3.5 h-3.5 text-orange-400" />
              ) : (
                <Maximize2 className="w-3.5 h-3.5 text-orange-400" />
              )}
              <span>FULLSCREEN [F]</span>
            </button>

            {/* Presentation Mode Toggle */}
            <button
              onClick={() => {
                setCurrentSlide(activeSlide);
                setIsPresentationMode(true);
                if (!isCurrentlyFullscreen()) {
                  enterFullscreen(document.documentElement);
                }
              }}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono border border-orange-500/40 bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 cursor-pointer transition-all duration-300 shadow-[0_0_15px_rgba(233,84,32,0.15)] hover:shadow-[0_0_20px_rgba(233,84,32,0.3)]"
              title="Toggle Presentation Mode (P)"
            >
              <MonitorPlay className="w-3.5 h-3.5" />
              PRESENTATION MODE [P]
            </button>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="font-mono text-xs text-orange-450 tracking-[0.2em] uppercase">
                SYSTEM ANALYZER: UBUNTU OS
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Scrollytelling Grid */}
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-20 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Side: Scrollable Information Content */}
        <div className="space-y-32 py-12 lg:py-20 pr-0 lg:pr-6">
          {slides.map((slide, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) slideRefs.current[i] = el;
              }}
              className={`transition-all duration-700 min-h-[70vh] flex flex-col justify-center border-l-2 pl-6 sm:pl-8 ${
                activeSlide === i
                  ? 'border-orange-500 opacity-100'
                  : 'border-white/5 opacity-30 blur-[0.5px]'
              }`}
            >
              <div className="font-mono text-xs text-orange-400 tracking-[0.25em] uppercase mb-3 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                STAGE {String(i + 1).padStart(2, '0')} • {slide.subtitle}
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-8 bg-linear-to-r from-white via-white to-slate-400 bg-clip-text text-transparent">
                {slide.title}
              </h2>
              <div className="space-y-4 text-slate-400 text-sm sm:text-base leading-relaxed font-light font-sans">
                {slide.paragraphs.map((para, index) => (
                  <p key={index} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500/80 mt-2.5 shrink-0" />
                    <span>
                      {para.includes(':') ? (
                        <>
                          <strong className="text-orange-400 font-semibold">
                            {para.split(':')[0]}:
                          </strong>
                          {para.substring(para.indexOf(':') + 1)}
                        </>
                      ) : (
                        para
                      )}
                    </span>
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Sticky Visualizer Dashboard Container */}
        <div className="hidden lg:flex h-screen sticky top-0 items-center py-24">
          <div className="w-full h-[70vh] border border-white/10 bg-[#0d010d]/50 backdrop-blur-md rounded-3xl overflow-hidden relative shadow-[0_0_80px_rgba(233,84,32,0.07)] flex flex-col justify-between">
            {/* Top HUD Frame */}
            <div className="border-b border-white/5 bg-[#150315]/50 px-6 py-3 flex items-center justify-between text-[10px] font-mono text-slate-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-500" />
                <span>MONITORING STREAM 0{activeSlide + 1}</span>
              </div>
              <span className="tracking-widest">ACTIVE_NODE_DECRYPT</span>
            </div>

            {/* Visual Workspace */}
            <div className="flex-1 overflow-hidden relative">
              <div className={activeSlide === 0 ? "h-full w-full" : "hidden"}>
                <WhatIsUbuntuVisual />
              </div>
              <div className={activeSlide === 1 ? "h-full w-full" : "hidden"}>
                <BootInstallVisual />
              </div>
              <div className={activeSlide === 2 ? "h-full w-full" : "hidden"}>
                <TerminalVisual />
              </div>
              <div className={activeSlide === 3 ? "h-full w-full" : "hidden"}>
                <ArchitectureVisual />
              </div>
              <div className={activeSlide === 4 ? "h-full w-full" : "hidden"}>
                <FileSystemVisual />
              </div>
            </div>

            {/* Bottom HUD Frame */}
            <div className="border-t border-white/5 bg-[#150315]/50 px-6 py-3 flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span>BUFFER_STATUS: STABLE</span>
              <span>
                SLIDE {activeSlide + 1} / {slides.length}
              </span>
            </div>

            {/* Corner Decorative Elements */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-orange-500/25" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-orange-500/25" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-orange-500/25" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-orange-500/25" />
          </div>
        </div>
      </div>
    </main>
  );
}
