import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import Subscription from "@components/common/subscription";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import ShopsSingleDetails from "@components/shops/shops-single-details";
import { useRouter } from "next/router";

export default function ShopDetailsPage() {
  const router = useRouter();

  const authorName = router.query;
  return (
    <div className='border-t border-gray-300'>
      <ShopsSingleDetails />
      <Container>
        <Subscription />
      </Container>
    </div>
  );
}

ShopDetailsPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
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
