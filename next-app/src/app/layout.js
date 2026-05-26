import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme';
import { Inter, Space_Grotesk } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

export const metadata = {
  title: 'David Riva | Software Engineer',
  description:
    "Explore the portfolio of David Riva, a software engineer specializing in AI engineering, full-stack development, and data visualization. View projects involving React, Next.js, Python, and AI/ML.",
  keywords: [
    'David Riva',
    'Software Engineer',
    'AI Engineer',
    'Full Stack Developer',
    'React Developer',
    'Python',
    'Portfolio',
    'Web Development',
  ],
  openGraph: {
    title: 'David Riva — Software Engineer',
    description: 'Software engineer specializing in AI engineering and full-stack development.',
    url: 'https://davidriva.dev',
    siteName: 'David Riva',
    images: [
      {
        url: 'https://davidriva.dev/images/website_preview.png',
        width: 1200,
        height: 630,
        alt: "David Riva's portfolio",
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'David Riva — Software Engineer',
    description: 'Software engineer specializing in AI engineering and full-stack development.',
    images: ['https://davidriva.dev/images/website_preview.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
