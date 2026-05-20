import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme';
import { Montserrat } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const montserrat = Montserrat({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

export const metadata = {
  title: 'David Riva | Software Engineer',
  description:
    "Explore the portfolio of David Riva, a software engineer specializing in applied AI, full-stack development, and data engineering. View projects involving React, Next.js, LangChain, and distributed systems.",
  keywords: [
    'David Riva',
    'Software Engineer',
    'Full Stack Developer',
    'Applied AI Engineer',
    'React Developer',
    'Next.js',
    'Portfolio',
    'Web Development',
    'LangChain',
    'RAG',
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
        alt: "David Riva's portfolio",
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
      <body className={montserrat.variable}>
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
