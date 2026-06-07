'use client';

import { useState, useEffect, useRef } from 'react';

export default function TerminalVisual() {
  const [history, setHistory] = useState<
    Array<{ cmd: string; output: string }>
  >([
    {
      cmd: '',
      output:
        'Welcome to the Ubuntu Bash Console Simulator.\nType commands in the input box below or click the shortcut buttons above.\nType "help" for a list of available utilities.',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const commandResponses: Record<string, string> = {
    help: 'Available commands:\n  ls              List directory contents\n  pwd             Print working directory\n  uname -a        Print kernel and motherboard build info\n  cat welcome.txt Display greeting contents\n  sudo apt update Update packages software repositories\n  clear           Clear console screen',
    ls: 'Documents  Downloads  Music  Pictures  Public  Templates  Videos  welcome.txt',
    pwd: '/home/ravi',
    'uname -a':
      'Linux ubuntu-desktop 6.8.0-31-generic #31-Ubuntu SMP PREEMPT_DYNAMIC Thu Apr 11 20:30:12 UTC 2026 x86_64 x86_64 x86_64 GNU/Linux',
    'cat welcome.txt':
      'Welcome to Ubuntu Linux OS!\nMastering the Command Line Interface (CLI) is the core key to system configuration.',
    'sudo apt update':
      'Get:1 http://security.ubuntu.com/ubuntu noble-security InRelease [126 kB]\nHit:2 http://archive.ubuntu.com/ubuntu noble InRelease\nHit:3 http://archive.ubuntu.com/ubuntu noble-updates InRelease\nFetched 126 kB in 0.8s (157 kB/s)\nReading package lists... Done.\nAll packages are up to date.',
  };

  const handleCommandSubmit = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    if (trimmed.toLowerCase() === 'clear') {
      setHistory([]);
      setInputValue('');
      return;
    }

    const response =
      commandResponses[trimmed] ||
      `bash: command not found: ${trimmed}\nType "help" to see available commands.`;

    setHistory((prev) => [...prev, { cmd: trimmed, output: response }]);
    setInputValue('');
  };

  // Scroll to bottom whenever history changes
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-6 font-mono select-none">
      <div>
        <h4 className="text-xs text-orange-400 tracking-wider mb-2 text-center uppercase">
          LIVE INTERACTIVE BASH SHELL
        </h4>

        {/* Quick Command Buttons */}
        <div className="flex flex-wrap gap-1.5 justify-center mb-3 max-w-lg mx-auto w-full">
          {[
            'help',
            'ls',
            'pwd',
            'uname -a',
            'cat welcome.txt',
            'sudo apt update',
            'clear',
          ].map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommandSubmit(cmd)}
              className="px-2 py-0.5 text-[10px] rounded border bg-slate-900 border-white/10 hover:border-orange-500 text-slate-400 hover:text-white cursor-pointer transition-all"
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>

      {/* Terminal Screen Console */}
      <div className="w-full max-w-lg mx-auto bg-black border border-white/15 rounded-xl p-3 text-xs text-slate-300 shadow-2xl h-56 flex flex-col justify-between overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-1.5 shrink-0 text-slate-500 text-[10px]">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span className="w-2 h-2 rounded-full bg-yellow-500" />
            <span className="w-2 h-2 rounded-full bg-green-500" />
          </div>
          <span>ravi@ubuntu: ~</span>
        </div>

        {/* Scrollable outputs */}
        <div className="flex-1 overflow-y-auto text-[11px] leading-relaxed pr-1 mb-2 text-emerald-400 space-y-2">
          {history.map((item, idx) => (
            <div key={idx}>
              {item.cmd && (
                <div className="text-white font-bold">
                  ravi@ubuntu:~${' '}
                  <span className="text-orange-300">{item.cmd}</span>
                </div>
              )}
              <pre className="whitespace-pre-wrap mt-0.5 text-emerald-500/90">
                {item.output}
              </pre>
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Console Input Line */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCommandSubmit(inputValue);
          }}
          className="flex items-center border-t border-white/10 pt-1.5 shrink-0"
        >
          <span className="text-white font-bold mr-1.5">ravi@ubuntu:~$</span>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 bg-transparent border-0 outline-hidden focus:outline-hidden p-0 m-0 text-orange-300 text-[11px] font-mono caret-orange-500"
            placeholder="Type command here..."
          />
        </form>
      </div>
    </div>
  );
}
