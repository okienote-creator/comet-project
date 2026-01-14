import type { Metadata } from 'next';
import './globals.css';
import './styles/layout.css';

export const metadata: Metadata = {
  title: 'VQSSLOTS - Neon Gaming Experience',
  description: 'Next-generation gaming platform with glass morphism design',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
