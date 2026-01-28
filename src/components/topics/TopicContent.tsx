import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Topic } from '@/content/topics';

interface TopicContentProps {
    topic: Topic;
}

export default function TopicContent({ topic }: TopicContentProps) {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Introduction Section */}
            <section className="glass rounded-xl p-8">
                <h2 className="text-2xl font-bold mb-4 text-primary">Introduction</h2>
                <p className="text-lg leading-relaxed text-foreground/90 whitespace-pre-line">
                    {topic.introduction}
                </p>
            </section>

            {/* Why This Concept Is Needed */}
            <section className="glass rounded-xl p-8">
                <h2 className="text-2xl font-bold mb-6 text-primary">{topic.whyNeeded.heading}</h2>

                <div className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-red-500/10 border-red-500/30">
                        <CardHeader>
                            <CardTitle className="text-red-400 flex items-center gap-2">
                                <span className="text-2xl">❌</span> Problems Before
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                {topic.whyNeeded.problems?.map((problem, i) => (
                                    <li key={i} className="flex items-start gap-2 text-foreground/80">
                                        <span className="text-red-400 mt-1">•</span>
                                        {problem}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="bg-green-500/10 border-green-500/30">
                        <CardHeader>
                            <CardTitle className="text-green-400 flex items-center gap-2">
                                <span className="text-2xl">✓</span> Solutions Provided
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                {topic.whyNeeded.solutions?.map((solution, i) => (
                                    <li key={i} className="flex items-start gap-2 text-foreground/80">
                                        <span className="text-green-400 mt-1">•</span>
                                        {solution}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Core Concept Explanation */}
            <section className="glass rounded-xl p-8">
                <h2 className="text-2xl font-bold mb-4 text-primary">{topic.coreExplanation.heading}</h2>
                <p className="text-lg leading-relaxed text-foreground/90 mb-6">
                    {topic.coreExplanation.content}
                </p>

                {/* Key Terms */}
                <h3 className="text-xl font-semibold mb-4 text-foreground">Key Terms</h3>
                <Accordion type="single" collapsible className="w-full">
                    {topic.coreExplanation.keyTerms?.map((term, i) => (
                        <AccordionItem key={i} value={`term-${i}`} className="border-border/50">
                            <AccordionTrigger className="text-left hover:text-primary">
                                <span className="font-semibold">{term.term}</span>
                            </AccordionTrigger>
                            <AccordionContent className="text-foreground/80">
                                {term.definition}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>

                {/* Working Steps */}
                <h3 className="text-xl font-semibold mt-8 mb-4 text-foreground">How It Works (Step by Step)</h3>
                <ol className="space-y-3">
                    {topic.coreExplanation.workingSteps?.map((step, i) => (
                        <li key={i} className="flex items-start gap-4">
                            <span className="flex-shrink-0 w-8 h-8 bg-primary/20 text-primary rounded-full flex items-center justify-center font-bold text-sm">
                                {i + 1}
                            </span>
                            <span className="text-foreground/80 pt-1">{step}</span>
                        </li>
                    ))}
                </ol>
            </section>

            {/* Worked Example */}
            <section className="glass rounded-xl p-8">
                <h2 className="text-2xl font-bold mb-4 text-primary">{topic.workedExample.heading}</h2>
                <p className="text-lg text-foreground/90 mb-6">
                    {topic.workedExample.scenario}
                </p>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-primary/20">
                                <th className="border border-border/50 px-4 py-3 text-left">Step</th>
                                <th className="border border-border/50 px-4 py-3 text-left">Page</th>
                                <th className="border border-border/50 px-4 py-3 text-left">RAM State</th>
                                <th className="border border-border/50 px-4 py-3 text-left">Action</th>
                                <th className="border border-border/50 px-4 py-3 text-left">Result</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topic.workedExample.steps.map((step, i) => (
                                <tr key={i} className="hover:bg-primary/5">
                                    <td className="border border-border/50 px-4 py-3 font-mono">{step.step}</td>
                                    <td className="border border-border/50 px-4 py-3 font-mono">{step.pageRequested}</td>
                                    <td className="border border-border/50 px-4 py-3 font-mono text-sm">{step.ramState}</td>
                                    <td className="border border-border/50 px-4 py-3 text-sm">{step.action}</td>
                                    <td className={`border border-border/50 px-4 py-3 font-semibold ${step.result === 'Page Hit' ? 'text-green-400' : 'text-yellow-400'
                                        }`}>
                                        {step.result}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Card className="mt-6 bg-primary/10 border-primary/30">
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary">{topic.workedExample.summary.totalReferences}</div>
                                <div className="text-sm text-muted-foreground">Total References</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-yellow-400">{topic.workedExample.summary.pageFaults}</div>
                                <div className="text-sm text-muted-foreground">Page Faults</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-400">{topic.workedExample.summary.pageHits}</div>
                                <div className="text-sm text-muted-foreground">Page Hits</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-cyan-400">{topic.workedExample.summary.hitRatio}</div>
                                <div className="text-sm text-muted-foreground">Hit Ratio</div>
                            </div>
                        </div>
                        <p className="text-foreground/80 text-center">{topic.workedExample.summary.conclusion}</p>
                    </CardContent>
                </Card>
            </section>

            {/* Real-Life Analogy */}
            <section className="glass rounded-xl p-8">
                <h2 className="text-2xl font-bold mb-2 text-primary">{topic.realLifeAnalogy.heading}</h2>
                <h3 className="text-xl text-foreground/80 mb-6">{topic.realLifeAnalogy.title}</h3>

                <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg p-6 mb-6">
                    <p className="text-lg leading-relaxed text-foreground/90 whitespace-pre-line">
                        {topic.realLifeAnalogy.analogy}
                    </p>
                </div>

                <h4 className="text-lg font-semibold mb-4">Mapping to Technical Concepts</h4>
                <div className="grid md:grid-cols-2 gap-3">
                    {topic.realLifeAnalogy.mapping.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 bg-secondary/50 rounded-lg p-3">
                            <span className="text-primary font-semibold">{item.real}</span>
                            <span className="text-muted-foreground">→</span>
                            <span className="text-foreground/80">{item.technical}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Advantages and Limitations */}
            <section className="grid md:grid-cols-2 gap-6">
                <Card className="glass border-green-500/30">
                    <CardHeader>
                        <CardTitle className="text-green-400 flex items-center gap-2">
                            <span className="text-2xl">✓</span> Advantages
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {topic.advantages.map((adv, i) => (
                            <div key={i}>
                                <h4 className="font-semibold text-foreground">{adv.title}</h4>
                                <p className="text-sm text-foreground/70">{adv.description}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card className="glass border-red-500/30">
                    <CardHeader>
                        <CardTitle className="text-red-400 flex items-center gap-2">
                            <span className="text-2xl">⚠</span> Limitations
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {topic.limitations.map((lim, i) => (
                            <div key={i}>
                                <h4 className="font-semibold text-foreground">{lim.title}</h4>
                                <p className="text-sm text-foreground/70">{lim.description}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </section>

            {/* Common Confusions */}
            <section className="glass rounded-xl p-8">
                <h2 className="text-2xl font-bold mb-6 text-primary flex items-center gap-2">
                    <span className="text-3xl">💡</span> Common Student Confusions
                </h2>
                <div className="space-y-4">
                    {topic.commonConfusions.map((conf, i) => (
                        <Card key={i} className="bg-yellow-500/5 border-yellow-500/20">
                            <CardContent className="pt-6">
                                <div className="flex items-start gap-4">
                                    <span className="text-2xl">❌</span>
                                    <div>
                                        <p className="font-semibold text-yellow-400 mb-2">{conf.confusion}</p>
                                        <div className="flex items-start gap-2">
                                            <span className="text-green-400">✓</span>
                                            <p className="text-foreground/80">{conf.reality}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Exam Answer */}
            <section className="glass rounded-xl p-8 gradient-border">
                <h2 className="text-2xl font-bold mb-4 text-primary flex items-center gap-2">
                    <span className="text-3xl">📝</span> {topic.examAnswer.heading}
                </h2>

                <div className="space-y-6">
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Definition</h3>
                        <p className="text-foreground/90">{topic.examAnswer.definition}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-2">Key Points</h3>
                        <ul className="space-y-1">
                            {topic.examAnswer.keyPoints.map((point, i) => (
                                <li key={i} className="flex items-start gap-2 text-foreground/80">
                                    <span className="text-primary">•</span> {point}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <h3 className="font-semibold text-lg mb-2 text-green-400">Advantages</h3>
                            <ul className="space-y-1">
                                {topic.examAnswer.advantages.map((adv, i) => (
                                    <li key={i} className="flex items-start gap-2 text-foreground/80">
                                        <span className="text-green-400">•</span> {adv}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg mb-2 text-red-400">Disadvantages</h3>
                            <ul className="space-y-1">
                                {topic.examAnswer.disadvantages.map((dis, i) => (
                                    <li key={i} className="flex items-start gap-2 text-foreground/80">
                                        <span className="text-red-400">•</span> {dis}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-2">Conclusion</h3>
                        <p className="text-foreground/90">{topic.examAnswer.conclusion}</p>
                    </div>
                </div>
            </section>

            {/* Summary */}
            <section className="glass rounded-xl p-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
                <h2 className="text-2xl font-bold mb-6 text-primary flex items-center gap-2">
                    <span className="text-3xl">📌</span> Final Summary
                </h2>
                <ul className="space-y-3">
                    {topic.summary.map((point, i) => (
                        <li key={i} className="flex items-start gap-3 text-lg">
                            <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                                {i + 1}
                            </span>
                            <span className="text-foreground/90">{point}</span>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}
