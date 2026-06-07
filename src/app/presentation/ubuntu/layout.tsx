import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ubuntu OS Presentation | OS Visual Learning',
  description: 'An interactive scrollytelling deck about the Ubuntu Linux Operating System, its architecture, boot process, and command line tools.',
};

export default function UbuntuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
