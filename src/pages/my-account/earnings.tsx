import Layout from "@components/layout/layout";
import AccountLayout from "@components/my-account/account-layout";
import MyEarnings from "@components/my-account/my-earnings";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function PurchasedItemsPage() {
  return (
    <AccountLayout>
      <MyEarnings />
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
