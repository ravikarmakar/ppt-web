'use client';

import { useState } from 'react';

export default function FileSystemVisual() {
  const [activeDir, setActiveDir] = useState<string | null>(null);

  const directories = [
    {
      path: '/',
      name: 'Root directory (/)',
      color: 'border-orange-500 bg-orange-950/20 text-orange-300',
      desc: 'The single root of the entire file tree hierarchy. In Linux, all storage partitions, hardware device files, mount points, and processes reside below this folder.',
      contents: ['/bin', '/etc', '/home', '/var', '/usr', '/tmp'],
    },
    {
      path: '/etc',
      name: 'System Configuration (/etc)',
      color: 'border-purple-500 bg-purple-950/20 text-purple-300',
      desc: 'Hosts all host-specific, static configuration file scripts. Changes here modify system-wide network interfaces, security limits, service parameters, and user databases.',
      contents: ['network/', 'security/', 'fstab', 'passwd', 'hosts'],
    },
    {
      path: '/home',
      name: 'User Workspace (/home)',
      color: 'border-blue-500 bg-blue-950/20 text-blue-300',
      desc: 'Personal workspaces for local users. Every user (except root) gets a personal home directory here to store local assets, profile configs, downloads, and workspace documents.',
      contents: ['ravi/', 'guest/', 'downloads/', 'documents/'],
    },
    {
      path: '/var',
      name: 'Variable runtime files (/var)',
      color: 'border-emerald-500 bg-emerald-950/20 text-emerald-300',
      desc: 'Stands for variable files. Contains files that change frequently as the OS runs, such as system logs (/var/log), spool files, database records, and active state directories.',
      contents: ['log/', 'mail/', 'cache/', 'spool/', 'tmp/'],
    },
  ];

  const currentDir = directories.find((d) => d.path === activeDir);

  return (
    <div className="w-full h-full flex flex-col justify-center p-6 relative font-mono text-xs select-none">
      <h4 className="text-xs text-orange-400 tracking-wider mb-4 text-center uppercase">
        FILE SYSTEM DIRECTORY EXPLORER
      </h4>

      {/* Directory Grid */}
      <div className="grid grid-cols-2 gap-2 max-w-sm mx-auto w-full mb-5">
        {directories.map((dir) => (
          <button
            key={dir.path}
            onClick={() => setActiveDir(activeDir === dir.path ? null : dir.path)}
            className={`border rounded-xl p-3 text-center cursor-pointer transition-all duration-350 flex flex-col justify-between items-center ${
              dir.color
            } ${
              activeDir === dir.path
                ? 'scale-105 ring-2 ring-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]'
                : 'opacity-70 hover:opacity-100 hover:scale-[1.02]'
            }`}
          >
            <span className="text-xl mb-1">📁</span>
            <span className="font-bold text-[10px] whitespace-nowrap">{dir.path}</span>
          </button>
        ))}
      </div>

      {/* Details Frame */}
      <div className="min-h-[110px] border border-white/10 bg-slate-950/60 rounded-xl p-3.5 max-w-sm mx-auto w-full text-slate-300 flex flex-col justify-between">
        {currentDir ? (
          <div>
            <div className="font-bold text-white uppercase mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                {currentDir.name}
              </span>
            </div>
            <p className="text-[10px] text-slate-450 leading-relaxed mb-3">
              {currentDir.desc}
            </p>
            <div className="flex flex-wrap gap-1 items-center">
              <span className="text-[8px] text-slate-500 uppercase mr-1">Contents:</span>
              {currentDir.contents.map((item) => (
                <span
                  key={item}
                  className="px-1.5 py-0.5 rounded bg-black/40 border border-white/5 text-[9px] text-orange-400 font-bold"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-slate-500 italic flex items-center justify-center h-full min-h-[80px]">
            Click a directory folder above to traverse directory nodes...
          </div>
        )}
      </div>
    </div>
  );
}
