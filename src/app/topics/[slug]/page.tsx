import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTopicBySlug, getAllTopics } from '@/content/topics';
import TopicContent from '@/components/topics/TopicContent';
import { Button } from '@/components/ui/button';

interface TopicPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const topics = getAllTopics();
    return topics.map((topic) => ({
        slug: topic.slug,
    }));
}

export async function generateMetadata({ params }: TopicPageProps) {
    const { slug } = await params;
    const topic = getTopicBySlug(slug);

    if (!topic) {
        return { title: 'Topic Not Found' };
    }

    return {
        title: `${topic.title} | OS Visual Learning`,
        description: topic.description,
    };
}

export default async function TopicPage({ params }: TopicPageProps) {
    const { slug } = await params;
    const topic = getTopicBySlug(slug);

    if (!topic) {
        notFound();
    }

    return (
        <main className="min-h-screen py-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Navigation */}
                <div className="flex items-center justify-between mb-8">
                    <Link href="/topics">
                        <Button variant="ghost" className="gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Topics
                        </Button>
                    </Link>

                    <Link href={`/presentation?topic=${slug}`}>
                        <Button variant="outline" className="gap-2 border-primary/50 hover:bg-primary/10">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Presentation Mode
                        </Button>
                    </Link>
                </div>

                {/* Topic Header */}
                <header className="text-center mb-12">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <span className="text-5xl">{topic.icon}</span>
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            {topic.title}
                        </h1>
                    </div>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        {topic.description}
                    </p>
                </header>

                {/* Topic Content */}
                <TopicContent topic={topic} />
            </div>
        </main>
    );
}
