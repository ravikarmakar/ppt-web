export const paging = {
    slug: "paging",
    title: "Paging",
    description: "Understand how operating systems divide memory into fixed-size pages for efficient memory management.",
    icon: "📄",

    introduction: `Paging is a memory management scheme that eliminates the need for contiguous allocation of physical memory. It divides physical memory into fixed-size blocks called frames and logical memory into blocks of the same size called pages.

When a process is to be executed, its pages are loaded into any available memory frames from their source (a file system or backing store). Paging allows the physical address space of a process to be non-contiguous.

This technique was developed to solve the problems of external fragmentation and the need to fit varying size chunks into the backing store. Paging is one of the most important concepts in modern operating systems.`,

    whyNeeded: {
        heading: "Why Paging Is Needed",
        problems: [
            "Contiguous memory allocation leads to external fragmentation",
            "Memory holes form when processes of different sizes are loaded and unloaded",
            "Compaction is expensive and time-consuming",
            "Variable-size partitions are hard to manage efficiently",
            "Physical memory addresses are exposed to programs"
        ],
        solutions: [
            "Fixed-size pages eliminate external fragmentation",
            "Any free frame can hold any page",
            "Simple allocation: just find any free frame",
            "Logical addresses become independent of physical locations",
            "Memory protection is easier to implement"
        ]
    },

    coreExplanation: {
        heading: "Core Concept Explanation",
        content: `In paging, the logical address space is divided into pages and the physical address space is divided into frames of the same size. When a process needs memory, its pages can be placed in any available frames.`,
        keyTerms: [
            {
                term: "Page",
                definition: "A fixed-size block in logical/virtual memory, typically 4KB."
            },
            {
                term: "Frame",
                definition: "A fixed-size block in physical memory, same size as a page."
            },
            {
                term: "Page Table",
                definition: "A data structure that stores the mapping from page numbers to frame numbers."
            },
            {
                term: "Page Number (p)",
                definition: "The index of the page in logical memory, used to look up the frame in the page table."
            },
            {
                term: "Page Offset (d)",
                definition: "The offset within the page, combined with the frame base address to get the physical address."
            },
            {
                term: "Page Table Base Register (PTBR)",
                definition: "Points to the page table in memory."
            },
            {
                term: "Translation Lookaside Buffer (TLB)",
                definition: "A hardware cache that stores recent page-to-frame translations for faster lookup."
            }
        ],
        workingSteps: [
            "The CPU generates a logical address",
            "The logical address is divided into page number (p) and offset (d)",
            "The page number is used as an index into the page table",
            "The page table entry gives the frame number",
            "The physical address is formed by combining frame number and offset",
            "Memory is accessed at the physical address"
        ]
    },

    workedExample: {
        heading: "Step-by-Step Worked Example",
        scenario: "Consider a system with page size of 4 bytes, physical memory of 32 bytes (8 frames), and logical address space of 16 bytes (4 pages). We want to translate logical address 5.",
        steps: [
            {
                step: 1,
                pageRequested: 5,
                ramState: "Logical Address = 5",
                action: "Divide logical address into page number and offset. Page size = 4, so we need 2 bits for offset.",
                result: "5 in binary = 0101. Page Number = 01 (1), Offset = 01 (1)"
            },
            {
                step: 2,
                pageRequested: 1,
                ramState: "Page Table: [Page 0→Frame 5, Page 1→Frame 6, Page 2→Frame 1, Page 3→Frame 2]",
                action: "Look up Page 1 in page table.",
                result: "Page 1 maps to Frame 6"
            },
            {
                step: 3,
                pageRequested: 6,
                ramState: "Frame Number = 6",
                action: "Combine frame number with offset. Frame 6 in binary = 110.",
                result: "Physical Address = 110 (frame) + 01 (offset) = 11001 = 25"
            }
        ],
        summary: {
            totalReferences: 3,
            pageFaults: 0,
            pageHits: 1,
            hitRatio: "100%",
            conclusion: "Logical address 5 translates to physical address 25. The page table enabled this translation without requiring contiguous memory allocation."
        }
    },

    realLifeAnalogy: {
        heading: "Real-Life Analogy",
        title: "The Book and Page Numbers",
        analogy: `Think of a book with chapters that can be printed on any available sheets of paper.

Imagine you're printing a book, but instead of printing pages in order on consecutive sheets, you can print any page on any available sheet. Each sheet (frame) can hold exactly one page of content.

When you need to find Chapter 3, Page 2:
1. You look up in your index (page table) where that page was printed
2. The index tells you it's on Sheet #15
3. You go to Sheet 15 to find the content

This is exactly how paging works:
- The book content is divided into fixed-size pages
- Physical paper sheets are the frames
- The index is the page table
- Finding content = address translation`,
        mapping: [
            { real: "Book Page", technical: "Logical Page" },
            { real: "Paper Sheet", technical: "Physical Frame" },
            { real: "Index", technical: "Page Table" },
            { real: "Page Number in Index", technical: "Page Number (p)" },
            { real: "Line on the Page", technical: "Offset (d)" },
            { real: "Actual Sheet Location", technical: "Physical Address" }
        ]
    },

    advantages: [
        {
            title: "No External Fragmentation",
            description: "Since all frames are the same size, any frame can hold any page."
        },
        {
            title: "Efficient Memory Use",
            description: "Memory can be allocated in any order, maximizing utilization."
        },
        {
            title: "Easy to Implement Swapping",
            description: "Pages can be easily moved between RAM and disk."
        },
        {
            title: "Memory Protection",
            description: "Each page can have protection bits (read, write, execute)."
        },
        {
            title: "Shared Pages",
            description: "Multiple processes can share the same physical frame (e.g., shared libraries)."
        }
    ],

    limitations: [
        {
            title: "Internal Fragmentation",
            description: "The last page may not be completely filled, wasting space within the page."
        },
        {
            title: "Page Table Overhead",
            description: "Page tables consume memory, especially for large address spaces."
        },
        {
            title: "Memory Access Time",
            description: "Each memory access requires a page table lookup, doubling access time without TLB."
        },
        {
            title: "Fixed Page Size",
            description: "The page size may not be optimal for all types of programs."
        }
    ],

    commonConfusions: [
        {
            confusion: "Page and Frame are the Same Thing",
            reality: "Pages are in logical memory, frames are in physical memory. They are of the same size but represent different concepts."
        },
        {
            confusion: "Paging Eliminates All Fragmentation",
            reality: "Paging eliminates external fragmentation but introduces internal fragmentation."
        },
        {
            confusion: "Page Table is Stored in the CPU",
            reality: "Page tables are stored in main memory. Only a pointer (PTBR) and TLB cache are in hardware."
        }
    ],

    examAnswer: {
        heading: "Exam-Oriented Answer",
        definition: "Paging is a memory management scheme that permits the physical address space of a process to be non-contiguous by dividing logical memory into pages and physical memory into frames of equal size.",
        keyPoints: [
            "Logical memory divided into pages, physical memory into frames",
            "Page table maps page numbers to frame numbers",
            "Logical address = Page Number + Offset",
            "Physical address = Frame Number + Offset",
            "TLB caches recent translations for performance",
            "Eliminates external fragmentation",
            "May cause internal fragmentation"
        ],
        advantages: [
            "No external fragmentation",
            "Simple memory allocation",
            "Supports virtual memory implementation"
        ],
        disadvantages: [
            "Internal fragmentation in last page",
            "Page table overhead",
            "Double memory access without TLB"
        ],
        conclusion: "Paging is essential for modern memory management, enabling virtual memory and efficient multi-programming."
    },

    presentationSlides: [
        {
            title: "What is Paging?",
            points: [
                "Memory divided into fixed-size blocks",
                "Logical memory → Pages",
                "Physical memory → Frames"
            ]
        },
        {
            title: "Why Paging?",
            points: [
                "Eliminates external fragmentation",
                "No need for contiguous allocation",
                "Simple memory management"
            ]
        },
        {
            title: "Address Translation",
            points: [
                "Logical Address = Page + Offset",
                "Page table gives frame number",
                "Physical Address = Frame + Offset"
            ]
        },
        {
            title: "Page Table",
            points: [
                "Maps pages to frames",
                "One entry per page",
                "Stored in main memory"
            ]
        },
        {
            title: "TLB",
            points: [
                "Translation Lookaside Buffer",
                "Hardware cache for page table",
                "Speeds up address translation"
            ]
        },
        {
            title: "Summary",
            points: [
                "Fixed-size memory blocks",
                "Efficient allocation",
                "Foundation for virtual memory"
            ]
        }
    ],

    summary: [
        "Paging divides logical memory into pages and physical memory into frames",
        "Page table maintains mapping between page numbers and frame numbers",
        "Logical address consists of page number and offset",
        "TLB caches translations for faster memory access",
        "Eliminates external fragmentation but may cause internal fragmentation",
        "Enables implementation of virtual memory and memory protection"
    ]
};
