import { AppProps } from 'next/app'
import { useServerStyles } from '@ui/ssr'
import { UIProvider } from '@ui/Provider'
import { appWithTranslation } from 'next-i18next'
import { Provider } from 'next-auth/client';

import '../ui/globals.css'

const NextApp = ({ Component, pageProps }: AppProps) => {
  useServerStyles()

  return (
    <UIProvider>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </UIProvider>
  )
}

export default appWithTranslation(NextApp)
