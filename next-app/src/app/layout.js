import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme';
import { Inter, Montserrat } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const montserrat = Montserrat({
  weight: ['400', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

export const metadata = {
  title: 'David Riva | Software Engineer',
  description:
    "Explore the portfolio of David Riva, a software engineer specializing in applied AI, full-stack development, and data visualization. View projects involving React, Next.js, LangChain, and distributed systems.",
  keywords: [
    'David Riva',
    'Software Engineer',
    'Full Stack Developer',
    'AI Engineer',
    'React Developer',
    'Portfolio',
  ],
  openGraph: {
    title: 'David Riva — Software Engineer',
    description: 'Software engineer specializing in applied AI and full-stack development.',
    url: 'https://davidriva.dev',
    siteName: 'David Riva',
    images: [
      {
        url: 'https://davidriva.dev/images/website_preview.png',
        width: 1200,
        height: 630,
        alt: "David Riva's portfolio preview",
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'David Riva — Software Engineer',
    description: 'Software engineer specializing in applied AI and full-stack development.',
    images: ['https://davidriva.dev/images/website_preview.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${montserrat.variable}`} style={{ overflowX: 'hidden' }}>
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
