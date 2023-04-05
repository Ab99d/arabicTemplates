import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  IoHomeOutline,
  IoCartOutline,
  IoPersonOutline,
  IoSettingsOutline,
  IoLogOutOutline,
  IoCloudUpload,
  IoCloudUploadOutline,
  IoEar,
  IoHandLeftOutline,
  IoHappyOutline,
  IoFilter,
} from "react-icons/io5";
import { ROUTES } from "@utils/routes";
import { useLogoutMutation } from "@framework/auth/use-logout";
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "src/redux/userLoginInfo";

const accountMenuAuthor = [
  {
    slug: ROUTES.ACCOUNT,
    name: "text-dashboard",
    icon: <IoHomeOutline className="w-5 h-5" />,
  },
  {
    slug: ROUTES.PURCHASED,
    name: "Upload New Item",
    icon: <IoCloudUploadOutline className="w-5 h-5" />,
  },
  {
    slug: ROUTES.EARNINGS,
    name: "My Earnings",
    icon: <IoFilter className="w-5 h-5" />,
  },
  {
    slug: ROUTES.ORDERS,
    name: "Products",
    icon: <IoCartOutline className="w-5 h-5" />,
  },
  {
    slug: ROUTES.ACCOUNT_DETAILS,
    name: "text-account-details",
    icon: <IoPersonOutline className="w-5 h-5" />,
  },
  {
    slug: ROUTES.CHANGE_PASSWORD,
    name: "text-change-password",
    icon: <IoSettingsOutline className="w-5 h-5" />,
  },
];

const accountMenuCustomer = [
  {
    slug: ROUTES.ACCOUNT,
    name: "text-dashboard",
    icon: <IoHomeOutline className="w-5 h-5" />,
  },
  {
    slug: ROUTES.ORDERS,
    name: "My Products",
    icon: <IoCartOutline className="w-5 h-5" />,
  },
  {
    slug: ROUTES.ACCOUNT_DETAILS,
    name: "text-account-details",
    icon: <IoPersonOutline className="w-5 h-5" />,
  },
  {
    slug: ROUTES.CHANGE_PASSWORD,
    name: "text-change-password",
    icon: <IoSettingsOutline className="w-5 h-5" />,
  },
];

export default function AccountNav() {
  const { mutate: logout } = useLogoutMutation();
  const { pathname } = useRouter();
  const newPathname = pathname.split("/").slice(2, 3);
  const mainPath = `/${newPathname[0]}`;
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const router = useRouter();

  const logoutFunction = () => {
    dispatch(logOut());
    router.push(`/`);
  };

  // const [IsAuthor, setIsAuthor] = React.useState(false);
  const isAuthor = useSelector(
    (state: RootState) => state.loggedInSlice.isUserAuthor
  );

  // React.useEffect(() => {
  //   if (userProfile.length > 0) {
  //     setIsAuthor(userProfile[0][0]?.isAuthor);
  //   } else {
  //     console.log("isLogout");
  //   }
  // }, [userProfile]);

  // console.log(IsAuthor);

  return (
    <nav className="flex flex-col md:w-2/6 2xl:w-4/12 md:pe-8 lg:pe-12 xl:pe-16 2xl:pe-20 pb-2 md:pb-0">
      {isAuthor
        ? accountMenuAuthor.map((item) => {
            const menuPathname = item.slug.split("/").slice(2, 3);
            const menuPath = `/${menuPathname[0]}`;
            return (
              <Link key={item.slug} href={item.slug}>
                <a
                  className={
                    mainPath === menuPath
                      ? "bg-gray-100 font-semibold flex items-center cursor-pointer text-sm lg:text-base text-heading py-3.5 px-4 lg:px-5 rounded mb-2 "
                      : "flex items-center cursor-pointer text-sm lg:text-base text-heading font-normal py-3.5 px-4 lg:px-5 rounded mb-2"
                  }
                >
                  {item.icon}
                  <span className="ps-2">{t(`${item.name}`)}</span>
                </a>
              </Link>
            );
          })
        : accountMenuCustomer.map((item) => {
            const menuPathname = item.slug.split("/").slice(2, 3);
            const menuPath = `/${menuPathname[0]}`;
            return (
              <Link key={item.slug} href={item.slug}>
                <a
                  className={
                    mainPath === menuPath
                      ? "bg-gray-100 font-semibold flex items-center cursor-pointer text-sm lg:text-base text-heading py-3.5 px-4 lg:px-5 rounded mb-2 "
                      : "flex items-center cursor-pointer text-sm lg:text-base text-heading font-normal py-3.5 px-4 lg:px-5 rounded mb-2"
                  }
                >
                  {item.icon}
                  <span className="ps-2">{t(`${item.name}`)}</span>
                </a>
              </Link>
            );
          })}
      <button
        className="flex items-center cursor-pointer text-sm lg:text-base text-heading font-normal py-3.5 px-4 lg:px-5 focus:outline-none"
        onClick={() => logoutFunction()}
      >
        <IoLogOutOutline className="w-5 h-5" />
        <span className="ps-2">{t("text-logout")}</span>
      </button>
    </nav>
  );
}
