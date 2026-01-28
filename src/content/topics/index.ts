import { virtualMemory } from './virtual-memory';
import { paging } from './paging';

export interface TopicSection {
    heading: string;
    content?: string;
    problems?: string[];
    solutions?: string[];
    keyTerms?: Array<{ term: string; definition: string }>;
    workingSteps?: string[];
}

export interface WorkedExampleStep {
    step: number;
    pageRequested: number;
    ramState: string;
    action: string;
    result: string;
}

export interface PresentationSlide {
    title: string;
    points: string[];
}

export interface Topic {
    slug: string;
    title: string;
    description: string;
    icon: string;
    introduction: string;
    whyNeeded: TopicSection;
    coreExplanation: TopicSection;
    workedExample: {
        heading: string;
        scenario: string;
        steps: WorkedExampleStep[];
        summary: {
            totalReferences: number;
            pageFaults: number;
            pageHits: number;
            hitRatio: string;
            conclusion: string;
        };
    };
    realLifeAnalogy: {
        heading: string;
        title: string;
        analogy: string;
        mapping: Array<{ real: string; technical: string }>;
    };
    advantages: Array<{ title: string; description: string }>;
    limitations: Array<{ title: string; description: string }>;
    commonConfusions: Array<{ confusion: string; reality: string }>;
    examAnswer: {
        heading: string;
        definition: string;
        keyPoints: string[];
        advantages: string[];
        disadvantages: string[];
        conclusion: string;
    };
    presentationSlides: PresentationSlide[];
    summary: string[];
}

// Export all topics
export const topics: Record<string, Topic> = {
    'virtual-memory': virtualMemory as unknown as Topic,
    'paging': paging as unknown as Topic,
};

// Get all topics as an array
export const getAllTopics = (): Topic[] => {
    return Object.values(topics);
};

// Get a single topic by slug
export const getTopicBySlug = (slug: string): Topic | undefined => {
    return topics[slug];
};

// Export individual topics for direct import
export { virtualMemory, paging };
