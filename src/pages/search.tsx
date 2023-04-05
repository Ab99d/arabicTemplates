// @ts-nocheck
import React, { useRef, useState } from "react";
import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import Subscription from "@components/common/subscription";
import ShopDiscount from "@components/shop/discount";
import { ShopFilters } from "@components/shop/filters";
import StickyBox from "react-sticky-box";
import { ProductGrid } from "@components/product/product-grid";
import SearchTopBar from "@components/shop/top-bar";
import ActiveLink from "@components/ui/active-link";
import { BreadcrumbItems } from "@components/common/breadcrumb";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import NewArrivalsProductFeedWithTabs from "@components/product/feeds/new-arrivals-product-feed-with-tabs";

export default function Shop() {
  const { t } = useTranslation("common");
  const router = useRouter();

  const TabsRef = useRef<React.Ref<HTMLDivElement>>(null);

  const handleScroll2 = (direction: "Tabs") => {
    let routes: any = {
      Tabs: TabsRef.current,
    };
    if (direction) routes[direction].scrollIntoView({ behavior: "smooth" });
  };

  const handleScroll = () => {
    document?.getElementById("Tabs")?.scrollIntoView();
  };

  useEffect(() => {
    // console.log("QUERY", router.query);
  }, []);

  // const urlParams = new URLSearchParams(window.location.search);
  // const WebsitesCat = urlParams.get("Websites");
  // const PresentationsCat = urlParams.get("Presentations");
  // const MobileCat = urlParams.get("Mobile");
  // const CaligraphyCat = urlParams.get("Caligraphy");
  // const FontsCat = urlParams.get("Font");
  // const LogosCat = urlParams.get("Logos");
  // const TypographyCat = urlParams.get("Typography");
  // console.log(font);

  return (
    <>
      {router.query?.searchQuery ? (
        <>
          <Container>
            <span id="Tabs" className="hidden absolute top-0"></span>
            <div className={`flex pt-8 pb-16 lg:pb-20`}>
              <div className="flex-shrink-0 pe-24 hidden lg:block w-96">
                <StickyBox offsetTop={50} offsetBottom={20}>
                  <div className="pb-7">
                    <BreadcrumbItems separator="/">
                      <ActiveLink
                        href={"/"}
                        activeClassName="font-semibold text-heading"
                      >
                        <a>{t("breadcrumb-home")}</a>
                      </ActiveLink>
                      <ActiveLink
                        href={ROUTES.SEARCH}
                        activeClassName="font-semibold text-heading"
                      >
                        <a className="capitalize">{t("breadcrumb-search")}</a>
                      </ActiveLink>
                    </BreadcrumbItems>
                  </div>
                  <ShopFilters isSet={true} />
                </StickyBox>
              </div>

              <div id="Tabs" className="w-full lg:-ms-9">
                <ShopDiscount category={router.query?.searchQuery} />
                <div className="">
                  <NewArrivalsProductFeedWithTabs
                    handleScroll2={handleScroll2}
                    ref={TabsRef}
                    handleScroll={handleScroll}
                    isInnerPage={true}
                    hideTabs={router.query?.sort ? true : false}
                  />
                </div>
              </div>
            </div>
            <Subscription />
          </Container>
        </>
      ) : (
        <>
          <Container>
            <div className={`flex pt-8 pb-16 lg:pb-20`}>
              <div className="flex-shrink-0 pe-24 hidden lg:block w-96">
                <StickyBox offsetTop={50} offsetBottom={20}>
                  <div className="pb-7">
                    <BreadcrumbItems separator="/">
                      <ActiveLink
                        href={"/"}
                        activeClassName="font-semibold text-heading"
                      >
                        <a>{t("breadcrumb-home")}</a>
                      </ActiveLink>
                      <ActiveLink
                        href={ROUTES.SEARCH}
                        activeClassName="font-semibold text-heading"
                      >
                        <a className="capitalize">{t("breadcrumb-search")}</a>
                      </ActiveLink>
                    </BreadcrumbItems>
                  </div>
                  <ShopFilters isSet={false} />
                </StickyBox>
              </div>

              <div id="Tabs" className="w-full lg:-ms-9">
                <div className="">
                  <NewArrivalsProductFeedWithTabs
                    handleScroll={handleScroll}
                    isInnerPage={true}
                    hideTabs={false}
                  />
                </div>
              </div>

              {/* <div className="w-full lg:-ms-9">
                <SearchTopBar />
                <ProductGrid />
              </div> */}
            </div>
            <Subscription />
          </Container>
        </>
      )}
    </>
  );
}

Shop.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
    },
  };
};
