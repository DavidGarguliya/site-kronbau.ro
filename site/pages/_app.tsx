import 'mapbox-gl/dist/mapbox-gl.css'

// import { Loading } from '../components/Loading'
// keeps the tree shaker from removing the reset styles
import * as resetStyles from '@styles/reset.css'

import type { AppProps } from 'next/app'
import { Loading } from 'landmarks-ds'
import { appWithTranslation } from 'next-i18next'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Loading />
      <Component {...pageProps} resetStyles={resetStyles} />
    </>
  )
}

export default appWithTranslation(MyApp)
