import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: 'David Riva | Software Engineer',
  description:
    'Software engineer specializing in applied AI, full-stack development, and data systems. View projects, experience, and get in touch.',
  keywords: [
    'David Riva',
    'Software Engineer',
    'AI Engineer',
    'Full Stack Developer',
    'Portfolio',
    'React',
    'Next.js',
  ],
  openGraph: {
    title: 'David Riva — Software Engineer',
    description: 'Applied AI engineer and full-stack developer. Explore projects, experience, and more.',
    url: 'https://davidriva.dev',
    siteName: 'David Riva',
    images: [
      {
        url: 'https://davidriva.dev/images/website_preview.png',
        width: 1200,
        height: 630,
        alt: 'David Riva — Software Engineer',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'David Riva — Software Engineer',
    description: 'Applied AI engineer and full-stack developer.',
    images: ['https://davidriva.dev/images/website_preview.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.variable}>
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
