import MemoryScene from "@/components/memory/MemoryScene";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Memory Management | Immersive Presentation",
    description: "An interactive 3D journey through Operating System Memory Management.",
};

export default function Page() {
    return (
        <main className="w-full h-screen overflow-hidden">
            {/* The Scene handles the scrolling internally via R3F ScrollControls */}
            <MemoryScene />
        </main>
    );
}
