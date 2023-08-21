// _app.js
import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../src/Theme";
import createEmotionCache from "../src/createEmotionCache";
import LayOut from "../src/components/Auxiliary/LayOut";
import "../styles/globals.css";
import localFont from "next/font/local";

import { Provider } from "react-redux";
import { store } from "../src/redux/store";

const firstFont = localFont({ src: "./Inter700.ttf" });
//import { Advent_Pro } from "@next/font/google";
// Client-side cache shared for the whole session
// of the user in the browser.

//const firstFont = Advent_Pro({ subsets: ["cyrillic"], weight: ["400"] });

const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <main className={firstFont.className}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, 
                consistent, and simple baseline to
                build upon. */}

            <CssBaseline />
            <LayOut>
              <Component {...pageProps} />
            </LayOut>
          </ThemeProvider>
        </Provider>
      </CacheProvider>
    </main>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
