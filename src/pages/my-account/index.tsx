import React from "react";
import Link from "@components/ui/link";
import Layout from "@components/layout/layout";
import AccountLayout from "@components/my-account/account-layout";
import { ROUTES } from "@utils/routes";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import { useSelector } from "react-redux";

export default function AccountPage() {
  const { t } = useTranslation("common");
  const userDetails = useSelector(
    (state: RootState) => state.loggedInSlice.userDetails
  );
  const isAuthor = useSelector(
    (state: RootState) => state.loggedInSlice.isUserAuthor
  );

  // const [IsAuthor, setIsAuthor] = React.useState(false);
  // const userProfile = useSelector(
  //   (state: RootState) => state.loggedInSlice.userProfile
  // );

  // React.useEffect(() => {
  //   if (userProfile.length > 0) {
  //     setIsAuthor(userProfile[0][0]?.isAuthor);
  //   } else {
  //     console.log("isLogout");
  //   }
  // }, [userProfile]);

  return (
    <AccountLayout>
      {/* {IsAuthor ? (
        <>
          <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-3 xl:mb-5">
            {t("Author dashboard")}
          </h2>
        </>
      ) : (
        <>
          <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-3 xl:mb-5">
            {t("Customer dashboard")}
          </h2>
        </>
      )} */}
      {isAuthor ? (
        <>
          <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-3 xl:mb-5">
            {t("Author dashboard")}
          </h2>
        </>
      ) : (
        <>
          <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-3 xl:mb-5">
            {t("Customer dashboard")}
          </h2>
        </>
      )}

      <p className=" text-sm leading-7 md:text-base md:leading-loose lowercase">
        {t("text-account-dashboard")}{" "}
        <Link
          href={ROUTES.ORDERS}
          className="text-heading underline font-semibold"
        >
          {t("text-products")}
        </Link>
        , {t("text-manage-your")}{" "}
        <Link
          href={ROUTES.ACCOUNT_DETAILS}
          className="text-heading underline font-semibold"
        >
          {t("text-account-details")}
        </Link>{" "}
        {t("text-and")}{" "}
        <Link
          href={ROUTES.CHANGE_PASSWORD}
          className="text-heading underline font-semibold"
        >
          {t("text-change-your-password")}
        </Link>
        .
      </p>
    </AccountLayout>
  );
}

AccountPage.Layout = Layout;

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
