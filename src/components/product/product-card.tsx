import cn from "classnames";
import { FC, useState } from "react";
import { useUI } from "@contexts/ui.context";
import usePrice from "@framework/product/use-price";
import { Product } from "@framework/types";
import ProductViewIcon from "@components/icons/product-view-icon";
import ProductWishIcon from "@components/icons/product-wish-icon";
import ProductCompareIcon from "@components/icons/product-compare-icon";
import RatingDisplay from "@components/common/rating-display";
import { useRouter } from "next/router";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

interface ProductProps {
  product: Product;
  className?: string;
  contactClassName?: string;
  imageContentClassName?: string;
  variant?:
    | "grid"
    | "gridSlim"
    | "list"
    | "listSmall"
    | "gridModern"
    | "gridModernWide"
    | "gridTrendy"
    | "rounded"
    | "circle";
  imgWidth?: number | string;
  imgHeight?: number | string;
  imgLoading?: "eager" | "lazy";
  hideProductDescription?: boolean;
  showCategory?: boolean;
  showRating?: boolean;
  bgTransparent?: boolean;
  bgGray?: boolean;
  demoVariant?: "ancient";
  disableBorderRadius?: boolean;
}

const ProductCard: FC<ProductProps> = ({
  product,
  className = "",
  contactClassName = "",
  imageContentClassName = "",
  variant = "list",
  imgWidth = 340,
  imgHeight = 440,
  imgLoading,
  hideProductDescription = false,
  showCategory = false,
  showRating = false,
  bgTransparent = false,
  bgGray = false,
  demoVariant,
  disableBorderRadius = false,
}) => {
  const { openModal, setModalView, setModalData } = useUI();
  const [hover, setHover] = useState(false);
  const placeholderImage = `/assets/placeholder/products/product-${variant}.svg`;
  const { price, basePrice, discount } = usePrice({
    amount: product.sale_price ? product.sale_price : product?.Price,
    baseAmount: product?.Price,
    currencyCode: "USD",
  });
  function handlePopupView() {
    setModalData({ data: product });
    setModalView("PRODUCT_VIEW");
    return openModal();
  }

  const router = useRouter();

  const handleReroute = (author_name: string) => {
    router.push(`/shops/${author_name}`);
  };

  return (
    <div
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={cn(
        `group box-border overflow-hidden flex outline outline-[0.5px] outline-gray-350 ${
          !disableBorderRadius && "rounded-md"
        } cursor-pointer`,
        {
          "pe-0 pb-2 lg:pb-3 flex-col items-start transition duration-200 ease-in-out transform hover:-translate-y-1 md:hover:-translate-y-1.5 custom-shadow":
            variant === "grid" ||
            variant === "gridModern" ||
            variant === "gridModernWide" ||
            variant === "gridTrendy",
          " bg-white":
            (variant === "grid" && !bgGray) ||
            (variant === "gridModern" && !bgGray) ||
            (variant === "gridModernWide" && !bgGray) ||
            (variant === "gridTrendy" && !bgGray) ||
            (variant === "gridSlim" && !bgGray),
          "bg-gray-200": variant === "list" || bgGray,
          "pe-0 md:pb-1 flex-col items-start": variant === "gridSlim",
          "items-center border border-gray-100 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-listProduct":
            variant === "listSmall",
          "flex-row items-center transition-transform ease-linear pe-2 lg:pe-3 2xl:pe-4":
            variant === "list",
          "bg-transparent": variant === "grid" && bgTransparent === true,
        },
        className
      )}
      role="button"
      // Tooltip Here
      // title={product?.name}
    >
      <div
        onClick={handlePopupView}
        className={cn(
          "flex min-w-full relative",
          {
            "mb-3 md:mb-3.5": variant === "grid",
            "mb-3 md:mb-3.5 pb-0": variant === "gridSlim",
            "flex-shrink-0 w-32 sm:w-44 md:w-36 lg:w-44":
              variant === "listSmall",
            "mb-3 md:mb-3.5 relative":
              variant === "gridModern" ||
              variant === "gridModernWide" ||
              variant === "gridTrendy",
          },
          imageContentClassName
        )}
      >
        {hover && (
          <div
            style={{
              background:
                "linear-gradient(180deg,rgba(0,0,0,.25),transparent 35%,transparent 65%,rgba(0,0,0,.25))",
            }}
            className="absolute top-0 left-0 z-40 h-full w-full"
          />
        )}
        <img
          src={product?.Image ?? placeholderImage}
          loading="eager"
          alt={product?.name || "Product Image"}
          className={cn(
            `bg-gray-300 object-cover min-w-full ${
              !disableBorderRadius && "rounded-t-md"
            }`,
            {
              "w-full transition duration-200 ease-in":
                variant === "grid" ||
                variant === "gridModern" ||
                variant === "gridModernWide" ||
                variant === "gridTrendy",
              "rounded-t-md group-hover:rounded-b-none":
                (variant === "grid" && !disableBorderRadius) ||
                (variant === "gridModern" && !disableBorderRadius) ||
                (variant === "gridModernWide" && !disableBorderRadius) ||
                (variant === "gridTrendy" && !disableBorderRadius),
              "rounded-md transition duration-150 ease-linear transform group-hover:scale-105":
                variant === "gridSlim",
              "rounded-s-md transition duration-200 ease-linear transform group-hover:scale-105":
                variant === "list",
            }
          )}
        />

        <div className="absolute top-3.5 md:top-5 3xl:top-7 start-3.5 md:start-5 3xl:start-7 flex flex-col gap-y-1 items-start">
          {discount &&
            (variant === "gridModernWide" ||
              variant === "gridModern" ||
              variant === "gridTrendy") && (
              <span className="bg-heading text-white text-10px md:text-xs leading-5 rounded-md inline-block px-1 sm:px-1.5 xl:px-2 py-0.5 sm:py-1">
                <p>
                  <span className="sm:hidden">-</span>
                  {discount} <span className="hidden sm:inline">OFF</span>
                </p>
              </span>
            )}

          {product?.isNewArrival &&
            (variant === "gridModernWide" ||
              variant === "gridModern" ||
              variant === "gridTrendy") && (
              <span className="bg-[#B26788] text-white text-10px md:text-xs leading-5 rounded-md inline-block px-1.5 sm:px-1.5 xl:px-2 py-0.5 sm:py-1">
                <p>
                  New <span className="hidden sm:inline">Arrival</span>
                </p>
              </span>
            )}
        </div>

        {variant === "gridModernWide" && (
          <div className="absolute end-2 sm:end-3 bottom-6 space-y-2 w-[32px] sm:w-[42px] lg:w-[52px]">
            <ProductViewIcon className="transition ease-in duration-300 sm:opacity-0 group-hover:opacity-100 delay-100 w-full bg-white rounded-md" />
            <ProductWishIcon className="transition ease-in duration-300 sm:opacity-0 group-hover:opacity-100 delay-200 w-full bg-white rounded-md" />
            <ProductCompareIcon className="transition ease-in duration-300 sm:opacity-0 group-hover:opacity-100 delay-300 w-full bg-white rounded-md" />
          </div>
        )}
      </div>
      <div
        className={cn(
          "w-full overflow-hidden p-2",
          {
            "md:px-2.5 xl:px-4": variant === "grid",

            "px-2 md:px-2.5 xl:px-4 h-full flex flex-col":
              variant === "gridModern" ||
              variant === "gridModernWide" ||
              variant === "gridTrendy",

            "ps-0": variant === "gridSlim",
            "px-4 lg:px-5 2xl:px-4": variant === "listSmall",
          },
          contactClassName
        )}
      >
        {(variant === "gridModern" ||
          variant === "gridModernWide" ||
          variant === "gridTrendy") && (
          <div className="py-2 flex items-center gap-x-2">
            <svg
              className="w-4 h-4 sm:w-6 sm:h-6 text-[#FBD103]"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <span className="text-xs sm:text-sm text-heading font-semibold truncate">
              4.5
            </span>
            {product.quantity === 0 && (
              <span className="text-xs sm:text-sm leading-5 ps-3 font-semibold text-[#EF4444]">
                Out of stock
              </span>
            )}
          </div>
        )}
        {!!(showCategory || showRating) && (
          <div
            onClick={handlePopupView}
            className="flex flex-col md:flex-row md:items-center lg:flex-row xl:flex-row 2xl:flex-row  mb-0.5 items-start"
          >
            {!!showCategory && (
              <h3
                className={cn(
                  "font-semibold text-sm mb-1 md:mb-0 me-2 md:me-3",
                  {
                    "text-white": bgTransparent,
                    "text-black/70": !bgTransparent,
                  }
                )}
              >
                Category
              </h3>
            )}
            {!!showRating && <RatingDisplay rating={2.5} />}
          </div>
        )}
        <div onClick={handlePopupView} className="flex justify-between">
          <h2
            className={cn("truncate mb-0 -mt-2", {
              "text-sm md:text-base": variant === "grid",
              "font-semibold": demoVariant !== "ancient",
              "font-bold": demoVariant === "ancient",
              "text-xs sm:text-sm md:text-base":
                variant === "gridModern" ||
                variant === "gridModernWide" ||
                variant === "gridTrendy",
              "md:mb-1.5 text-sm sm:text-base md:text-sm lg:text-base xl:text-lg":
                variant === "gridSlim",
              "text-sm sm:text-base md:mb-1.5 pb-0": variant === "listSmall",
              "text-sm sm:text-base md:text-sm lg:text-base xl:text-lg md:mb-1.5":
                variant === "list",
              "text-white": bgTransparent,
              "text-heading": !bgTransparent,
            })}
          >
            {product?.DesignId}
          </h2>

          <span
            className={`inline-block -mt-2 ${
              demoVariant === "ancient" && "font-bold text-gray-900 text-lg"
            }`}
          >
            {product.Price + "$"}
            <div>{product?.fileType}</div>
            <div>{product?.Tags}</div>
          </span>
        </div>
        {!hideProductDescription && product?.description && (
          <div className="flex">
            <span className="text-body text-xs lg:text-sm leading-normal xl:leading-relaxed mr-1">
              By
            </span>
            <p
              onClick={() => handleReroute("Author Name")}
              className="text-body text-xs lg:text-sm leading-normal xl:leading-relaxed max-w-[250px] truncate hover:cursor-pointer hover:text-blue-600 mt-0"
            >
              Author Name
            </p>
          </div>
        )}
      </div>

      <Tippy content="View details" delay={100} placement={"left"}>
        <div className="absolute end-2 top-2 flex flex-col gap-y-2 z-50">
          <ProductWishIcon className="transition ease-in duration-100 sm:opacity-0 group-hover:opacity-100 delay-100 w-[35px] sm:w-[42px] lg:w-[52px] bg-white rounded-md" />
          {/* <ProductCompareIcon className='transition ease-in duration-100 sm:opacity-0 group-hover:opacity-100 delay-100 w-[35px] sm:w-[42px] lg:w-[52px] bg-[#F1F3F4] rounded-md' /> */}
        </div>
      </Tippy>

      <Tippy content="Add to Cart" delay={100} placement={"left"}>
        <div className="absolute end-2 bottom-[5.5rem] flex flex-col gap-y-2 z-50">
          {/* <ProductWishIcon className='transition ease-in duration-100 sm:opacity-0 group-hover:opacity-100 delay-100 w-[35px] sm:w-[42px] lg:w-[52px] bg-[#F1F3F4] rounded-md' /> */}
          <ProductCompareIcon className="transition ease-in duration-100 sm:opacity-0 group-hover:opacity-100 delay-100 w-[35px] sm:w-[42px] lg:w-[52px] bg-white rounded-md" />
        </div>
      </Tippy>
    </div>
  );
};

export default ProductCard;
