export interface Slide {
  title: string;
  subtitle: string;
  paragraphs: string[];
}

export const slides: Slide[] = [
  {
    title: 'What is Ubuntu Linux?',
    subtitle: "THE WORLD'S LEADING OPEN-SOURCE OPERATING SYSTEM",
    paragraphs: [
      'Open-Source System: A completely free, community-driven open-source operating system.',
      'Debian-Based Core: Built on the highly secure and stable Debian distribution base.',
      'Cloud Dominance: The industry-standard OS for deploying cloud instances on AWS, Azure, and GCP.',
      'LTS Support Cycles: New features every 6 months, with 5-year LTS support every 2 years.',
    ],
  },
  {
    title: 'How to Install Ubuntu',
    subtitle: 'STEP-BY-STEP OS INSTALLATION AND BOOT SETUP',
    paragraphs: [
      'Bootable USB Device: Load the OS installer environment directly from a flash drive.',
      'System Configuration: Pick keyboard layouts, timezone locales, and network hooks.',
      'Disk Partitioning: Auto-erase the primary drive or configure advanced layout spaces.',
      'User Profile Setup: Establish system hostname, default username, and passwords.',
    ],
  },
  {
    title: 'Basic Ubuntu Commands',
    subtitle: 'COMMAND LINE INTERFACE & SYSTEM ADMINISTRATION',
    paragraphs: [
      'Unified Filesystem: Access all physical drives under a single, unified root directory.',
      'Bash Command Prompt: Interact with kernel modules using standard text commands.',
      'Root Administration: Elevate account authority safely using the sudo utility.',
      'Software Repositories: Install, update, and manage programs with the apt tool.',
    ],
  },
  {
    title: 'Ubuntu System Architecture',
    subtitle: 'UNDERSTANDING THE OS KERNEL & USERSPACE LAYERS',
    paragraphs: [
      'Userspace Applications: Runs user GUI applications, shell terminals, and local programs.',
      'System Services: Managed by systemd to run background daemons and network managers.',
      'Linux Kernel Core: The heart of the OS connecting software APIs directly to CPU/RAM registers.',
      'Hardware Driver Layer: Low-level modules managing network cards, graphics adapters, and disks.',
    ],
  },
  {
    title: 'File System Hierarchy',
    subtitle: 'DIRECTORY LAYOUTS & SYSTEM ENVIRONMENT LOCATIONS',
    paragraphs: [
      'Root Mount Point (/): The parent directory containing all system volumes, devices, and files.',
      'Configuration Files (/etc): Houses all static application configuration scripts and service settings.',
      'Home Directories (/home): Personal workspace directories storing user files and settings.',
      'Variables & Logs (/var): Houses dynamic run data, spool queues, and background log streams.',
    ],
  },
];
