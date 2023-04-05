import React, { useEffect, FC } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ProductCard from "./product-card";
import { Product } from "@framework/types";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SkeletonCard from "@components/skeleton";

interface ProductsProps {
  sectionHeading?: any;
  categorySlug?: string;
  className?: string;
  products?: Product[];
  loading?: boolean;
  error?: string;
  uniqueKey?: string;
  variant?:
    | "circle"
    | "rounded"
    | "listSmall"
    | "grid"
    | "gridSlim"
    | "list"
    | "gridModern"
    | "gridModernWide"
    | "gridTrendy"
    | undefined;
  limit?: number;
  imgWidth?: number | string;
  imgHeight?: number | string;
  hideProductDescription?: boolean;
  showCategory?: boolean;
  showRating?: boolean;
  demoVariant?: "ancient";
  disableBorderRadius?: boolean;
  data: any;
  isInnerPage?: boolean;
}

const GalleryGrid: FC<ProductsProps> = ({
  variant = "grid",
  imgWidth,
  imgHeight,
  hideProductDescription = false,
  showCategory = false,
  showRating = false,
  demoVariant,
  disableBorderRadius = false,
  data,
  isInnerPage = false,
  loading,
}) => {
  // const [products, setProducts] = React.useState([data]);
  // console.log(data);

  return (
    <SkeletonTheme>
      <ResponsiveMasonry
        columnsCountBreakPoints={
          !isInnerPage
            ? { 350: 1, 750: 2, 900: 2, 1024: 3, 1440: 3 }
            : { 350: 1, 750: 2, 900: 3, 1024: 4, 1440: 4 }
        }
      >
        <Masonry columnsCount={!isInnerPage ? 3 : 4} gutter="20px">
          {data?.map((product: Product) => (
            <>
              {loading ? (
                <SkeletonCard />
              ) : (
                <ProductCard
                  showCategory={showCategory}
                  showRating={showRating}
                  hideProductDescription={hideProductDescription}
                  key={`product--key${product.DesignId}`}
                  product={product}
                  imgWidth={imgWidth}
                  imgHeight={imgHeight}
                  variant={variant}
                  demoVariant={demoVariant}
                  disableBorderRadius={disableBorderRadius}
                />
              )}
            </>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </SkeletonTheme>
  );
};

export default GalleryGrid;
