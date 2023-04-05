// @ts-nocheck
import React, { useEffect, useRef } from "react";
import Container from "@components/ui/container";
import HeroSlider from "@containers/hero-slider";
import Layout from "@components/layout/layout";
import { GetStaticProps } from "next";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { fetchFlashSaleProducts } from "@framework/product/get-all-flash-sale-products";
import { fetchCategories } from "@framework/category/get-all-categories";
import { fetchNewArrivalProducts } from "@framework/product/get-all-new-arrival-products";
import { fetchBrands } from "@framework/brand/get-all-brands";
import ProductsFeatured from "@containers/products-featured";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { homeContemporaryHeroSlider as banners } from "@framework/static/banner";
import Link from "next/link";
import WhySection from "@components/why";
import DownloadApps from "@components/common/download-apps";
import Subscription from "@components/common/subscription";
import GalleryGrid from "@components/product/Masonery";
import MyTabs from "@components/product/TabsTest";
import NewArrivalsProductFeedWithTabs from "@components/product/feeds/new-arrivals-product-feed-with-tabs";
import SectionHeader from "@components/common/section-header";
import MainSwiper from "@components/ui/carousel/mainSwiper";
import BannerCard from "@components/common/banner-card";
import { homeThreeBanner as banner } from "@framework/static/banner";
import { ROUTES } from "@utils/routes";
import Image from "next/image";
import Subscribe from "@components/subscribe";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "src/redux/itemsSlice";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(reset());
  }, []);

  const currentFileType = useSelector(
    (state: RootState) => state.fileType.currentFile
  );

  const currentPrice = useSelector(
    (state: RootState) => state.fileType.currentPrice
  );

  const currentTags = useSelector(
    (state: RootState) => state.fileType.currentTags
  );

  const handleScroll = () => {
    document?.getElementById("Tabs")?.scrollIntoView();
  };

  const TabsRef = useRef<HTMLDivElement>(null);

  const handleScroll2 = (direction: "Tabs") => {
    let routes: Record<string, HTMLDivElement | null> = {
      Tabs: TabsRef.current,
    };

    if (direction) routes[direction]?.scrollIntoView({ behavior: "smooth" });
  };

  const [data, setData] = React.useState([]);
  const [query, setQuery] = React.useState({
    Category: "Logos",
    Sort: "PriceDesc",
    PriceMin: 0,
    PriceMax: 20,
    File: "",
    Title: "",
    Unapproved: true,
    Tag: true,
    Tags: "Agency",
  });

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `https://modbzw1g3m.execute-api.eu-central-1.amazonaws.com/get-designs?Category=${query.Category}&Sort=${query.Sort}&PriceMin=${query.PriceMin}&PriceMax=${query.PriceMax}&File=${query.File}&Title=${query.Title}&Unapproved=${query.Unapproved}&Tag=${query.Tag}&Tags=${query.Tags}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setData(result.data);
    };
    fetchData();
  }, [query]);

  const handleFilter = (event) => {
    setQuery({ ...query, [event.target.name]: event.target.value });
  };

  // const fetchData = async () => {
  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");

  //   var raw = JSON.stringify({});

  //   var requestOptions = {
  //     method: "GET",
  //     headers: myHeaders,
  //     // body: raw,
  //     redirect: "follow",
  //   };

  //   fetch(
  //     "https://modbzw1g3m.execute-api.eu-central-1.amazonaws.com/get-designs?Category=All&Title=&Unapproved=True&Tag=True&Tags=Agency",
  //     requestOptions
  //   )
  //     .then((response) => response.text())
  //     .then((result) => console.log(result))
  //     .catch((error) => console.log("error", error));
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <>
      <MainSwiper />
      <Container>
        <div className="2xl:mx-40" id="Tabs">
          <NewArrivalsProductFeedWithTabs
            handleScroll2={handleScroll2}
            ref={TabsRef}
            handleScroll={handleScroll}
          />
        </div>
      </Container>
      <WhySection />
      <Container>
        <div className="2xl:mx-40">
          <Subscribe />
        </div>
      </Container>
    </>
  );
}

Home.Layout = Layout;
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    [API_ENDPOINTS.FLASH_SALE_PRODUCTS, { limit: 10 }],
    fetchFlashSaleProducts
  );
  await queryClient.prefetchQuery(
    [API_ENDPOINTS.CATEGORIES, { limit: 10 }],
    fetchCategories
  );
  await queryClient.prefetchQuery(
    [API_ENDPOINTS.NEW_ARRIVAL_PRODUCTS, { limit: 10 }],
    fetchNewArrivalProducts
  );
  await queryClient.prefetchQuery(
    [API_ENDPOINTS.BRANDS, { limit: 0 }],
    fetchBrands
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
    },
    revalidate: 60,
  };
};
