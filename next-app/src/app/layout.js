import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ColorModeProvider } from '../contexts/ColorModeContext';
import { Montserrat } from 'next/font/google';


const montserrat = Montserrat({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

export const metadata = {
  title: 'David Riva | Full Stack Software Engineer Portfolio',
  description: "Explore the portfolio of David Riva, a software engineer specializing in UI/UX, full-stack development, and data visualization. View projects involving React, Node.js, and Distributed Systems.",
  keywords: ["David Riva", "Software Engineer", "Full Stack Developer", "UI/UX Design", "React Developer", "Node.js", "Portfolio", "Web Development"],
  openGraph: {
    title: 'David Riva - Personal Portfolio',
    description: 'Experienced software engineer specializing in UI/UX and big data visualization.',
    url: 'https://davidriva.dev',
    siteName: 'David Riva Portfolio',
    images: [
      {
        url: 'https://davidriva.dev/images/website_preview.png',
        width: 1200,
        height: 630,
        alt: "David Riva's headshot",
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'David Riva - Personal Portfolio',
    description: 'Experienced software engineer specializing in UI/UX and data visualization.',
    images: ['https://davidriva.dev/images/website_preview.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.variable}>
        <AppRouterCacheProvider>
          <ColorModeProvider>{children}</ColorModeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
