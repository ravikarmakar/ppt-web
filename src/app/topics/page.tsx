import Link from 'next/link';
import { getAllTopics } from '@/content/topics';
import TopicCard from '@/components/topics/TopicCard';
import { Button } from '@/components/ui/button';

export const metadata = {
    title: 'OS Topics | Operating Systems Visual Learning',
    description: 'Explore operating system concepts through interactive visualizations and detailed explanations.',
};

export default function TopicsPage() {
    const topics = getAllTopics();

    return (
        <main className="min-h-screen py-20 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <Link href="/" className="inline-block mb-8">
                        <Button variant="ghost" className="gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Home
                        </Button>
                    </Link>

                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Operating System Topics
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Choose a topic to explore. Each topic includes detailed explanations,
                        worked examples, real-life analogies, and exam-ready content.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Manual Card for Memory Management (Special 3D Module) */}
                    <Link href="/memory-management" className="group relative block h-full">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl opacity-20 group-hover:opacity-100 blur transition duration-500" />
                        <div className="relative h-full bg-slate-950 border border-white/10 rounded-xl p-6 flex flex-col hover:bg-slate-900 transition-colors">
                            <div className="w-12 h-12 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4 text-2xl">
                                🧠
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Memory Management</h3>
                            <p className="text-muted-foreground flex-grow">
                                Immersive 3D visualization of RAM, HDD, and memory hierarchy.
                            </p>
                            <div className="mt-4 pt-4 border-t border-white/5 flex items-center text-sm text-blue-400">
                                <span>Launch 3D Scene</span>
                                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </div>
                        </div>
                    </Link>

                    {topics.map((topic) => (
                        <TopicCard key={topic.slug} topic={topic} />
                    ))}
                </div>

                {/* Coming Soon Placeholder */}
                <div className="mt-12 text-center">
                    <p className="text-muted-foreground">
                        More topics coming soon: Page Replacement Algorithms, Segmentation, Thrashing, and more...
                    </p>
                </div>
            </div>
        </main>
    );
}
