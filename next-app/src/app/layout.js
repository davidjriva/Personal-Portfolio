import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme';
import { Montserrat, Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const montserrat = Montserrat({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

const inter = Inter({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: 'David Riva | Software Engineer & Applied AI',
  description:
    'Portfolio of David Riva — software engineer specializing in applied AI, full-stack development, and production ML systems.',
  keywords: [
    'David Riva',
    'Software Engineer',
    'Applied AI',
    'Full Stack Developer',
    'AI Engineer',
    'Portfolio',
    'React',
    'Next.js',
  ],
  openGraph: {
    title: 'David Riva — Software Engineer & Applied AI',
    description: 'Building production AI systems and full-stack applications.',
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
    title: 'David Riva — Software Engineer & Applied AI',
    description: 'Building production AI systems and full-stack applications.',
    images: ['https://davidriva.dev/images/website_preview.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${inter.variable}`}>
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
