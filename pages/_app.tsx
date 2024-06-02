import "/styles/normalize.scss";
import type { AppProps } from "next/app";
import Header from "../components/Layout/Header";
import Container from "../components/Layout/Container";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="preload"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
          as="style"
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
          />
        </noscript>
        <title>판다마켓</title>
      </Head>
      <Header />
      <Container>
        <Component {...pageProps} />
      </Container>
    </>
  );
}
