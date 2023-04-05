import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";
import { ManagedUIContext } from "@contexts/ui.context";
import ManagedModal from "@components/common/modal/managed-modal";
import ManagedDrawer from "@components/common/drawer/managed-drawer";
import { useEffect, useRef } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { ToastContainer } from "react-toastify";
// import { ReactQueryDevtools } from "react-query/devtools";
import { appWithTranslation } from "next-i18next";
import { DefaultSeo } from "@components/common/default-seo";

import { store, persistor } from "../redux/index";
import { PersistGate } from "redux-persist/integration/react";

import { wrapper } from "../redux/index";
import { compose } from "redux";
import { Provider } from "react-redux";

// Load Open Sans and satisfy typeface font
import "@fontsource/open-sans";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/700.css";
import "@fontsource/satisfy";
// external
import "react-toastify/dist/ReactToastify.css";
// base css file
import "@styles/scrollbar.css";
import "@styles/swiper-carousel.css";
import "@styles/custom-plugins.css";
import "@styles/tailwind.css";
import "@styles/rc-drawer.css";
import { getDirection } from "@utils/get-direction";

function handleExitComplete() {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0 });
  }
}

function Noop({ children }: React.PropsWithChildren<{}>) {
  return <>{children}</>;
}

const CustomApp = ({ Component, pageProps }: AppProps) => {
  const queryClientRef = useRef<any>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  const router = useRouter();
  const dir = getDirection(router.locale);
  useEffect(() => {
    document.documentElement.dir = dir;
  }, [dir]);
  const Layout = (Component as any).Layout || Noop;

  return (
    <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClientRef.current}>
            {/* @ts-ignore */}
            <Hydrate state={pageProps.dehydratedState}>
              {/* @ts-ignore */}
              <ManagedUIContext>
                {/* <PersistGate loading={null} persistor={persistor}> */}
                <Layout pageProps={pageProps}>
                  <DefaultSeo />
                  {/* Wrap the component with PersistGate */}
                  <Component {...pageProps} key={router.route} />
                  <ToastContainer />
                </Layout>
                <ManagedModal />
                <ManagedDrawer />
              </ManagedUIContext>
            </Hydrate>
            {/* <ReactQueryDevtools /> */}
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </AnimatePresence>
  );
};
const enhance = compose(appWithTranslation);
const MyApp = enhance(CustomApp);
export default MyApp;
