import React, { useState, useEffect } from "react";
// import { useProductsQuery } from "@framework/product/get-all-products-2";
import { Tab } from "@headlessui/react";
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import itemsSlice, { customSearchReset } from "../../../redux/itemsSlice";

// @ts-ignore
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import GalleryGrid from "../Masonery";
import axios from "axios";
import { useProductsQuery } from "@framework/product/get-all-products";
import { useRouter } from "next/router";
import { categoryFilter } from "src/redux/itemsSlice";

const NewArrivalsProductFeedWithTabs: React.FC<{
  // handleScroll: any;
  isInnerPage?: boolean;
  hideTabs?: boolean;
  // handleScroll2: (direction: "Tabs") => void;
}> = React.forwardRef(
  (
    { isInnerPage = false, hideTabs = false },
    ref: React.Ref<HTMLDivElement>
  ) => {
    const { t } = useTranslation("common");
    const [show, setShow] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleSkeleton = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };
    const dispatch = useDispatch();

    const currentFileType = useSelector(
      (state: RootState) => state.fileType.currentFile
    );
    const currentPrice = useSelector(
      (state: RootState) => state.fileType.currentPrice
    );
    const currentTags = useSelector(
      (state: RootState) => state.fileType.currentTags
    );
    const customSearch = useSelector(
      (state: RootState) => state.fileType.customSearch
    );
    const categoryFilter1 = useSelector(
      (state: RootState) => state.fileType.categoryFilter
    );

    const [name, setName] = useState(categoryFilter1);

    const getPrice = currentPrice?.at(-1).split("-");
    const maxInt = getPrice[1];
    const minInt = getPrice[0];
    // console.log(maxInt);
    // console.log(minInt);
    // console.log(getPrice);
    // console.log(getPrice);
    // console.log(customSearch.length);

    const router = useRouter();
    useEffect(() => {
      // console.log("QUERY", router.query);
    }, []);

    const handleRedirect1 = (value: string) => {
      router.push(`/search?searchQuery=${value}`);
    };

    const [items, setItems] = React.useState<any>([]);
    const [loadingItems, setLoadingItems] = React.useState(false);

    React.useEffect(() => {
      const fetchData = async () => {
        setLoadingItems(true);
        var data;
        if (currentTags.length > 0) {
          data = JSON.stringify({
            min_price: minInt,
            max_price: maxInt,
            search_name: customSearch,
            category: categoryFilter1,
            tags: currentTags,
          });
        } else if (currentFileType.length > 0) {
          data = JSON.stringify({
            min_price: minInt,
            max_price: maxInt,
            search_name: customSearch,
            category: categoryFilter1,
            file_types: currentFileType,
          });
        } else {
          data = JSON.stringify({
            min_price: minInt,
            max_price: maxInt,
            search_name: customSearch,
            category: categoryFilter1,
          });
        }
        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: "https://modbzw1g3m.execute-api.eu-central-1.amazonaws.com/get-designs",
          headers: {
            "Content-Type": "application/json",
          },
          data: data,
        };
        axios
          .request(config)
          .then((response) => {
            // console.log(response.data);
            setItems(response.data);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            setLoadingItems(false);
          });
      };
      fetchData();
    }, [
      categoryFilter1,
      currentFileType,
      currentPrice,
      currentTags,
      customSearch,
    ]);

    const handleFilter = (event: string) => {
      dispatch(categoryFilter(event));
    };

    // if (customSearch.length > 0) {
    //   handleFilter(items[0]?.DesignCategory);
    // }

    const nameHandler = (value: string) => {
      setName(value);
    };

    // console.log(items.length);

    return (
      <div className="relative">
        <div className="absolute -top-60" id="Tabs" ref={ref}></div>
        <div className="mb-12 md:mb-14 xl:mb-16">
          <Tab.Group as="div" className="relative">
            {hideTabs === false && (
              <Tab.List
                as="ul"
                className="tab-ul md:flex md:justify-center sticky top-24 z-[9] bg-white"
              >
                <div
                  onClick={() => {
                    // handleScroll2("Tabs"),
                    nameHandler("all");
                    setShow(true);
                    handleSkeleton();
                    handleFilter("all");
                  }}
                >
                  <Tab
                    as="li"
                    className={({ selected }) =>
                      categoryFilter1 == "all"
                        ? "tab-li-selected focus:outline-none focus:border-none text-[18px] font-bold"
                        : "tab-li focus:outline-none focus:border-none hover:bg-gray-100 hover:rounded-full"
                    }
                    onClick={() => {
                      // handleScroll2("Tabs"),
                      nameHandler("all"), setShow(true);
                      handleSkeleton();
                    }}
                    style={{ marginInline: "1rem" }}
                  >
                    <p>{t("All")}</p>
                  </Tab>
                </div>
                <div
                  onClick={() => {
                    // handleScroll2("Tabs"),
                    nameHandler("Websites");
                    setShow(true);
                    handleSkeleton();
                    handleFilter("Websites");
                  }}
                >
                  <Tab
                    as="li"
                    className={({ selected }) =>
                      categoryFilter1 == "Websites"
                        ? "tab-li-selected focus:outline-none focus:border-none text-[18px] font-bold"
                        : "tab-li focus:outline-none focus:border-none hover:bg-gray-100 hover:rounded-full"
                    }
                    onClick={() => {
                      // handleScroll2("Tabs"),
                      nameHandler("Websites"), setShow(true);
                      handleSkeleton();
                    }}
                    style={{ marginInline: "1rem" }}
                  >
                    <p>{t("Websites")}</p>
                  </Tab>
                </div>

                <div
                  onClick={() => {
                    // handleScroll2("Tabs"),
                    nameHandler("Presentations"), setShow(true);
                    handleSkeleton();
                    handleFilter("Presentations");
                  }}
                >
                  <Tab
                    as="li"
                    className={({ selected }) =>
                      categoryFilter1 == "Presentations"
                        ? "tab-li-selected focus:outline-none focus:border-none text-[18px] font-bold"
                        : "tab-li focus:outline-none focus:border-none hover:bg-gray-100 hover:rounded-full"
                    }
                    onClick={() => {
                      // handleScroll2("Tabs"),
                      nameHandler("Presentations"), setShow(true);
                      handleSkeleton();
                    }}
                    style={{ marginInline: "1rem" }}
                  >
                    <p>{t("Presentations")}</p>
                  </Tab>
                </div>

                <div
                  onClick={() => {
                    // handleScroll2("Tabs"),
                    nameHandler("Mobile"), setShow(false);
                    handleSkeleton();
                    handleFilter("Mobile");
                  }}
                >
                  <Tab
                    as="li"
                    className={({ selected }) =>
                      categoryFilter1 == "Mobile"
                        ? "tab-li-selected focus:outline-none focus:border-none text-[18px] font-bold"
                        : "tab-li focus:outline-none focus:border-none hover:bg-gray-100 hover:rounded-full"
                    }
                    onClick={() => {
                      // handleScroll2("Tabs"),
                      nameHandler("Mobile"), setShow(false);
                      handleSkeleton();
                    }}
                    style={{ marginInline: "1rem" }}
                  >
                    <p>{t("Mobile")}</p>
                  </Tab>
                </div>

                <div
                  onClick={() => {
                    // handleScroll2("Tabs"),
                    nameHandler("Caligraphy"), setShow(true);
                    handleSkeleton();
                    handleFilter("Caligraphy");
                  }}
                >
                  <Tab
                    as="li"
                    className={({ selected }) =>
                      categoryFilter1 == "Caligraphy"
                        ? "tab-li-selected focus:outline-none focus:border-none text-[18px] font-bold"
                        : "tab-li focus:outline-none focus:border-none hover:bg-gray-100 hover:rounded-full"
                    }
                    onClick={() => {
                      // handleScroll2("Tabs"),
                      nameHandler("Caligraphy"), setShow(true);
                      handleSkeleton();
                    }}
                    style={{ marginInline: "1rem" }}
                  >
                    <p>{t("Caligraphy")}</p>
                  </Tab>
                </div>

                <div
                  onClick={() => {
                    // handleScroll2("Tabs"),
                    nameHandler("Fonts"), setShow(true);
                    handleSkeleton();
                    handleFilter("Fonts");
                  }}
                >
                  <Tab
                    as="li"
                    className={({ selected }) =>
                      categoryFilter1 == "Fonts"
                        ? "tab-li-selected focus:outline-none focus:border-none text-[18px] font-bold"
                        : "tab-li focus:outline-none focus:border-none hover:bg-gray-100 hover:rounded-full"
                    }
                    onClick={() => {
                      // handleScroll2("Tabs"),
                      nameHandler("Fonts"), setShow(true);
                      handleSkeleton();
                    }}
                    style={{ marginInline: "1rem" }}
                  >
                    <p>{t("Fonts")}</p>
                  </Tab>
                </div>

                <div
                  onClick={() => {
                    // handleScroll2("Tabs"),
                    nameHandler("Logos"), setShow(true);
                    handleSkeleton();
                    handleFilter("Logos");
                  }}
                >
                  <Tab
                    as="li"
                    className={({ selected }) =>
                      categoryFilter1 == "Logos"
                        ? "tab-li-selected focus:outline-none focus:border-none text-[18px] font-bold"
                        : "tab-li focus:outline-none focus:border-none hover:bg-gray-100 hover:rounded-full"
                    }
                    onClick={() => {
                      // handleScroll2("Tabs"),
                      nameHandler("Logos"), setShow(true);
                      handleSkeleton();
                    }}
                    style={{ marginInline: "1rem" }}
                  >
                    <p>{t("Logos")}</p>
                  </Tab>
                </div>

                <div
                  onClick={() => {
                    // handleScroll2("Tabs"),
                    nameHandler("Typography"), setShow(true);
                    handleSkeleton();
                    handleFilter("Typography");
                  }}
                >
                  <Tab
                    as="li"
                    className={({ selected }) =>
                      categoryFilter1 == "Typography"
                        ? "tab-li-selected focus:outline-none focus:border-none text-[18px] font-bold"
                        : "tab-li focus:outline-none focus:border-none hover:bg-gray-100 hover:rounded-full"
                    }
                    onClick={() => {
                      // handleScroll2("Tabs"),
                      nameHandler("Typography"), setShow(true);
                      handleSkeleton();
                    }}
                    style={{ marginInline: "1rem" }}
                  >
                    <p>{t("Typography")}</p>
                  </Tab>
                </div>
              </Tab.List>
            )}
            <div style={{ marginBottom: "2rem" }}>
              {loadingItems && (
                <div className="loader2" style={{ margin: "auto" }}></div>
              )}
            </div>
            {items.length > 0 ? (
              <>
                <Tab.Panels>
                  <Tab.Panel>
                    <GalleryGrid
                      data={items}
                      isInnerPage={true}
                      loading={loading}
                    />
                  </Tab.Panel>
                  <Tab.Panel>
                    <GalleryGrid
                      data={items}
                      isInnerPage={true}
                      loading={loading}
                    />
                  </Tab.Panel>
                  <Tab.Panel>
                    <GalleryGrid
                      data={items}
                      isInnerPage={true}
                      loading={loading}
                    />
                  </Tab.Panel>
                  <Tab.Panel>
                    <GalleryGrid
                      data={items}
                      isInnerPage={true}
                      loading={loading}
                    />
                  </Tab.Panel>
                  <Tab.Panel>
                    <GalleryGrid
                      data={items}
                      isInnerPage={true}
                      loading={loading}
                    />
                  </Tab.Panel>
                  <Tab.Panel>
                    <GalleryGrid
                      data={items}
                      isInnerPage={true}
                      loading={loading}
                    />
                  </Tab.Panel>
                  <Tab.Panel>
                    <GalleryGrid
                      data={items}
                      isInnerPage={true}
                      loading={loading}
                    />
                  </Tab.Panel>
                </Tab.Panels>
              </>
            ) : (
              <>
                {!loading && !loadingItems && (
                  <>
                    <div style={{ textAlign: "center" }}>
                      Your search -{" "}
                      <span style={{ fontWeight: "bold" }}>{customSearch}</span>{" "}
                      - did not match any documents.
                    </div>
                  </>
                )}
              </>
            )}
          </Tab.Group>
          {!isInnerPage && show && (
            <div
              style={{
                background:
                  "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.93) 34.38%, #FFFFFF 78.65%, #FFFFFF 100%)",
              }}
              className="flex flex-col justify-center items-center relative pt-36 pb-16 md:-mt-56 md:mb-[0rem] opacity-90 md:mx-0 md:px-0 h-[350px]"
            >
              <p className="font-bold mt-40 text-2xl">
                Looking for something special?
              </p>
              <div className="bg-[#2C68F6] hover:bg-[#104dda] rounded text-white py-2 px-4 opacity-100 mt-6">
                <button onClick={() => handleRedirect1(categoryFilter1)}>
                  Browse all {name}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default NewArrivalsProductFeedWithTabs;
