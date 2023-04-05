import Layout from "@components/layout/layout";
import AccountLayout from "@components/my-account/account-layout";
import PurchasedItems from "@components/my-account/my-purchased-items";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function PurchasedItemsPage() {
  return (
    <AccountLayout>
      <PurchasedItems />
    </AccountLayout>
  );
}

PurchasedItemsPage.Layout = Layout;

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
