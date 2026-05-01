import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme';
import { Montserrat } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const montserrat = Montserrat({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

export const metadata = {
  title: 'David Riva | AI & Full Stack Engineer',
  description:
    'Portfolio of David Riva — AI engineer and full-stack developer specializing in agentic systems, RAG pipelines, and production ML. Based in the Bay Area.',
  keywords: [
    'David Riva',
    'AI Engineer',
    'Full Stack Developer',
    'RAG Pipeline',
    'LangChain',
    'React',
    'Next.js',
    'Portfolio',
  ],
  openGraph: {
    title: 'David Riva — AI & Full Stack Engineer',
    description: 'AI engineer building production-grade agentic systems and full-stack applications.',
    url: 'https://davidriva.dev',
    siteName: 'David Riva',
    images: [
      {
        url: 'https://davidriva.dev/images/website_preview.png',
        width: 1200,
        height: 630,
        alt: 'David Riva Portfolio',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'David Riva — AI & Full Stack Engineer',
    description: 'AI engineer building production-grade agentic systems and full-stack applications.',
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
