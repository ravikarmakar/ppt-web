import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Topic } from '@/content/topics';

interface TopicCardProps {
    topic: Topic;
}

export default function TopicCard({ topic }: TopicCardProps) {
    return (
        <Link href={`/topics/${topic.slug}`} className="group">
            <Card className="h-full bg-card/50 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
                <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-4xl">{topic.icon}</span>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                            {topic.title}
                        </CardTitle>
                    </div>
                    <CardDescription className="text-muted-foreground line-clamp-2">
                        {topic.description}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center text-sm text-primary">
                        <span>Learn more</span>
                        <svg
                            className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
