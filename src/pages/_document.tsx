import Document, { Html, Head, Main, NextScript } from 'next/document'

// 重写文档
class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta content="coderlei's blog" />
          <meta content='个人博客' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
MyDocument.getInitialProps = async (ctx) => {
  const initialProps = await Document.getInitialProps(ctx)
  return { ...initialProps }
}
export default MyDocument