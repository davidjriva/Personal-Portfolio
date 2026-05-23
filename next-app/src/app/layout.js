import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata = {
  title: 'David Riva | Full Stack Software Engineer Portfolio',
  description:
    "Explore the portfolio of David Riva, a software engineer specializing in AI, full-stack development, and data visualization. View projects involving React, Node.js, and Distributed Systems.",
  keywords: [
    'David Riva',
    'Software Engineer',
    'Full Stack Developer',
    'AI Engineer',
    'React Developer',
    'Node.js',
    'Portfolio',
    'Web Development',
  ],
  openGraph: {
    title: 'David Riva - Personal Portfolio',
    description: 'Software engineer specializing in AI-powered applications and scalable systems.',
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
    description: 'Software engineer specializing in AI-powered applications and scalable systems.',
    images: ['https://davidriva.dev/images/website_preview.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable}`}>
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
