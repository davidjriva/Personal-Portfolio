import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ColorModeProvider } from '../contexts/ColorModeContext';
import { Montserrat } from 'next/font/google';


const montserrat = Montserrat({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

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
