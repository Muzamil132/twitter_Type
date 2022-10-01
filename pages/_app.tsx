import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from 'next-themes'
import { RecoilRoot } from "recoil";
function MyApp({ Component,  pageProps: { session, ...pageProps } }: AppProps) {
   
  return(
    <ThemeProvider enableSystem={true} attribute="class"  >
    <RecoilRoot>
   <SessionProvider session={session}  >
  <Component {...pageProps} />
  </SessionProvider>
    </RecoilRoot>
    </ThemeProvider>
  
  )
  
}

export default MyApp
