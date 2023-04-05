import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import SwiperCore, { Autoplay, EffectFade } from "swiper";
import Image from "next/image";
import Search from "../customSearch";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "next-i18next";
import { categoryFilter, getCurrentTags } from "src/redux/itemsSlice";

const MainSwiper = (page: string) => {
  const { t } = useTranslation("common");
  SwiperCore.use([Autoplay]);
  const dispatch = useDispatch();

  const isMobile = useMediaQuery({
    query: "(max-width: 500px)",
  });

  const router = useRouter();

  const handleRedirect = (item: string) => {
    dispatch(getCurrentTags(item));
    router.push(`/search`);
  };

  const userDetails = useSelector(
    (state: RootState) => state.loggedInSlice.userDetails
  );

  const [Items, setItems] = React.useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `https://modbzw1g3m.execute-api.eu-central-1.amazonaws.com/get-designs?Category=All&File`,
        // &Sort=${query.Sort}&PriceMin=${query.PriceMin}&PriceMax=${query.PriceMax}&File=${query.File}&Title=${query.Title}&Unapproved=${query.Unapproved}&Tag=${query.Tag}&Tags=${query.Tags}
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setItems(result.data);
    };
    fetchData();
  }, []);

  let TagsArr: any[] = [];
  const getFileType = () => {
    for (let i = 0; i < Items?.items?.length; i++) {
      const getAllTags = Items?.items[i]?.Tags;
      const allTypesIncluded = getAllTags.every((type) =>
        TagsArr.includes(type)
      );
      if (!allTypesIncluded) {
        TagsArr.push(...getAllTags.filter((type) => !TagsArr.includes(type)));
      }
    }
  };
  getFileType();

  return (
    <>
      {page?.page !== "accountPage" ? (
        <>
          <div className="mb-10 relative flex justify-center">
            <div className="absolute top-20 lg:top-28 z-10 md:w-[35%]">
              <div
                className="font-bold lg:text-[46px] text-white leading-none tracking-tight"
                data-swiper-parallax="-300"
              >
                Your source for authentic arabic templates
              </div>
              <div
                className="hidden md:block mt-2 lg:text-[18px] text-white leading-tight"
                data-swiper-parallax="-300"
              >
                The first platform providing fresh and genuine arabic design
                content
              </div>
              <div className=" text font-bold mt-5" data-swiper-parallax="-100">
                {!isMobile && (
                  <>
                    <Search width="w-[86%]" px="px-10" />
                    <div className="flex justify-start items-center mt-3">
                      <p
                        className="text-white text-[14px] "
                        style={{ marginBottom: "0" }}
                      >
                        Trending:{" "}
                      </p>
                      {TagsArr?.map((item: any) => (
                        <p
                          onClick={() => handleRedirect(item)}
                          className="text-white hover:text-gray-400 ml-2 hover:cursor-pointer text-[14px] py-1 font-normal"
                          style={{ marginBottom: "0" }}
                        >
                          {item},
                        </p>
                      ))}
                    </div>
                  </>
                )}
                {isMobile && (
                  <>
                    <Search width="w-mobile" px="px-0" />
                    <div className="flex overflow-x-auto mt-3 w-[90%]">
                      <p className="text-gray-400 text-[14px] ">Trending: </p>
                      {TagsArr?.map((item: any) => (
                        <p
                          onClick={() => handleRedirect(item)}
                          className="text-white hover:text-gray-400 ml-2 hover:cursor-pointer text-[14px] py-1 font-normal"
                          style={{ marginBottom: "0" }}
                        >
                          {item},
                        </p>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
            <Swiper
              allowTouchMove={false}
              modules={[EffectFade]}
              effect="fade"
              speed={2000}
              loop={true}
              freeMode={false}
              autoplay={{
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
                delay: 9000,
              }}
            >
              <SwiperSlide className="flex justify-center items-center relative">
                {!isMobile && (
                  <Image
                    src="/assets/images/hero/main/1.jpg"
                    width="1920"
                    height="500"
                    className="-z-20"
                  />
                )}
                {isMobile && (
                  <Image
                    src="/assets/images/hero/main/1.jpg"
                    width="1920"
                    height="1500"
                    className="-z-20 object-cover"
                  />
                )}
                <div className="-z-10 bg-black opacity-50 absolute h-full w-full"></div>
              </SwiperSlide>

              <SwiperSlide className="flex justify-center items-center relative">
                {!isMobile && (
                  <Image
                    src="/assets/images/hero/main/2.jpg"
                    width="1920"
                    height="500"
                    className="-z-20"
                  />
                )}
                {isMobile && (
                  <Image
                    src="/assets/images/hero/main/2.jpg"
                    width="1920"
                    height="1500"
                    className="-z-20 object-cover"
                  />
                )}
                <div className="-z-10 bg-black opacity-50 absolute h-full w-full"></div>
              </SwiperSlide>

              <SwiperSlide className="flex justify-center items-center relative">
                {!isMobile && (
                  <Image
                    src="/assets/images/hero/main/3.jpg"
                    width="1920"
                    height="500"
                    className="-z-20"
                  />
                )}
                {isMobile && (
                  <Image
                    src="/assets/images/hero/main/3.jpg"
                    width="1920"
                    height="1500"
                    className="-z-20 object-cover"
                  />
                )}
                <div className="-z-10 bg-black opacity-50 absolute h-full w-full"></div>
              </SwiperSlide>

              <SwiperSlide className="flex justify-center items-center relative">
                {!isMobile && (
                  <Image
                    src="/assets/images/hero/main/4.jpg"
                    width="1920"
                    height="500"
                    className="-z-20"
                  />
                )}
                {isMobile && (
                  <Image
                    src="/assets/images/hero/main/4.jpg"
                    width="1920"
                    height="1500"
                    className="-z-20 object-cover"
                  />
                )}
                <div className="-z-10 bg-black opacity-50 absolute h-full w-full"></div>
              </SwiperSlide>

              <SwiperSlide className="flex justify-center items-center relative">
                {!isMobile && (
                  <Image
                    src="/assets/images/hero/main/5.jpg"
                    width="1920"
                    height="500"
                    className="-z-20"
                  />
                )}
                {isMobile && (
                  <Image
                    src="/assets/images/hero/main/5.jpg"
                    width="1920"
                    height="1500"
                    className="-z-20 object-cover"
                  />
                )}
                <div className="-z-10 bg-black opacity-50 absolute h-full w-full"></div>
              </SwiperSlide>

              <SwiperSlide className="flex justify-center items-center relative">
                {!isMobile && (
                  <Image
                    src="/assets/images/hero/main/6.jpg"
                    width="1920"
                    height="500"
                    className="-z-20"
                  />
                )}
                {isMobile && (
                  <Image
                    src="/assets/images/hero/main/6.jpg"
                    width="1920"
                    height="1500"
                    className="-z-20 object-cover"
                  />
                )}
                <div className="-z-10 bg-black opacity-50 absolute h-full w-full"></div>
              </SwiperSlide>

              <SwiperSlide className="flex justify-center items-center relative">
                {!isMobile && (
                  <Image
                    src="/assets/images/hero/main/7.jpg"
                    width="1920"
                    height="500"
                    className="-z-20"
                  />
                )}
                {isMobile && (
                  <Image
                    src="/assets/images/hero/main/7.jpg"
                    width="1920"
                    height="1500"
                    className="-z-20 object-cover"
                  />
                )}
                <div className="-z-10 bg-black opacity-50 absolute h-full w-full"></div>
              </SwiperSlide>
            </Swiper>
          </div>
        </>
      ) : (
        <div style={{ position: "relative" }}>
          <Swiper
            allowTouchMove={false}
            modules={[EffectFade]}
            effect="fade"
            speed={2000}
            loop={true}
            freeMode={false}
            autoplay={{
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
              delay: 9000,
            }}
            style={{ height: "200px" }}
          >
            <SwiperSlide className="flex justify-center items-center relative">
              {!isMobile && (
                <Image
                  src="/assets/images/hero/main/1.jpg"
                  width="1920"
                  height="500"
                  className="-z-20"
                />
              )}
              {isMobile && (
                <Image
                  src="/assets/images/hero/main/1.jpg"
                  width="1920"
                  height="1500"
                  className="-z-20 object-cover"
                />
              )}
              <div className="-z-10 bg-black opacity-50 absolute h-full w-full"></div>
            </SwiperSlide>

            <SwiperSlide className="flex justify-center items-center relative">
              {!isMobile && (
                <Image
                  src="/assets/images/hero/main/2.jpg"
                  width="1920"
                  height="500"
                  className="-z-20"
                />
              )}
              {isMobile && (
                <Image
                  src="/assets/images/hero/main/2.jpg"
                  width="1920"
                  height="1500"
                  className="-z-20 object-cover"
                />
              )}
              <div className="-z-10 bg-black opacity-50 absolute h-full w-full"></div>
            </SwiperSlide>

            <SwiperSlide className="flex justify-center items-center relative">
              {!isMobile && (
                <Image
                  src="/assets/images/hero/main/3.jpg"
                  width="1920"
                  height="500"
                  className="-z-20"
                />
              )}
              {isMobile && (
                <Image
                  src="/assets/images/hero/main/3.jpg"
                  width="1920"
                  height="1500"
                  className="-z-20 object-cover"
                />
              )}
              <div className="-z-10 bg-black opacity-50 absolute h-full w-full"></div>
            </SwiperSlide>

            <SwiperSlide className="flex justify-center items-center relative">
              {!isMobile && (
                <Image
                  src="/assets/images/hero/main/4.jpg"
                  width="1920"
                  height="500"
                  className="-z-20"
                />
              )}
              {isMobile && (
                <Image
                  src="/assets/images/hero/main/4.jpg"
                  width="1920"
                  height="1500"
                  className="-z-20 object-cover"
                />
              )}
              <div className="-z-10 bg-black opacity-50 absolute h-full w-full"></div>
            </SwiperSlide>

            <SwiperSlide className="flex justify-center items-center relative">
              {!isMobile && (
                <Image
                  src="/assets/images/hero/main/5.jpg"
                  width="1920"
                  height="500"
                  className="-z-20"
                />
              )}
              {isMobile && (
                <Image
                  src="/assets/images/hero/main/5.jpg"
                  width="1920"
                  height="1500"
                  className="-z-20 object-cover"
                />
              )}
              <div className="-z-10 bg-black opacity-50 absolute h-full w-full"></div>
            </SwiperSlide>

            <SwiperSlide className="flex justify-center items-center relative">
              {!isMobile && (
                <Image
                  src="/assets/images/hero/main/6.jpg"
                  width="1920"
                  height="500"
                  className="-z-20"
                />
              )}
              {isMobile && (
                <Image
                  src="/assets/images/hero/main/6.jpg"
                  width="1920"
                  height="1500"
                  className="-z-20 object-cover"
                />
              )}
              <div className="-z-10 bg-black opacity-50 absolute h-full w-full"></div>
            </SwiperSlide>

            <SwiperSlide className="flex justify-center items-center relative">
              {!isMobile && (
                <Image
                  src="/assets/images/hero/main/7.jpg"
                  width="1920"
                  height="500"
                  className="-z-20"
                />
              )}
              {isMobile && (
                <Image
                  src="/assets/images/hero/main/7.jpg"
                  width="1920"
                  height="1500"
                  className="-z-20 object-cover"
                />
              )}
              <div className="-z-10 bg-black opacity-50 absolute h-full w-full"></div>
            </SwiperSlide>
          </Swiper>
          <section
            className="welcome-username"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: "100",
            }}
          >
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white text-center">
              <span className="font-satisfy block font-normal mb-3">
                {t(`Welcome`)}
              </span>
              {t(`${userDetails.at(-1)?.username}`)}
            </h2>
          </section>
        </div>
      )}
    </>
  );
};

export default MainSwiper;
