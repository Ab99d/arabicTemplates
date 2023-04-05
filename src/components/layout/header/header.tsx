import React, { useEffect, useRef, useState } from "react";
import SearchIcon from "@components/icons/search-icon";
import { siteSettings } from "@settings/site-settings";
import HeaderMenu from "@components/layout/header/header-menu";
import Logo from "@components/ui/logo";
import { useUI } from "@contexts/ui.context";
import { ROUTES } from "@utils/routes";
import { addActiveScroll } from "@utils/add-active-scroll";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import LanguageSwitcher from "@components/ui/language-switcher";
import WishButton from "@components/ui/wish-button";
import { UserLineIcon } from "@components/icons/UserLineIcon";
import Link from "@components/ui/link";
import ListBox from "@components/ui/list-box";
import Search from "@components/ui/customSearch";
import CategoryMenuLink from "@components/ui/category-menu-link";
import { useScrollPosition } from "src/hooks/useScrollPosition";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getBecomeAuthor, getRegisterStatus } from "src/redux/registerSlice";
import { getAuthData } from "src/redux/userLoginInfo";
import { getUserDetails, logOut } from "src/redux/userLoginInfo";

const AuthMenu = dynamic(() => import("@components/layout/header/auth-menu"), {
  ssr: false,
});
const CartButton = dynamic(() => import("@components/cart/cart-button"), {
  ssr: false,
});

const CunfirtEmailModal: React.FC = () => {
  const dispatch = useDispatch();

  const username = useSelector(
    (state: RootState) => state.registerStatus.username
  );
  const password = useSelector(
    (state: RootState) => state.registerStatus.password
  );
  const registerStatus = useSelector(
    (state: RootState) => state.registerStatus.registerStateusState
  );
  const cartQ = useSelector((state: RootState) => state.cart.quantity);

  const [loadingResend, setLoadingResend] = useState(false);
  const sendCode = async () => {
    setLoadingResend(true);
    axios
      .post(
        "https://modbzw1g3m.execute-api.eu-central-1.amazonaws.com/email-confirm-resend",
        {
          username,
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error.response.data);
      })
      .finally(() => {
        setLoadingResend(false);
      });
  };

  // React.useEffect(() => {
  //   if (registerStatus === "Confirm Email") {
  //     sendCode();
  //   }
  // }, []);

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  function onSubmit() {
    setLoading(true);
    axios
      .post(
        "https://modbzw1g3m.execute-api.eu-central-1.amazonaws.com/email-confirm",
        {
          username,
          password,
          code,
        }
      )
      .then((response) => {
        console.log(response.data);
        dispatch(getRegisterStatus("Email Confirmed Successfully"));
        dispatch(getAuthData(response.data));
      })
      .catch((error) => {
        if (error.response?.data) {
          console.log(error.response.data.message);
          setErrorMessage(error.response.data.message);
        } else {
          console.log("something");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <div
        id="popup-modal"
        tabIndex="-1"
        className="fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full bg-opacity-70 bg-black"
        style={{ display: "grid", placeItems: "center" }}
      >
        <div className="relative w-full h-full max-w-md md:h-auto">
          <div className="relative bg-white rounded-lg shadow light:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-hide="popup-modal"
            ></button>
            <div className="p-6 text-center">
              {/* <svg
                aria-hidden="true"
                className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg> */}
              <h3
                style={{ marginBottom: "0" }}
                className="mb-5 text-lg font-normal text-gray-700 dark:text-gray-600"
              >
                Enter Confirmation Code
              </h3>
              <div style={{ color: "red", marginTop: ".5rem" }}>
                {errorMessage}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "1rem",
                }}
              >
                <input
                  className="text-gray-500 dark:text-gray-400"
                  style={{
                    padding: "1rem",
                    margin: ".5rem",
                    border: "1px solid gray",
                    borderRadius: "10px",
                    outline: "none",
                  }}
                  type="text"
                  name=""
                  id=""
                  readOnly
                  placeholder={username}
                />
                <input
                  className="text-gray-500 dark:text-gray-400"
                  style={{
                    padding: "1rem",
                    margin: ".5rem",
                    border: "1px solid gray",
                    borderRadius: "10px",
                    outline: "none",
                  }}
                  type="text"
                  name=""
                  id=""
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter Code"
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  disabled={loadingResend}
                  className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                  onClick={onSubmit}
                  style={{
                    width: "86px",
                    height: "40px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {loading ? <div className="loader1"></div> : <>Submit</>}
                </button>
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  disabled={loadingResend}
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  onClick={sendCode}
                  style={{
                    width: "86px",
                    height: "40px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {loadingResend ? (
                    <div className="loader1"></div>
                  ) : (
                    <>Resend</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

type DivElementRef = React.MutableRefObject<HTMLDivElement>;
const { site_header } = siteSettings;
export default function Header() {
  const { openSidebar, setDrawerView, openModal, setModalView, isAuthorized } =
    useUI();
  const { t } = useTranslation();
  const [queryParamsForMenu, setQueryParamsForMenu] = useState<any>("");
  const siteHeaderRef = useRef() as DivElementRef;
  addActiveScroll(siteHeaderRef);
  const dispatch = useDispatch();

  function handleLogin() {
    setModalView("LOGIN_VIEW");
    return openModal();
  }

  function handleRegister() {
    setModalView("SIGN_UP_VIEW");
    dispatch(getBecomeAuthor(false));
    return openModal();
  }

  function handleMobileMenu() {
    setModalView("SIGN_UP_VIEW");
    return openModal();
  }

  function becomeAnAuthor() {
    setModalView("SIGN_UP_VIEW");
    dispatch(getBecomeAuthor(true));
    return openModal();
  }

  const scrollPosition = useScrollPosition();
  const router = useRouter();

  useEffect(() => {
    if (router.query.sort) {
      setQueryParamsForMenu(router.query.sort);
    }
  }, [router.query.sort]);
  useEffect(() => {
    if (router.query.sort) {
      setQueryParamsForMenu(router.query.sort);
    }
  });

  const registerStatus = useSelector(
    (state: RootState) => state.registerStatus.registerStateusState
  );

  const IsUser = useSelector(
    (state: RootState) => state.loggedInSlice.userInformation
  );

  const userDetails = useSelector(
    (state: RootState) => state.loggedInSlice.userDetails
  );

  const AccessToken = IsUser[0]?.AuthenticationResult?.AccessToken;

  const handleRedirect1 = (value: string) => {
    router.push(`/${value}`);
  };

  const handleLougout = () => {
    dispatch(logOut());
    router.push(`/`);
  };

  const [loadingGetUserInfo, setLoadingGetUserInfo] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [userTokenExpired, setuserTokenExpired] = useState("");

  React.useEffect(() => {
    const getUserInfo = async () => {
      setLoadingGetUserInfo(true);
      axios
        .get(
          "https://modbzw1g3m.execute-api.eu-central-1.amazonaws.com/user-details",
          {
            headers: {
              authorization: AccessToken,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          setUserInfo(response.data);
          dispatch(getUserDetails(response.data));
        })
        .catch((error) => {
          console.error(error.message);
          setuserTokenExpired(error.message);
          if (error.message.includes("Access Token has expired")) {
            dispatch(logOut());
            router.push(`/`);
          }
        })
        .finally(() => {
          setLoadingGetUserInfo(false);
        });
    };
    if (IsUser.length > 0) {
      getUserInfo();
    }
  }, [IsUser]);

  return (
    <>
      <header
        id="siteHeader"
        ref={siteHeaderRef}
        className="relative z-20 w-full h-16 sm:h-20 lg:h-[6rem] xl:h-[6rem] headerThree my-0 py-0"
      >
        <div className="fixed z-20 w-full h-[6rem] text-gray-700 transition duration-200 ease-in-out bg-white innerSticky body-font sm:h-20 lg:h-[6rem] xl:h-[6rem] ps-4 md:ps-0 lg:ps-6 pe-4 lg:pe-6 px-4 md:px-8 2xl:px-16">
          <div className="flex items-center justify-center h-full lg:h-20 xl:h-24 relative before:absolute before:w-screen before:h-px before:bg-[#F1F1F1] before:bottom-0 mx-2 2xl:mx-40">
            <button
              aria-label="Menu"
              className="flex-col items-center justify-center flex-shrink-0 hidden h-full px-5 outline-none menuBtn md:flex lg:hidden 2xl:px-7 focus:outline-none"
              onClick={handleMobileMenu}
            >
              <span className="menuIcon">
                <span className="bar" />
                <span className="bar" />
                <span className="bar" />
              </span>
            </button>
            <div className="flex items-center 2xl:me-6 3xl:me-6">
              <Logo />
            </div>

            <div className="items-center 2xl:me-12 3xl:me-20 hidden">
              {" "}
              // Add flex to classname instead of hidden
              <div className="hidden transition-all duration-100 ease-in-out lg:flex ms-7 xl:ms-9 pe-2 headerTopMenu">
                <Link href="/search">
                  <CategoryMenuLink
                    className="hidden lg:block"
                    categoryMenu={site_header?.categoryMenu}
                  />
                </Link>
                {site_header.pagesMenu?.map((item: any) => (
                  <Link
                    href={item.path}
                    className="relative flex items-center px-3 lg:px-2.5 py-0 text-sm font-normal xl:text-base text-heading xl:px-6 hover:text-[#2C68F6] hover:border-b-black hover:border-b-2"
                    key={`pages-menu-${item.id}`}
                  >
                    {t(`menu:${item.label}`)}
                    {item.icon && (
                      <span className="ms-1.5 xl:ms-2">{item.icon}</span>
                    )}
                  </Link>
                ))}
              </div>
            </div>

            <div className="relative hidden sm:flex sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 lg:mx-28 justify-center">
              {router.pathname === "/" ? (
                <>
                  {scrollPosition !== 0 && scrollPosition > 300 && (
                    <Search width="w-full" px="px-10" />
                  )}
                </>
              ) : (
                <Search
                  querystr={queryParamsForMenu}
                  width="w-full"
                  px="px-10"
                />
              )}
            </div>

            <div className="flex flex-shrink-0 transition-all duration-200 ease-in-out transform ms-auto me-3 lg:me-5 xl:me-8 2xl:me-10 languageSwitcher lg:hidden">
              <button className="bg-[#2C68F6] hover:bg-[#104dda] rounded text-white py-2 px-2 -mr-6">
                Become an Author
              </button>
            </div>
            <div className="flex items-center justify-end flex-shrink-0">
              <div className="items-center transition-all flex wishlistShopping space-s-7 lg:space-s-6 xl:space-s-8 2xl:space-s-10 ps-3">
                <div className="flex items-center flex-shrink-0 ms-auto gap-x-7">
                  {!isAuthorized ? (
                    <>
                      {IsUser.length == 0 ? (
                        <>
                          <AuthMenu
                            isAuthorized={isAuthorized}
                            href={ROUTES.ACCOUNT}
                            className="flex-shrink-0 hidden text-sm xl:text-base lg:flex focus:outline-none text-blue-500 gap-x-2"
                            btnProps={{
                              children: <>{t("text-login")}</>,
                              onClick: handleLogin,
                            }}
                          />
                        </>
                      ) : (
                        <>
                          <button onClick={() => handleLougout()}>
                            Logout
                          </button>
                        </>
                      )}

                      <p className="hidden md:block -mx-4">/</p>
                      {IsUser.length == 0 ? (
                        <>
                          <AuthMenu
                            isAuthorized={isAuthorized}
                            href={ROUTES.ACCOUNT}
                            className="flex-shrink-0 hidden text-sm xl:text-base lg:flex focus:outline-none text-blue-500 gap-x-2"
                            btnProps={{
                              children: <>{t("text-register")}</>,
                              onClick: handleRegister,
                            }}
                          />
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleRedirect1("my-account")}
                            style={{
                              textDecoration: "underline",
                              color: "#2563EB",
                            }}
                          >
                            {userDetails.at(-1)?.username}
                          </button>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <AuthMenu
                        isAuthorized={isAuthorized}
                        href={ROUTES.ACCOUNT}
                        className="flex-shrink-0 hidden text-sm xl:text-base lg:flex focus:outline-none text-blue-500 gap-x-2"
                        btnProps={{
                          children: <>{t("text-register")}</>,
                          onClick: handleRegister,
                        }}
                      />
                    </>
                  )}
                  {/* <button
                    className="bg-[#2C68F6] hover:bg-[#104dda] rounded text-white py-2 px-4 hidden md:block"
                    onClick={becomeAnAuthor}
                  >
                    Become an Author
                  </button> */}
                  <AuthMenu
                    isAuthorized={isAuthorized}
                    href={ROUTES.ACCOUNT}
                    className="bg-[#2C68F6] hover:bg-[#104dda] rounded text-white py-2 px-4 hidden md:block"
                    btnProps={{
                      children: <>{t("Become an Author")}</>,
                      onClick: becomeAnAuthor,
                    }}
                  />
                  <div className="hidden md:block">
                    <CartButton />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {registerStatus == "Confirm Email" ? <CunfirtEmailModal /> : <></>}
    </>
  );
}
