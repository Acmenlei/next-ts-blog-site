import Document, { Html, Head, Main, NextScript } from 'next/document'

// 重写文档
class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <title>coderlei's blog</title>
          <meta content="coderlei's blog" />
          <meta content='个人博客' />
          <meta content='只有知道真相 你才能获得自由' />
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