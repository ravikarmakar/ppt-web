'use client';

import { useState, useEffect } from 'react';

export default function BootInstallVisual() {
  const [step, setStep] = useState(0);
  const [username, setUsername] = useState('ravi');
  const [hostname, setHostname] = useState('ubuntu-pc');
  const [progress, setProgress] = useState(0);
  const [installType, setInstallType] = useState('normal');

  // Automatically tick progress bar up on Step 6
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (step === 6) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 350);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [step]);

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 relative select-none font-mono text-slate-300">
      {/* Progress Path Indicator */}
      <div className="flex justify-between items-center px-4 py-2 bg-neutral-950/50 rounded-lg text-[9px] text-slate-500 border border-white/5 mb-4 overflow-x-auto">
        {[
          'Boot Device',
          'GRUB Menu',
          'Welcome OS',
          'Apps Setup',
          'Partition',
          'User Setup',
          'Installing',
          'Complete',
        ].map((name, i) => (
          <span
            key={i}
            className={`transition-colors whitespace-nowrap px-1 ${
              i === step
                ? 'text-orange-400 font-bold'
                : i < step
                  ? 'text-orange-600'
                  : ''
            }`}
          >
            {name}
          </span>
        ))}
      </div>

      {/* Main Installer Frame simulating the GUI */}
      <div className="flex-1 border border-white/10 bg-slate-900/40 rounded-2xl overflow-hidden flex flex-col justify-between min-h-[260px] relative">
        {/* Step 0: BIOS / Boot Menu */}
        {step === 0 && (
          <div className="p-4 flex-1 bg-blue-950/15 flex flex-col justify-between text-xs">
            <div>
              <div className="text-center text-white font-bold border-b border-white/10 pb-1.5 mb-3">
                SYSTEM BIOS V4.02 - BOOT DEVICE MENU
              </div>
              <p className="text-slate-400 mb-4 text-[10px]">
                Select secondary boot peripheral:
              </p>
              <div className="space-y-1.5 max-w-xs mx-auto">
                <div className="p-2 bg-neutral-950/40 border border-white/5 rounded text-slate-500 line-through">
                  1. SATA SSD (Host Local Drive)
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="w-full text-left p-2 bg-orange-500/10 border border-orange-500/40 text-orange-400 rounded hover:bg-orange-500/20 cursor-pointer flex items-center justify-between transition-all duration-300"
                >
                  <span>2. USB STORAGE DEVICE (Ubuntu LTS ISO)</span>
                  <span className="text-[10px] animate-pulse">◀ SELECT</span>
                </button>
                <div className="p-2 bg-neutral-950/40 border border-white/5 rounded text-slate-500 line-through">
                  3. Network PXE boot loader
                </div>
              </div>
            </div>
            <div className="text-slate-500 text-[9px] text-center">
              Configure BIOS hooks to run installer environment directly from
              flash memory.
            </div>
          </div>
        )}

        {/* Step 1: GNU GRUB Menu */}
        {step === 1 && (
          <div className="p-4 flex-1 bg-black flex flex-col justify-between text-xs">
            <div>
              <div className="text-white font-bold border-b border-white/10 pb-1.5 mb-4 text-[11px]">
                GNU GRUB version 2.12
              </div>
              <div className="space-y-2 max-w-xs mx-auto">
                <button
                  onClick={() => setStep(2)}
                  className="w-full text-left p-2 bg-white/10 border border-white/30 text-white rounded cursor-pointer flex items-center justify-between"
                >
                  <span>*Try or Install Ubuntu</span>
                  <span className="text-[9px] text-slate-400">ENTER</span>
                </button>
                <div className="p-2 text-slate-650 border border-transparent">
                  Ubuntu (safe graphics mode)
                </div>
                <div className="p-2 text-slate-650 border border-transparent">
                  UEFI Firmware Settings
                </div>
              </div>
            </div>
            <div className="text-slate-600 text-[9px] text-center">
              Select GRUB hook to initialize the kernel modules boot sequence.
            </div>
          </div>
        )}

        {/* Step 2: Welcome Screen */}
        {step === 2 && (
          <div className="p-4 flex-1 bg-linear-to-br from-[#2c001e] to-[#77216f] flex flex-col justify-between text-xs">
            <div className="text-center mt-2">
              <div className="text-lg font-bold text-white mb-1">
                Welcome to Ubuntu
              </div>
              <p className="text-slate-300 text-[10px]">
                Select installation workflow preference.
              </p>
            </div>
            <div className="flex gap-4 justify-center mb-4">
              <div className="p-3 w-32 border border-white/20 bg-black/30 rounded-xl text-center opacity-50 text-slate-400 text-[10px]">
                <div className="text-lg mb-1">💻</div>
                <strong>Try Ubuntu</strong>
                <p className="text-[8px] mt-1">
                  Run OS live from USB without writing disk.
                </p>
              </div>
              <button
                onClick={() => setStep(3)}
                className="p-3 w-32 border border-orange-500 bg-orange-500/20 text-orange-200 rounded-xl text-center cursor-pointer hover:bg-orange-500/30 hover:scale-105 transition-all"
              >
                <div className="text-lg mb-1">💿</div>
                <strong>Install Ubuntu</strong>
                <p className="text-[8px] text-orange-400 mt-1">
                  Wipe drive and begin setup.
                </p>
              </button>
            </div>
            <div className="text-[9px] text-purple-300 text-center">
              Requires minimum 25 GB of storage space.
            </div>
          </div>
        )}

        {/* Step 3: Keyboard and Installation Type */}
        {step === 3 && (
          <div className="p-4 flex-1 bg-[#2c001e] flex flex-col justify-between text-xs">
            <div>
              <div className="text-white font-bold mb-2">
                Updates and Software Setup
              </div>
              <div className="space-y-2.5 max-w-sm mx-auto text-[10px] text-slate-300">
                <div className="flex justify-between items-center border-b border-white/5 pb-1.5">
                  <span className="text-slate-400">Keyboard Layout:</span>
                  <span className="text-white font-bold">English (US)</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-1">
                    What apps would you like to install?
                  </span>
                  <div className="flex flex-col gap-1.5 mt-1">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="inst"
                        checked={installType === 'normal'}
                        onChange={() => setInstallType('normal')}
                        className="accent-orange-500"
                      />
                      <span>
                        Normal Installation (Web Browser, Office, Media Player)
                      </span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="inst"
                        checked={installType === 'minimal'}
                        onChange={() => setInstallType('minimal')}
                        className="accent-orange-500"
                      />
                      <span>
                        Minimal Installation (Browser + basic tools only)
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center border-t border-white/10 pt-2">
              <button
                onClick={() => setStep(2)}
                className="px-3 py-1 border border-white/10 rounded hover:text-white hover:bg-white/5 cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white rounded cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Partitioning */}
        {step === 4 && (
          <div className="p-4 flex-1 bg-[#2c001e] flex flex-col justify-between text-xs">
            <div>
              <div className="text-white font-bold mb-2">
                Partition Allocation
              </div>
              <p className="text-slate-400 text-[10px] mb-3">
                Choose installation type options:
              </p>
              <div className="space-y-2 max-w-sm mx-auto">
                <button
                  onClick={() => setStep(5)}
                  className="w-full text-left p-2 border border-orange-500/40 bg-orange-500/5 hover:bg-orange-500/10 rounded-lg cursor-pointer flex items-center justify-between text-[10px] text-orange-200"
                >
                  <div>
                    <strong>Erase disk and install Ubuntu</strong>
                    <p className="text-[8px] text-slate-500 mt-0.5">
                      Automated partitioning with ext4 filesystem format.
                    </p>
                  </div>
                  <span className="text-orange-400">[SELECTED]</span>
                </button>
                <div className="p-2 border border-white/5 bg-neutral-950/20 rounded-lg text-[10px] text-slate-500 opacity-60">
                  <strong>Something else (Advanced partitioning)</strong>
                  <p className="text-[8px] mt-0.5">
                    Manually configure root (/), home (/home), and swap space.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center border-t border-white/10 pt-2">
              <button
                onClick={() => setStep(3)}
                className="px-3 py-1 border border-white/10 rounded hover:text-white hover:bg-white/5 cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={() => setStep(5)}
                className="px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white rounded cursor-pointer"
              >
                Install Now
              </button>
            </div>
          </div>
        )}

        {/* Step 5: User Setup */}
        {step === 5 && (
          <div className="p-4 flex-1 bg-[#2c001e] flex flex-col justify-between text-xs">
            <div>
              <div className="text-white font-bold mb-2">Who are you?</div>
              <div className="grid grid-cols-2 gap-2.5 text-[10px] max-w-sm mx-auto">
                <div className="flex flex-col gap-0.5">
                  <span className="text-slate-400">Your name:</span>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="p-1 bg-black/40 border border-white/10 rounded text-white focus:border-orange-500 focus:outline-hidden"
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-slate-400">Computer name:</span>
                  <input
                    type="text"
                    value={hostname}
                    onChange={(e) => setHostname(e.target.value)}
                    className="p-1 bg-black/40 border border-white/10 rounded text-white focus:border-orange-500 focus:outline-hidden"
                  />
                </div>
                <div className="flex flex-col gap-0.5 col-span-2">
                  <span className="text-slate-400">Password:</span>
                  <input
                    type="password"
                    disabled
                    value="password123"
                    className="p-1 bg-black/60 border border-white/5 rounded text-slate-500 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center border-t border-white/10 pt-2">
              <button
                onClick={() => setStep(4)}
                className="px-3 py-1 border border-white/10 rounded hover:text-white hover:bg-white/5 cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={() => {
                  setProgress(0);
                  setStep(6);
                }}
                className="px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white rounded cursor-pointer"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 6: Progress Bar */}
        {step === 6 && (
          <div className="p-4 flex-1 bg-linear-to-br from-[#2c001e] to-[#77216f] flex flex-col justify-between text-xs">
            <div>
              <div className="text-white font-bold mb-1">
                Installing Ubuntu System...
              </div>
              <p className="text-slate-350 text-[9px] mb-4">
                Copying system files, extracting kernel headers, configuring
                bootloader hooks.
              </p>

              <div className="bg-black/40 border border-white/10 rounded-full h-4 overflow-hidden relative mb-2">
                <div
                  className="bg-orange-500 h-full transition-all duration-350 shadow-[0_0_10px_rgba(233,84,32,0.8)]"
                  style={{ width: `${progress}%` }}
                />
                <span className="absolute inset-0 flex items-center justify-center text-[8px] text-white font-bold">
                  {progress}% Complete
                </span>
              </div>
            </div>

            {progress < 100 ? (
              <div className="text-center text-[8px] text-slate-400 italic">
                Almost finished. Please do not power off or restart the physical
                machine.
              </div>
            ) : (
              <button
                onClick={() => setStep(7)}
                className="w-full py-1 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded cursor-pointer transition-all animate-pulse text-[10px]"
              >
                PROCEED TO COMPLETION
              </button>
            )}
          </div>
        )}

        {/* Step 7: Completed */}
        {step === 7 && (
          <div className="p-4 flex-1 bg-linear-to-br from-[#2c001e] to-[#77216f] flex flex-col justify-between text-xs text-center">
            <div className="my-auto">
              <span className="text-3xl block mb-2">🎉</span>
              <div className="text-sm font-bold text-white mb-2">
                Installation Complete!
              </div>
              <p className="text-slate-300 text-[10px] leading-relaxed max-w-xs mx-auto">
                Ubuntu OS is successfully loaded. Welcome to your new desktop
                workspace, <strong>{username}</strong>!
              </p>
            </div>
            <button
              onClick={() => {
                setStep(0);
                setProgress(0);
              }}
              className="mt-4 px-4 py-1.5 border border-orange-500 bg-orange-500/20 text-orange-300 hover:bg-orange-500/35 rounded-lg cursor-pointer max-w-xs mx-auto w-full transition-colors text-[10px]"
            >
              RESTART SIMULATOR ↺
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
