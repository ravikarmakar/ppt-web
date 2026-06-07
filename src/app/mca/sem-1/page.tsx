import Link from 'next/link';

export const metadata = {
  title: 'MCA Semester 1 | Curriculum & Topics',
  description:
    'Explore subjects and labs for MCA Semester 1 including Data Structures, OS Concepts, and Database Systems.',
};

interface Subject {
  code: string;
  title: string;
  type: 'Core' | 'Elective';
  options?: string[];
}

interface Lab {
  code: string;
  title: string;
  type: 'Lab';
}

const subjects: Subject[] = [
  {
    code: 'MCA101T',
    title: 'Computational Mathematics and Statistics',
    type: 'Core',
  },
  { code: 'MCA102T', title: 'Data Structures using Java', type: 'Core' },
  {
    code: 'MCA103T',
    title: 'Operating System Concepts and Design',
    type: 'Core',
  },
  {
    code: 'MCA104T',
    title: 'Advanced Database Management Systems',
    type: 'Core',
  },
  { code: 'MCA105T', title: 'Software Project Management', type: 'Core' },
  {
    code: 'MCA101E',
    title: 'Mobile Computing',
    type: 'Elective',
    options: ['a. Mobile Computing', 'b. Software Testing with Selenium'],
  },
];

const labs: Lab[] = [
  { code: 'MCA101P', title: 'Data Structures using Java Lab', type: 'Lab' },
  { code: 'MCA102P', title: 'Database Management Systems Lab', type: 'Lab' },
];

export default function Semester1Page() {
  return (
    <main className="min-h-screen py-24 px-4 md:px-8 relative overflow-hidden bg-[#0a0f1a]">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Page Header */}
        <div className="text-center md:text-left mb-12 border-b border-white/10 pb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/5 hover:bg-blue-500/10 border border-white/10 hover:border-blue-500/30 text-xs font-mono text-slate-400 hover:text-blue-400 mb-6 transition-all"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>COURSE MODULES • SEMESTER 1</span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent mb-4">
            Master of Computer Applications (MCA)
          </h1>
          <p className="text-slate-400 text-lg max-w-3xl">
            First semester foundational coursework. Covers core computer science
            principles, mathematical frameworks, modern programming systems, and
            databases.
          </p>
        </div>

        {/* Theory Subjects */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
              📚
            </div>
            <h2 className="text-2xl font-bold text-white">Theory Subjects</h2>
            <span className="text-sm font-mono text-slate-500 bg-white/5 px-2 py-0.5 rounded-md">
              6 Courses
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((sub) => (
              <div
                key={sub.code}
                className="group relative rounded-2xl bg-slate-900/40 border border-white/10 p-6 backdrop-blur-md hover:border-blue-500/35 hover:bg-slate-900/60 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
              >
                {/* Visual Accent Glow on Hover */}
                <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="flex justify-between items-start mb-4 relative z-10">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-white/5 text-blue-300 border border-white/10">
                    {sub.code}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                        sub.type === 'Elective'
                          ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}
                    >
                      {sub.type}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      4 Credits
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-blue-300 transition-colors relative z-10 line-clamp-2 min-h-[56px]">
                  {sub.title}
                </h3>

                {sub.options ? (
                  <div className="mt-4 pt-4 border-t border-white/5 relative z-10">
                    <span className="text-xs font-semibold text-slate-400 block mb-2">
                      Elective Options:
                    </span>
                    <ul className="space-y-2">
                      {sub.options.map((opt) => {
                        const isSelected = opt.includes('Mobile Computing');
                        return (
                          <li
                            key={opt}
                            className={`text-xs font-medium py-1.5 px-2.5 rounded-md flex items-center justify-between transition-all duration-200 ${
                              isSelected
                                ? 'text-blue-300 bg-blue-500/15 border border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.15)]'
                                : 'text-slate-300 bg-white/5 border border-white/5 opacity-50'
                            }`}
                          >
                            <span>{opt}</span>
                            {isSelected && (
                              <span className="text-[9px] uppercase font-mono font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                                Selected
                              </span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ) : (
                  <div className="text-xs text-slate-500 mt-4 pt-4 border-t border-white/5 relative z-10 flex items-center justify-between">
                    <span>L-T-P-C: 4-0-0-4</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Practical Labs */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              🧪
            </div>
            <h2 className="text-2xl font-bold text-white">Practical Labs</h2>
            <span className="text-sm font-mono text-slate-500 bg-white/5 px-2 py-0.5 rounded-md">
              2 Labs
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {labs.map((lab) => (
              <div
                key={lab.code}
                className="group relative rounded-2xl bg-slate-900/40 border border-white/10 p-6 backdrop-blur-md hover:border-emerald-500/35 hover:bg-slate-900/60 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
              >
                {/* Visual Accent Glow on Hover */}
                <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-emerald-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="flex justify-between items-start mb-4 relative z-10">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-white/5 text-emerald-300 border border-white/10">
                    {lab.code}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {lab.type}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      2 Credits
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors relative z-10 min-h-[56px] flex items-center">
                  {lab.title}
                </h3>

                <div className="text-xs text-slate-500 mt-4 pt-4 border-t border-white/5 relative z-10 flex items-center justify-between">
                  <span>L-T-P-C: 0-0-3-2</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
