import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Presentation Decks | OS Visual Learning',
  description: 'Interactive and immersive scrollytelling presentation decks for operating system concepts.',
};

export default function PresentationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
