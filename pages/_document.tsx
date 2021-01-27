import React, { ReactElement } from 'react'
import Document, {
  Head,
  Main,
  NextScript
} from 'next/document'
import { ServerStyleSheets } from '@material-ui/styles'

import theme from 'src/config/theme'

class MyDocument extends Document {
  // setGoogleTags(): any {
  //   return {
  //     __html: `
  //       window.dataLayer = window.dataLayer || [];
  //       function gtag(){dataLayer.push(arguments);}
  //       gtag('js', new Date());

  //       gtag('config', 'UA-175012973-1');
  //     `
  //   }
  // }

  render(): ReactElement {
    return (
      <html
        lang={'en'}
        dir={'ltr'}
      >
        <Head>
          <meta
            charSet={'utf-8'}
          />
          <meta
            name={'viewport'}
            content={'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no'}
          />
          <meta
            name={'theme-color'}
            content={theme.palette.primary.main}
          />
          <meta
            property={'og:image'}
            content={'/small-black-logo.png'}
          />
          <meta
            property="og:title"
            content="Sellect"
          />
          <meta
            property="og:description"
            content="Customer-booked same-day deliveries"
          />
          <link
            rel={'icon'}
            type={'image/x-icon'}
            href={'/favicon.png'}
          />
          <link
            rel={'stylesheet'}
            href={'https://fonts.googleapis.com/css?family=Roboto:300,400,500'}
          />
          <link
            rel={'stylesheet'}
            href={'https://fonts.googleapis.com/icon?family=Material+Icons'}
          />
          {
            // <script async src="https://www.googletagmanager.com/gtag/js?id=UA-175012973-1"></script>
            // <script dangerouslySetInnerHTML={this.setGoogleTags()} />
          }
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

// eslint-disable-next-line
MyDocument.getInitialProps = async (ctx): Promise<any> => {
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  // eslint-disable-next-line
    ctx.renderPage = ():any =>
    originalRenderPage({
      // eslint-disable-next-line
        enhanceApp: App => props => sheets.collect(
        <App {...props} />
      )
    })

  const isProduction = process.env.NODE_ENV === 'production'
  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    isProduction,
    styles: (
      <React.Fragment>
        {initialProps.styles}
        {sheets.getStyleElement()}
      </React.Fragment>
    )
  }
}

export default MyDocument
